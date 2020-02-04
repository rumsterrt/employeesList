import { actionTypes } from 'actions/employees'

const getInitState = () => {
    return {
        items: {},
        nodes: {
            items: [],
            filter: null,
        },
        isFetching: false,
        error: null,
    }
}

export default (state = getInitState(), action) => {
    const payload = action.payload || {}

    switch (action.type) {
        case actionTypes.GET_EMPLOYEES_REQUEST:
            return { ...state, error: null, isFetching: true }

        case actionTypes.GET_EMPLOYEES_SUCCESS:
            return {
                ...state,
                items: payload.nodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {}),
                nodes: {
                    filter: payload.filter,
                    items: payload.nodes.reduce((acc, node) => [...acc, node.id], []),
                },
                isFetching: false,
            }

        case actionTypes.GET_EMPLOYEES_FAILURE:
            return { ...state, error: action.error, isFetching: false }

        case actionTypes.ADD_EMPLOYEE:
            return { ...state, items: { ...items, [payload.id]: payload } }
        case actionTypes.EDIT_EMPLOYEE:
            return { ...state, items: { ...items, [payload.id]: payload } }
        case actionTypes.REMOVE_EMPLOYEE:
            return {
                ...state,
                items: {
                    ...items,
                    [payload.id]: null,
                    nodes: {
                        ...state.nodes,
                        items: state.nodes.items.filter(item => item === payload.id),
                    },
                },
            }
        default:
            return state
    }
}
