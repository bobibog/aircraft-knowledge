import React, {useState, useCallback} from 'react';
import axios from 'axios';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';

const initialUser = {
    id: null,
    username: null,
    password: null,
    role: null,
    token: null
};

export const AuthContext = React.createContext({
    user: {...initialUser},
    error: null,
    loading: false,
    authRedirectPath: "/",
    authenticate: (username, password, isRegistration) => {},
    logoutUser: () => {},
    authenticationCheckState: () => {}    
});

const AuthContextProvider = props => {
    const [authUser, setAuthUser] = useState({...initialUser});
    const [authError, setAuthError] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const authStart = () => {
        setAuthError(null);
        setAuthLoading(true);
    };

    const authSuccess = (userToken, userId) => {
        const user = {...initialUser, token: userToken, id: userId};
        setAuthUser(user);
        setAuthError(null);
        setAuthLoading(false);
    };

    const authFail = (error) => {
        setAuthError(error);
        setAuthLoading(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        setAuthUser(initialUser);
    };

    const checkAuthTimeout = useCallback((expirationTimeInSeconds) => {
        setTimeout(() => {
            logout();
        }, expirationTimeInSeconds * 1000);
    }, []);

    const expiresInSeconds = 300;

    const auth = (username, password, isRegistration) => {
        authStart();
        const authData = {
            username: username,
            password: password
        };
        let url = 'https://localhost:44350/api/v1/user/register';
        if (!isRegistration) {
            url = 'https://localhost:44350/api/v1/user/authenticate';
        }
        axios.post(url, authData)
            .then(response => {
                // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                const expirationDate = new Date(new Date().getTime() + expiresInSeconds * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.id);
                authSuccess(response.data.token, response.data.id);
                checkAuthTimeout(expiresInSeconds);
            })
            .catch(err => {
                authFail(err);
            });
    };

    const authCheckState = useCallback(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            logout();
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                logout();
            } else {
                const userId = localStorage.getItem('userId');
                authSuccess(token, userId);
                checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 );
            }   
        }
    }, [checkAuthTimeout]);

    return (
        <AuthContext.Provider
            value={{
                user: {
                    id: authUser.id,
                    username: authUser.username,
                    password: authUser.password,
                    role: authUser.role,
                    token: authUser.token
                },
                error: authError,
                loading: authLoading,
                authenticate: auth,
                logoutUser: logout,
                authenticationCheckState: authCheckState
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default withErrorHandler(AuthContextProvider, axios);