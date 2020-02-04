import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _get from 'lodash/get'
import EmployeeView from './employeeView'
import List from '@material-ui/core/List'
import EmployeeFilter from './employeeFilter'

const EmployeesList = () => {
    const list = useSelector(state => _get(state, 'employees.nodes', { items: [], filter: null }))

    return (
        <>
            <EmployeeFilter />
            <List>
                {list.items.map(item => (
                    <EmployeeView key={item} employeeId={item} />
                ))}
            </List>
        </>
    )
}

export default EmployeesList
