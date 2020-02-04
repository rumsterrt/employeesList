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
        isLoadedLocalData: false,
    }
}

export default (state = getInitState(), action) => {
    const payload = action.payload || {}

    switch (action.type) {
        case actionTypes.GET_EMPLOYEES:
            if (state.isLoadedLocalData) {
                return state
            }

            return {
                ...state,
                items: payload.nodes.reduce((acc, node) => ({ ...acc, [node.id]: node }), {}),
                nodes: {
                    ...state.nodes,
                    items: payload.nodes.reduce((acc, node) => [...acc, node.id], []),
                },
                isLoadedLocalData: true,
            }
        case actionTypes.ADD_EMPLOYEE:
            return {
                ...state,
                items: { [payload.id]: payload, ...state.items },
                nodes: {
                    ...state.nodes,
                    items: [payload.id, ...state.nodes.items],
                },
            }
        case actionTypes.EDIT_EMPLOYEE:
            return { ...state, items: { ...state.items, [payload.id]: payload } }
        case actionTypes.REMOVE_EMPLOYEE:
            return {
                ...state,
                items: {
                    ...items,
                    [payload.id]: null,
                },
                nodes: {
                    ...state.nodes,
                    items: state.nodes.items.filter(item => item === payload.id),
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
