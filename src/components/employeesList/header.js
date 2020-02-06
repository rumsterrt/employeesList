import React from 'react'
import { useHistory } from 'react-router-dom'
import Filter from './filter'
import { useSelector } from 'react-redux'
import _get from 'lodash/get'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Drawer from '@material-ui/core/Drawer'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'

import AddIcon from '@material-ui/icons/Add'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
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

const Header = () => {
    const classes = useStyles()
    const history = useHistory()
    const matches = useMediaQuery('(min-width:600px)')

    const { filter, sort } = useSelector(state => _get(state, 'employees.nodes'))

    const [isOpenDrawer, setOpenDrawer] = React.useState(false)

    const drawerRender = () => (
        <div role="presentation" className={classes.list}>
            <div className={classes.drawerHeader}>
                <IconButton onClick={setOpenDrawer.bind(null, false)}>
                    <ChevronRightIcon />
                </IconButton>
            </div>
            <Divider />
            <Filter initFilter={filter} initSort={sort} />
        </div>
    )

    return (
        <>
            <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={() => history.push('/add')}>
                <AddIcon />
            </Fab>

            {matches ? (
                <Filter initFilter={filter} initSort={sort} />
            ) : (
                <>
                    <Button onClick={setOpenDrawer.bind(null, prevState => !prevState)}>Filter/Sort</Button>
                    <Drawer
                        anchor="right"
                        variant="persistent"
                        open={isOpenDrawer}
                        onClose={setOpenDrawer.bind(null, false)}
                    >
                        {drawerRender('right')}
                    </Drawer>
                </>
            )}
        </>
    )
}

export default Header
