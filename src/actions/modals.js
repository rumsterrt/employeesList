const NS = '@app/modals'

export const actionTypes = {
    SHOW_MODAL: `${NS}/SHOW_MODAL`,

    HIDE_MODAL: `${NS}/HIDE_MODAL`,
}

export const showModal = ({ type, props }) => ({
    type: actionTypes.SHOW_MODAL,
    payload: { type, props },
})

export const hideModal = () => ({
    type: actionTypes.HIDE_MODAL,
})
