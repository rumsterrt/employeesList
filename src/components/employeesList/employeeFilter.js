import React from 'react'
import { updateFilterOrSort } from 'actions/employees'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'

import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(2),
        marginLeft: 0,
        minWidth: 120,
        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
            width: '100%',
        },
    },
    formControlLabel: {
        margin: theme.spacing(2),
        marginLeft: 0,
        minWidth: 120,
        [theme.breakpoints.down('sm')]: {
            marginRight: 0,
            width: '100%',
        },
    },
    formControlLabel: {
        color: 'black',
    },
    box: {
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            width: '100%',
        },
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        bottom: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}))

const EmployeeFilter = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const [sort, setSort] = React.useState('none')
    const [role, setRole] = React.useState('all')
    const [isArchive, setIsArchive] = React.useState(null)

    React.useEffect(() => {
        dispatch(updateFilterOrSort({ filter: { role, isArchive }, sort }))
    }, [role, sort, isArchive])

    return (
        <>
            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={() => history.push('/add')}>
                <AddIcon />
            </Fab>
            <Box display="flex" width="100%" justifyContent="space-between" className={classes.box}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="sort-select">Sort by</InputLabel>
                    <Select id="sort-select" labelId="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                        <MenuItem value={'none'}>None</MenuItem>
                        <MenuItem value={'name'}>Name</MenuItem>
                        <MenuItem value={'birthday'}>Birthday</MenuItem>
                    </Select>
                </FormControl>
                <Box display="flex" alignItems="center" className={classes.box}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="role-select">Role</InputLabel>
                        <Select
                            id="role-select"
                            labelId="role-select"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        >
                            <MenuItem value={'all'}>All</MenuItem>
                            <MenuItem value={'driver'}>Driver</MenuItem>
                            <MenuItem value={'waiter'}>Waiter</MenuItem>
                            <MenuItem value={'cook'}>Cook</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isArchive || false}
                                onChange={() => setIsArchive(prevValue => !prevValue)}
                                value="isArchive"
                                color="primary"
                            />
                        }
                        label="Is Archive"
                        className={classes.formControlLabel}
                    />
                </Box>
            </Box>
        </>
    )
}

export default EmployeeFilter
