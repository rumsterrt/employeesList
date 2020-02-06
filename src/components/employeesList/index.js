import React from 'react'
import { useSelector } from 'react-redux'
import _get from 'lodash/get'
import EmployeeView from './employeeView'
import EmployeeFilter from './employeeFilter'
import { Page } from 'components/ui'

import List from '@material-ui/core/List'

const EmployeesList = () => {
    const list = useSelector(state => _get(state, 'employees.nodes', { items: [], filter: null }))

    return (
        <Page header={<EmployeeFilter />}>
            <List>
                {list.items.map(item => (
                    <EmployeeView key={item} employeeId={item} />
                ))}
            </List>
        </Page>
    )
}

export default EmployeesList
