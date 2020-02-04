import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { getEmployees } from 'actions/employees'

import EmployeesList from './components/employeesList'
import EditEmployee from './components/editEmployee'

import Container from '@material-ui/core/Container'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const Routes = () => {
    const matches = useMediaQuery('(min-width:600px)')
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getEmployees())
    }, [])

    return (
        <Container maxWidth={matches ? 'md' : false} disableGutters={!matches}>
            <Switch>
                <Route path="/" exact component={EmployeesList} />
                <Route
                    path="/edit/:id"
                    exact
                    render={ownProps => <EditEmployee {...ownProps} employeeId={ownProps.match.params.id} />}
                />
                <Route path="/add" exact render={ownProps => <EditEmployee {...ownProps} />} />
            </Switch>
        </Container>
    )
}

export default Routes
