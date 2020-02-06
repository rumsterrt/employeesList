import React from 'react'
import { removeEmployee } from 'actions/employees'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'

const Header = ({ employeeId, history, dispatch }) => {
    return (
        <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
            <IconButton aria-label="back" onClick={history.goBack.bind()}>
                <BackIcon />
            </IconButton>

            <Typography variant="h6" align="center">
                {employeeId ? 'Edit employee' : 'Create new employee'}
            </Typography>

            <IconButton
                aria-label="back"
                disabled={!employeeId}
                onClick={() => {
                    console.log('asda')
                    dispatch(removeEmployee({ id: employeeId }))
                    history.goBack()
                }}
            >
                {employeeId && <DeleteIcon />}
            </IconButton>
        </Box>
    )
}

export default Header
