import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Loader } from 'components/ui'

import { useDispatch } from 'react-redux'
import { getEmployees } from 'actions/employees'

import Container from '@material-ui/core/Container'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const EmployeesList = React.lazy(() => import('./components/employeesList'))

const EditEmployee = React.lazy(() => import('./components/editEmployee'))

const Routes = () => {
    const matches = useMediaQuery('(min-width:600px)')
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getEmployees())
    }, [])

    return (
        <Container maxWidth={matches ? 'md' : false} disableGutters={!matches}>
            <React.Suspense fallback={<Loader />}>
                <Switch>
                    <Route path="/" exact component={EmployeesList} />
                    <Route
                        path="/edit/:id"
                        exact
                        render={ownProps => <EditEmployee {...ownProps} employeeId={ownProps.match.params.id} />}
                    />
                    <Route path="/add" exact render={ownProps => <EditEmployee {...ownProps} />} />
                    <Redirect to="/" />
                </Switch>
            </React.Suspense>
        </Container>
    )
}

export default Routes
