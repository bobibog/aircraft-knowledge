import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';

const initialState = {
    users: null,
    usersCount: null,
    usersLoading: false,
    usersOffset: 0,
    usersLimit: rowsPerPageDefault,
    usersPage: 0     
};


const setUsersOffsetLimit = (state, action) => {
    return updateObject(state, {
        usersOffset: action.offset,
        usersLimit: action.limit
    });
};
const setUsersPage = (state, action) => {
    return updateObject(state, {
        usersPage: action.page
    });
};
const fetchUsersStart = (state, action) => {
    return updateObject(state, {
        usersLoading: true
    });
};
const fetchUsersSuccess = (state, action) => {
    return updateObject(state, {
        users: action.users,
        usersCount: action.usersCount,
        usersLoading: false
    });
};
const fetchUsersFail = (state, action) => {
    return updateObject(state, {
        usersLoading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS_OFFSET_LIMIT: return setUsersOffsetLimit(state, action);
        case actionTypes.SET_USERS_PAGE: return setUsersPage(state, action);            
        case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);            
        case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);            
        case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);
        
        default: return state;
    }
};

export default reducer;