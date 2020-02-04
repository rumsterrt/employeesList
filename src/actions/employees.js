import { v1 as uuid } from 'uuid'
import initEmployeesList from '../data/employees.json'

const NS = '@app/employees'

export const actionTypes = {
    GET_EMPLOYEES: `${NS}/GET_EMPLOYEES`,

    ADD_EMPLOYEE: `${NS}/ADD_EMPLOYEE`,

    EDIT_EMPLOYEE: `${NS}/EDIT_EMPLOYEE`,

    REMOVE_EMPLOYEE: `${NS}/REMOVE_EMPLOYEE`,

    UPDATE_FILTER_OR_SORT: `${NS}/UPDATE_FILTER_OR_SORT`,
}

export const getEmployees = () => dispatch => {
    let items = JSON.parse(localStorage.getItem('employees_list'))

    if (!items) {
        //update date to unix
        items = initEmployeesList.map(item => {
            const date = item.birthday.split('.')
            const unixDate = Date.parse(`${date[1]}.${date[0]}.${date[2]}`)
            return { ...item, birthday: unixDate }
        })
        localStorage.setItem('employees_list', JSON.stringify(items))
    }

    dispatch({ type: actionTypes.GET_EMPLOYEES, payload: { nodes: items } })
}

export const addEmployee = ({ name, isArchive, role, phone, birthday }) => dispatch => {
    const items = JSON.parse(localStorage.getItem('employees_list') || '[]')
    const id = uuid()
    items.unshift({ id, name, isArchive, role, phone, birthday })
    localStorage.setItem('employees_list', JSON.stringify(items))
    dispatch({ type: actionTypes.ADD_EMPLOYEE, payload: { id, name, isArchive, role, phone, birthday } })
}

export const editEmployee = ({ id, name, isArchive, role, phone, birthday }) => dispatch => {
    const items = JSON.parse(localStorage.getItem('employees_list') || '[]')
    const index = items.findIndex(item => item.id == id)
    items[index] = Object.assign({}, items[index], { name, isArchive, role, phone, birthday })
    localStorage.setItem('employees_list', JSON.stringify(items))
    dispatch({ type: actionTypes.EDIT_EMPLOYEE, payload: { id, name, isArchive, role, phone, birthday } })
}

export const removeEmployee = ({ id }) => dispatch => {
    const items = JSON.parse(localStorage.getItem('employees_list') || '[]')
    localStorage.setItem('employees_list', JSON.stringify(items.filter(item => item.id === id)))
    dispatch({ type: actionTypes.EDIT_EMPLOYEE, payload: { id } })
}

export const updateFilterOrSort = ({ filter, sort = 'none' } = {}) => dispatch => {
    dispatch({ type: actionTypes.UPDATE_FILTER_OR_SORT, payload: { filter, sort } })
}
