import React, {useState, useCallback} from 'react';
//import axios from '../axios-local';
import axios from '../axios-azure';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { Redirect } from 'react-router-dom';

//dummy


    //kao state iz kog biramo sta cemo exposovati
const initialUser = {
    id: null,
    username: null,
    password: null,
    role: null,
    company: null,
    token: null,
    terms: null
};


export const AuthContext = React.createContext({
    user: {...initialUser},
    error: null,
    loading: false,
    authRedirectPath: "/",//
    authenticate: (username, password, isRegistration) => {},
    logoutUser: () => {},
    authenticationCheckState: () => {}    
});


const AuthContextProvider = props => {
    
    const [authUser, setAuthUser] = useState({...initialUser});//

    const [authError, setAuthError] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const [authRedirectPath,setAuthRedirectPath] = useState("/")//

    const authStart = () => {
        setAuthError(null);
        setAuthLoading(true);
    };

    const authSuccess = (userToken, userId, userRole, userTerms, userCompany) => {
        const user = {...initialUser, token: userToken, id: userId, role: userRole, terms:userTerms, company: userCompany};
        
        setAuthUser(user);//kljucno setovanje za rerender App zbog promene globalnog stanja
        setAuthError(null);
        setAuthLoading(false);
    };

    const authFail = (error) => {
        setAuthError(error);
        setAuthLoading(false);
    };

    let redirect = null;
    const logout = () => {
        localStorage.removeItem('token');
        //localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('terms');
        localStorage.removeItem('company');
        
        setAuthUser(initialUser);//kljucno setovanje za rerender App jer App koristi user
        //redirect = <Redirect to="/auth" />
    };

    // const checkAuthTimeout = useCallback((expirationTimeInSeconds) => {
    //     setTimeout(() => {
    //         logout();
    //     }, expirationTimeInSeconds * 1000);
    // }, []);

    //const expiresInSeconds = 29000;

    //login
    const auth = (username, password, role, terms, company, isRegistration) => {
        authStart();
        const authData = {
            username: username,
            password: password,
            role: role,
            terms: terms,
            company: company
        };
        let url = '/user/register';
        if (!isRegistration) {
            url = '/account/authenticate';
        }
        axios.post(url, authData)
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);

                axios.get('/account/me', {headers: {'Authorization': `Bearer ${token}`}})
                    .then(r => {
                        localStorage.setItem('userId', r.data.id);
                        localStorage.setItem('role', r.data.role);
                        localStorage.setItem('terms', r.data.terms);
                        localStorage.setItem('company', r.data.company)
                        authSuccess(token, r.data.id, r.data.role, r.data.terms, company);
                        alert('Nice to see you again '+r.data.userName);
                    });
                
            })
            .catch(err => {
                authFail(err);
            });
    };

    

    // const authCheckState = useCallback(() => {
    //     const token = localStorage.getItem('token');
    //     const role = localStorage.getItem('role');
    //     const terms = localStorage.getItem('terms');
    //     if (!token) {
    //         logout();
            
    //     } else {
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         if (expirationDate <= new Date()) {
    //             logout();
                
    //         } else {
    //             const userId = localStorage.getItem('userId');
    //             authSuccess(token, userId, role, terms);
    //             checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 );
    //         }   
    //     }
    // }, [checkAuthTimeout]);


    //kljucno za automatski login sa postojecim tokenom
    const authCheckState = useCallback(() => {

            //console.log("WIQOIOEWIOWQEIOPEQ")

             const token = localStorage.getItem('token');
             const role = localStorage.getItem('role');
             const terms = localStorage.getItem('terms');
             const company = localStorage.getItem('company');
           
           
             if (!token) {
                 logout();//):
                
             } else{   
                  
                const userId = localStorage.getItem('userId');
                authSuccess(token, userId, role, terms, company);
                     
                  
             }
    }, []);
    

    return (

        <AuthContext.Provider
            
            //exposing
            value={{
                user: {
                    id: authUser.id,

                    //POSTO APP KORISTI USER GLOBAL STATE OBJEKAT, STA GOD DA SE U NJEMU MENJA UTICACE NA RERENCER APP!!!
                    username: authUser.username,
                    password: authUser.password,
                    role: authUser.role,
                    terms: authUser.terms,
                    token: authUser.token,
                    company: authUser.company
                },

                authRedirectPath: authRedirectPath,//dodajemo u context

                error: authError,
                loading: authLoading,
                authenticate: auth,
                logoutUser: logout,
                authenticationCheckState: authCheckState//
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default withErrorHandler(AuthContextProvider, axios);