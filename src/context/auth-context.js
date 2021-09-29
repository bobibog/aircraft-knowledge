import React, {useState, useCallback} from 'react';
//import axios from '../axios-local';
import axios from '../axios-azure';
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

    const authSuccess = (userToken, userId, userRole) => {
        const user = {...initialUser, token: userToken, id: userId, role: userRole};
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
        localStorage.removeItem('role');
        setAuthUser(initialUser);
    };

    const checkAuthTimeout = useCallback((expirationTimeInSeconds) => {
        setTimeout(() => {
            logout();
        }, expirationTimeInSeconds * 1000);
    }, []);

    const expiresInSeconds = 1300;

    const auth = (username, password, role, isRegistration) => {
        authStart();
        const authData = {
            username: username,
            password: password,
            role: role
        };
        let url = '/user/register';
        if (!isRegistration) {
            url = '/user/authenticate';
        }
        axios.post(url, authData)
            .then(response => {
                // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                const expirationDate = new Date(new Date().getTime() + expiresInSeconds * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('role', response.data.role)
                authSuccess(response.data.token, response.data.id, response.data.role);
                checkAuthTimeout(expiresInSeconds);
            })
            .catch(err => {
                authFail(err);
            });
    };

    const authCheckState = useCallback(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token) {
            logout();
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                logout();
            } else {
                const userId = localStorage.getItem('userId');
                authSuccess(token, userId, role);
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