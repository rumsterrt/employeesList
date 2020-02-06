import React from 'react'
import { updateFilterOrSort } from 'actions/employees'
import { useDispatch } from 'react-redux'

import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

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
        display: 'flex',
        width: '100%',
        marginBottom: '20px',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            padding: theme.spacing(2),
        },
    },
}))

const Filter = ({ initFilter = { role: 'all', isArchive: null }, initSort = 'none' }) => {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [sort, setSort] = React.useState(initSort)
    const [filter, setFilter] = React.useState(initFilter)

    React.useEffect(() => {
        dispatch(updateFilterOrSort({ filter, sort }))
    }, [filter, sort])

    const handleResetFilter = () => {
        setSort('none')
        setFilter({ role: 'all', isArchive: null })
    }

    return (
        <Box className={classes.box}>
            <FormControl className={classes.formControl}>
                <InputLabel id="sort-select">Sort by</InputLabel>
                <Select id="sort-select" labelId="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                    {['None', 'Name', 'Birthday'].map(item => (
                        <MenuItem key={item} value={item.toLowerCase()}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="role-select">Role</InputLabel>
                <Select
                    id="role-select"
                    labelId="role-select"
                    value={filter.role}
                    onChange={e => setFilter(prevState => ({ ...prevState, role: e.target.value }))}
                >
                    {['All', 'Driver', 'Waiter', 'Cook'].map(item => (
                        <MenuItem key={item} value={item.toLowerCase()}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={filter.isArchive || false}
                        onChange={() => setFilter(prevState => ({ ...prevState, isArchive: !prevState.isArchive }))}
                        color="primary"
                    />
                }
                label="Is Archive"
                className={classes.formControlLabel}
            />
            <Button variant="text" onClick={handleResetFilter}>
                Reset
            </Button>
        </Box>
    )
}

export default Filter
