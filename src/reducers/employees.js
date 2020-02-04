import { actionTypes } from 'actions/employees'
import _sortBy from 'lodash/sortBy'

const getInitState = () => {
    return {
        items: {},
        nodes: {
            items: [],
            filter: {
                role: 'all',
                isArchive: null,
            },
            sort: 'none',
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
        case actionTypes.UPDATE_FILTER_OR_SORT:
            let filtered = Object.keys(state.items).reduce((acc, item) => {
                if (
                    (payload.filter.role === 'all' || state.items[item].role === payload.filter.role) &&
                    (typeof payload.filter.isArchive !== 'boolean' ||
                        state.items[item].isArchive === payload.filter.isArchive)
                ) {
                    return [...acc, state.items[item]]
                }
                return acc
            }, [])

            if (payload.sort !== 'none') {
                filtered = _sortBy(filtered, [payload.sort])
            }

            filtered = filtered.map(item => item.id)

            return {
                ...state,
                nodes: {
                    ...state.nodes,
                    items: filtered,
                },
            }
        default:
            return state
    }
}
