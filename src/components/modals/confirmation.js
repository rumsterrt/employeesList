import React from 'react'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import { hideModal } from 'actions/modals'
import { useDispatch } from 'react-redux'

const ConfirmationDialog = props => {
    const { onClose, onOk, onCancel, title, ...other } = props
    const dispatch = useDispatch()

    const handleClose = success => {
        dispatch(hideModal())
        success ? onOk && onOk() : onCancel && onCancel()
        onClose && onClose()
    }

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={true}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">{title || 'Are you sure?'}</DialogTitle>
            <DialogActions>
                <Button autoFocus onClick={handleClose.bind(null, false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose.bind(null, true)} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationDialog
