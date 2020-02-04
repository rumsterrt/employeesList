import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EmployeesList from './components/employeesList'

import Container from '@material-ui/core/Container'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const Routes = () => {
    const matches = useMediaQuery('(min-width:600px)')

    return (
        <Container maxWidth={matches ? 'md' : false} disableGutters={!matches}>
            <Switch>
                <Route path="/" exact component={EmployeesList} />
                <Route path="/edit/:id" exact component={() => <div>Edit</div>} />
            </Switch>
        </Container>
    )
}

export default Routes
