import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: 'white',
        color: 'black',
    },
}))

const Page = ({ header, children }) => {
    const classes = useStyles()

    return (
        <>
            {header && (
                <AppBar position="sticky" className={classes.appBar}>
                    <Toolbar>{header}</Toolbar>
                </AppBar>
            )}
            {children}
        </>
    )
}

export default Page
