import React,{useContext} from 'react';
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


export const fetchUsers = (offset, limit, username, password, role, name, surname, email, company, terms) => {
    return dispatch => {
        dispatch(fetchUsersStart());        
          
        const query = new URLSearchParams();                        
        query.append('username', username);
        query.append('password', password);
        query.append('role', role);        
        query.append('name', name);
        query.append('surname', surname);
        query.append('email', email);
        query.append('company', company);
        query.append('terms', terms);        
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

export const registerUser = (password, username, role, email, uName, surname, company, terms, isAuthenticated) => {
    return dispatch => {
        dispatch(fetchUsersStart());        
        
        
        let url = '/user/register';

        const registerData = {
            password: password,            
            username: username,
            role: role,
            email: email,
            name: uName,
            surname: surname,            
            company: company,
            terms: terms
        };

        const authorization= {'Authorization': `Bearer ${isAuthenticated}`}

        axios.post(url, registerData, authorization)
        .then(response => {   
            alert("User is into database.");        
        })
        .catch(error => {
            alert(error);                                
        }    
    );

    }   
};

export const acceptTerms = (id) => {
    return dispatch => {
        dispatch(fetchUsersStart());
            
        let url = `/user/${id}`;

        axios.put(url, {id:id,terms:1})
            .then(response => {                
                alert("WELCOME! EXPLORE AKRx MESSAGES");                 
            })
            .catch(error => {
                alert(error);                                
            }    
        );        
    }
};



