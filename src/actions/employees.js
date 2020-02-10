import { v1 as uuid } from 'uuid'

const NS = '@app/employees'

export const actionTypes = {
    GET_EMPLOYEES: `${NS}/GET_EMPLOYEES`,

    ADD_EMPLOYEE: `${NS}/ADD_EMPLOYEE`,

    EDIT_EMPLOYEE: `${NS}/EDIT_EMPLOYEE`,

    REMOVE_EMPLOYEE: `${NS}/REMOVE_EMPLOYEE`,

    UPDATE_FILTER_OR_SORT: `${NS}/UPDATE_FILTER_OR_SORT`,
}

export const getEmployees = () => dispatch => {
    import('../data/employees.json').then(module => {
        const nodes = module.default.map(item => {
            const date = item.birthday.split('.')
            const unixDate = Date.parse(`${date[1]}.${date[0]}.${date[2]}`)
            return { ...item, birthday: unixDate }
        })

        dispatch({ type: actionTypes.GET_EMPLOYEES, payload: { nodes } })
    })
}

export const addEmployee = ({ name, isArchive, role, phone, birthday }) => dispatch => {
    const id = uuid()
    dispatch({ type: actionTypes.ADD_EMPLOYEE, payload: { id, name, isArchive, role, phone, birthday } })
}

export const editEmployee = ({ id, name, isArchive, role, phone, birthday }) => dispatch => {
    dispatch({ type: actionTypes.EDIT_EMPLOYEE, payload: { id, name, isArchive, role, phone, birthday } })
}

export const removeEmployee = ({ id }) => dispatch => {
    dispatch({ type: actionTypes.REMOVE_EMPLOYEE, payload: { id } })
}

export const updateFilterOrSort = ({ filter, sort = 'none' } = {}) => dispatch => {
    dispatch({ type: actionTypes.UPDATE_FILTER_OR_SORT, payload: { filter, sort } })
}
