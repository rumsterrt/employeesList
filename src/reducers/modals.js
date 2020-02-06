import { actionTypes } from 'actions/modals'

const getInitState = () => ({
    type: null,
    props: {},
})

export default (state = getInitState(), action) => {
    const payload = action.payload

    switch (action.type) {
        case actionTypes.SHOW_MODAL:
            return {
                ...state,
                ...payload,
            }
        case actionTypes.HIDE_MODAL:
            return getInitState()
        default:
            return state
    }
}
