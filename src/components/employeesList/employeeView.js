import React from 'react'
import { useSelector } from 'react-redux'
import _get from 'lodash/get'
import moment from 'moment'

import ListItem from '@material-ui/core/ListItem'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    card: {
        width: '100%',
    },
})

const EmployeeView = ({ employeeId }) => {
    const classes = useStyles()
    const data = useSelector(state => _get(state, `employees.items.${employeeId}`, {}))
    const history = useHistory()

    return (
        <ListItem button onClick={() => history.push(`/edit/${employeeId}`)}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {data.role}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.phone}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        {moment(data.birthday).format('DD-MM-YYYY')}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                        {data.isArchive ? '+' : '-'}
                    </Typography>
                </CardContent>
            </Card>
        </ListItem>
    )
}

export default EmployeeView
