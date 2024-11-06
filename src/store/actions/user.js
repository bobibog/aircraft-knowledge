import React,{useContext} from 'react';
import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
import { Redirect } from 'react-router-dom';


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

// 1 USER
// export const fetchUserSuccess = (id, username, name, surname, role, terms, email, company, emailConfirmed, loginProvider, ethereumAccountAddress) => {
export const fetchUserSuccess = (id, userName, name, surname, role, terms, email, company, emailConfirmed, loginProvider, ethereumAccountAddress) => {
    return {
        type: actionTypes.FETCH_USER_SUCCESS,
        // user: user 
        //password: password,
        username: username,
        name: name,
        surname: surname,
        role: role,
        terms: terms,
        company: company,
        email: email,
        emailConfirmed: emailConfirmed,
        loginProvider: loginProvider,
        ethereumAccountAddress: ethereumAccountAddress       
    }
};

export const fetchUserFail = (error) => {
    return {
        type: actionTypes.FETCH_USER_FAIL,
        error: error
    }
};

export const fetchUserStart = () => {
    return {
        type: actionTypes.FETCH_USER_START
    }
};


export const fetchUsers = (offset, limit, username, password, role, name, surname, email, company, terms, isAuthenticated) => {
    return dispatch => {
        dispatch(fetchUsersStart());        
          
        const query = new URLSearchParams();                        
        // query.append('username', username);
        // query.append('name', name);
        // query.append('surname', surname);
        // query.append('email', email);
        // query.append('company', company);
        // query.append('terms', terms);        
        query.append('offset', offset);
        query.append('limit', limit); 
        
        let queryString = limit !== "-1"            
            ? query
            : '';    
        
        let url = '/Account/Users?' + queryString;
            
        const config ={
            headers: {'Authorization': `Bearer ${isAuthenticated}`}
        }
            
        axios.get(url, config)
            .then(response => {                
                dispatch(fetchUsersSuccess(response.data['users'], response.data['usersCount']))                 
            })
            .catch(error => {
                dispatch(fetchUsersFail(error));                                
            }    
        );        
    }
};

export const getUser = (id, isAuthenticated) => {
    return dispatch => {
        dispatch(fetchUserStart());        
          
        let url = `/user/${id}`;
        
        const config ={
            headers: {'Authorization': `Bearer ${isAuthenticated}`}
        }
            
        axios.get(url, config)
            .then(response => { 
                dispatch(fetchUserSuccess(response.data.id, response.data.username,
                    response.data.name, response.data.surname, response.data.role, response.data.terms,
                    response.data.email, response.data.company, response.data.emailConfirmed,
                    response.data.loginProvider, response.data.ethereumAccountAddress))                                 
            }
            )
            .catch(error => {
                dispatch(fetchUserFail(error));                                
            }    
        );        
    }
};

export const registerUser = (password, username, role, email, uName, surname, company, terms, isAuthenticated) => {
    return dispatch => {
        dispatch(fetchUsersStart());        
        
        
        let url = '/account/register';

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

        const config ={
            headers: {'Authorization': `Bearer ${isAuthenticated}`}
        }
        

        axios.post(url, registerData, config)
        .then(response => {   
            alert("User was created successfully. Confirmation email has been sent to " + registerData.email);
            window.location.href="/user";        
        })
        .catch(error => {
            alert(error.response.data.message);                                
        }    
    );

    }   
};


export const deleteUser = (id, isAuthenticated) => {
    return dispatch => {
        dispatch(fetchUsersStart());        
        
        
        let url = `/Account/Delete/${id}`;

        const config ={
            headers: {'Authorization': `Bearer ${isAuthenticated}`}
        }                 
        
        axios.delete(url, config)
        .then(response => {   
            alert("User was deleted from database."); 
            window.location.reload();       
        })
        .catch(error => {
            alert(error);                                
        }    
    );

    }   
};

export const updateUser = (id, password, username, role, email, uName, surname, company, terms, isAuthenticated) => {
    return dispatch => {
        dispatch(fetchUserStart());        
        
        
        let url = `/user/update/${id}`;

        const config ={
            headers: {'Authorization': `Bearer ${isAuthenticated}`}
        }
        
        const user = {
            id: parseInt(id),
            password: password,            
            username: username,
            role: role,
            email: email,
            name: uName,
            surname: surname,            
            company: company,
            terms: parseInt(terms)
        };
        
        axios.put(url, user, config)
        .then(response => {   
            alert("User was successfully updated.");
            window.location.href="/user";                    
        })
        .catch(error => {
            alert(error.message);                                
        }    
    );

    }   
};

export const acceptTerms = (id, token) => {
    return dispatch => {
        dispatch(fetchUsersStart());
            
        let url = `/Account/AcceptTerms/${id}`;
        let authRedirect = null;
        axios.put(url, {}, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => { 
            dispatch(fetchUserSuccess(response.data.terms))                                 
        
            alert("WELCOME! EXPOLORE AKRx SITE"); 
            window.location.href="/akrx";
        
        }        
        )
            .catch(error => {
                alert(error);                                
            }    
        );        
    }
};