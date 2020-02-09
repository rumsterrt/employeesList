import React from 'react'
import Form from './form'
import { useSelector, useDispatch } from 'react-redux'
import _get from 'lodash/get'
import { addEmployee, editEmployee } from 'actions/employees'
import { useHistory, Redirect } from 'react-router-dom'
import { Page } from 'components/ui'
import Header from './header'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}))

const EditEmployee = ({ employeeId }) => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const history = useHistory()

    const employee = useSelector(state => (employeeId ? _get(state, `employees.items.${employeeId}`) : {}))

    if (!employee) {
        return <Redirect to="/" />
    }

    const handleSubmit = values => {
        dispatch(employeeId ? editEmployee({ ...values, id: employeeId }) : addEmployee(values))
        history.push('/')
    }

    return (
        <Page header={<Header employeeId={employeeId} history={history} dispatch={dispatch} />}>
            <Paper className={classes.paper}>
                <Form employee={employee} onSubmit={handleSubmit} />
            </Paper>
        </Page>
    )
}

export default EditEmployee
