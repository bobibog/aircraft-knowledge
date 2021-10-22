import React, {useState, useCallback} from 'react';
//import axios from '../axios-local';
import axios from '../axios-azure';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { Redirect } from 'react-router-dom';

const initialUser = {
    id: null,
    username: null,
    password: null,
    role: null,
    name: null,
    surname: null,
    email: null,
    company: null,
    token: null,
    terms: null
};

export const UserContext = React.createContext({
    customer: {...initialUser},
    error: null,
    loading: false,
    authRedirectPath: "/",
    user: (id, username, password, role, name, surname, email, company, token, terms) => {},
    // logoutUser: () => {},
    authenticationCheckState: () => {}    
});

const UserContextProvider = props => {
    const [showUser, setShowUser] = useState({...initialUser});
    const [showUserError, setShowUserError] = useState(null);
    const [showUserLoading, setShowUserLoading] = useState(false);

    const fetchUserStart = () => {
        setShowUserError(null);
        setShowUserLoading(true);
    };

    const fetchUserSuccess = (userToken, userId, userRole, userTerms, userName, userSurname, userUsername, userPassword, userCompany, userEmail) => {
        const customer = {...initialUser, token: userToken, id: userId, role: userRole, terms:userTerms, name: userName, surname: userSurname, username: userUsername, password: userPassword, company: userCompany, email: userEmail};
        setShowUser(customer);
        setShowUserError(null);
        setShowUserLoading(false);
    };

    const fetchUserFail = (error) => {
        setShowUserError(error);
        setShowUserLoading(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('terms');
        setShowUser(initialUser);
    };

    const checkAuthTimeout = useCallback((expirationTimeInSeconds) => {
        setTimeout(() => {
            logout();
        }, expirationTimeInSeconds * 1000);
    }, []);

    const expiresInSeconds = 29000;

    const getUser = (id) => {
        return dispatch => {
            dispatch(fetchUserStart());        
              
            let url = `/user`;         
                
            axios.post(url)
                .then(response => { 
                    //dispatch(fetchUserSuccess(response.data({})))
                    const expirationDate = new Date(new Date().getTime() + expiresInSeconds * 1000);
                    localStorage.setItem('id', response.data.id);
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('password', response.data.password);              
                    localStorage.setItem('role', response.data.role);
                    localStorage.setItem('name', response.data.name);              
                    localStorage.setItem('surname', response.data.surname);
                    localStorage.setItem('email', response.data.email);              
                    localStorage.setItem('company', response.data.company);
                    localStorage.setItem('terms', response.data.terms); 
                    checkAuthTimeout(expiresInSeconds);
                    fetchUserSuccess(response.data.id, response.data.username, response.data.password, 
                        response.data.role, response.data.name, response.data.surname, response.data.email,
                        response.data.company, response.data.terms)                
                }
                )
                .catch(error => {
                    fetchUserFail(error);                                
                }    
            );        
        }
    };

    

    const userCheckState = useCallback(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const terms = localStorage.getItem('terms');
        const name = localStorage.getItem('name');
        const surname = localStorage.getItem('surname');
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        const email = localStorage.getItem('email');
        const company = localStorage.getItem('company');
        const id = localStorage.getItem('id');
        if (!token) {
            logout();
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                logout();
                
            } else {
                const userId = localStorage.getItem('userId');
                fetchUserSuccess(id, username, password, 
                    role, name, surname, email,
                    company, terms);
                checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 );
            }   
        }
    }, [checkAuthTimeout]);
    

    return (
        <UserContext.Provider
            value={{
                customer: {
                    id: showUser.id,
                    username: showUser.username,
                    password: showUser.password,
                    role: showUser.role,
                    email: showUser.email,
                    name: showUser.name,
                    surname: showUser.surname,
                    company: showUser.company,
                    terms: showUser.terms,
                    token: showUser.token
                },
                error: showUserError,
                loading: showUserLoading,
                user: getUser,
                logoutUser: logout,
                authenticationCheckState: userCheckState
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default withErrorHandler(UserContextProvider, axios);