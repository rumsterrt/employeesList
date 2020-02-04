import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEmployees } from 'actions/employees'
import _get from 'lodash/get'
import EmployeeView from './employeeView'
import List from '@material-ui/core/List'

const EmployeesList = () => {
    const list = useSelector(state => _get(state, 'employees.nodes', { items: [], filter: null }))

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getEmployees())
    }, [])

    return (
        <List>
            {list.items.map(item => (
                <EmployeeView key={item} employeeId={item} />
            ))}
        </List>
    )
}

export default EmployeesList
