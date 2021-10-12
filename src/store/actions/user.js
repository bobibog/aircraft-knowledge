import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';


export const setUsersOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_USERS_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setUsersPage = (page) => {
    return {
        type: actionTypes.SET_USERS_PAGE,
        page: page
    }
};

export const fetchUsersSuccess = (users, usersCount) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users,
        usersCount: usersCount
    }
};

export const fetchUsersFail = (error) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        error: error
    }
};

export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START
    }
};


export const fetchUsers = (offset, limit, username, password, role) => {
    return dispatch => {
        dispatch(fetchUsersStart());        
          
        const query = new URLSearchParams();                        
        query.append('username', username);
        query.append('password', password);
        query.append('role', role);        
        query.append('offset', offset);
        query.append('limit', limit); 
        
        let queryString = limit !== "-1"            
            ? query
            : '';            
            
        axios.get(`/User?`+ queryString)
            .then(response => {                
                dispatch(fetchUsersSuccess(response.data['users'], response.data['usersCount']))                 
            })
            .catch(error => {
                dispatch(fetchUsersFail(error));                                
            }    
        );        
    }
};

