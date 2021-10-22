import * as actionTypes from '../actions/actionTypes';
import {rowsPerPageDefault} from '../../shared/staticData';
import {updateObject} from '../../shared/utility';

const initialState = {
    
    username: null,
    password: null,
    name: null,
    surname: null,
    role: null,
    terms: null,
    company: null,
    email: null,    
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

// 1 USER
const fetchUserStart = (state, action) => {
    return updateObject(state, {
        usersLoading: true
    });
};
const fetchUserSuccess = (state, action) => {
    return updateObject(state, {
        
        password: action.password,  
        username: action.username,
        role: action.role,
        email: action.email,
        name: action.name,
        surname: action.surname,
        company: action.company,
        terms: action.terms,          
        usersLoading: false
    });
};
const fetchUserFail = (state, action) => {
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

        case actionTypes.FETCH_USER_START: return fetchUserStart(state, action);            
        case actionTypes.FETCH_USER_SUCCESS: return fetchUserSuccess(state, action);            
        case actionTypes.FETCH_USER_FAIL: return fetchUserFail(state, action);

        
        default: return state;
    }
};

export default reducer;