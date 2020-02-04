import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EmployeesList from './components/employeesList'
import Container from '@material-ui/core/Container'

const Routes = () => {
    return (
        <Container maxWidth="md">
            <Switch>
                <Route path="/" exact component={EmployeesList} />
                <Route path="/edit/:id" exact component={() => <div>Edit</div>} />
            </Switch>
        </Container>
    )
}

export default Routes
