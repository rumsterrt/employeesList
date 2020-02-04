import React from 'react'
import Form from './form'
import { useSelector, useDispatch } from 'react-redux'
import _get from 'lodash/get'
import { addEmployee, editEmployee } from 'actions/employees'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}))

const EditEmployee = ({ employeeId }) => {
    const classes = useStyles()

    const employee = useSelector(state => (employeeId ? _get(state, `employees.items.${employeeId}`) : {}))

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = values => {
        dispatch(employeeId ? editEmployee({ ...values, id: employeeId }) : addEmployee(values))
        history.push('/')
    }

    return (
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
                {employeeId ? 'Edit employee' : 'Create new employee'}
            </Typography>
            <Form employee={employee} onSubmit={handleSubmit} />
        </Paper>
    )
}

export default EditEmployee
