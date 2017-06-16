import * as types from '../constants/ActionTypes';

function visibilityFilter(state = types.VisibilityFilters, action) {
    switch (action.type) {
        case types.SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

export default visibilityFilter