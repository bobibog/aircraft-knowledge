import React, {useState, useCallback, useRef, useEffect} from 'react';
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
    terms: null,

    token: null,

};


export const AuthContext = React.createContext({

    user: {...initialUser},
    error: null,
    loading: false,
    authRedirectPath: "/",//
    authenticate: (username, password, isRegistration) => {},
    logoutUser: () => {},
    authenticationCheckState: () => {},

});





const AuthContextProvider = props => {
    
    const [authUser, setAuthUser] = useState({...initialUser});//kopija od initialUser i vise nas ne zanima initialUser objekat vec samo authUser

    const [authError, setAuthError] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const [authRedirectPath,setAuthRedirectPath] = useState("/")//


    const authStart = () => {
        setAuthError(null);
        setAuthLoading(true);
    };


        const authSuccess = (userToken, userId, userRole, userTerms, userCompany) => {

       
        //bilo
        const user = {...initialUser, token: userToken, id: userId, role: userRole, terms:userTerms, company: userCompany};

        setAuthUser(user);//kljucno setovanje za rerender App i Auth zbog promene globalnog stanja authUser koji je exposovan kao user
        setAuthError(null);
        setAuthLoading(false);
    };

    const authFail = (error) => {
        setAuthError(error);
        setAuthLoading(false);
    };

    let redirect = null;
    const logout = () => {
        console.log("LOGOUT")

        localStorage.removeItem('token');//bilo


        //localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('terms');
        localStorage.removeItem('company');
    
        //ako imamo vise setovanja zaredom global context state onda se izvrsavaju tim redom u 1 rerenderu
        setAuthUser(initialUser);//kljucno setovanje za rerender App jer App koristi user odnosno authUser
        //redirect = <Redirect to="/auth" />

    };
    
   /* const resetTimeout = useCallback((resetTimeoutInSeconds) => {
    
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
    
        timeoutRef.current = setTimeout(() => {
            logout();
        }, resetTimeoutInSeconds * 1000);
      }, []);
    
      useEffect(() => {
    
        resetTimeout(2700);
    
        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      }, [resetTimeout]);
    */
      
                //!
    // const checkAuthTimeout = useCallback((expirationTimeInSeconds) => {
    //     setTimeout(() => {
    //         logout();
    //     }, expirationTimeInSeconds * 1000);
    // }, []);

    //const expiresInSeconds = 29000;

    //istovremeno login i register
    //za login se prosledjuje username i password a ostalo je undefined
    //za register se ni ne koristi
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
        if (!isRegistration) {//ako smo vec registrovani odnosno login jer je neprosledjeni isRegistration tada undefined sto je false
            url = '/account/authenticate';
        }
        axios.post(url, authData)
            .then(response => {
                const token = response.data.token;
                       
                localStorage.setItem('token',token);
          
                axios.get('/account/me', {headers: {'Authorization': `Bearer ${token}`}})
                    .then(r => {
                        

                        localStorage.setItem('userId', r.data.id);
                        localStorage.setItem('role', r.data.role);
                        localStorage.setItem('terms', r.data.terms);
                        localStorage.setItem('company', r.data.company)
                        
                        //bilo
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


    //kljucno za automatski login sa postojecim tokenom odnosno kada ode ponovo na front a prethodno je izasao bez logout
    //proveravamo iz localStorage ako je uradjen ctrl+r ili manuelni odlazak na url ili ponovo posecen url
    const authCheckState = useCallback(() => {

            //console.log("WIQOIOEWIOWQEIOPEQ")

             const token = localStorage.getItem('token');//bilo

             const role = localStorage.getItem('role');
             const terms = localStorage.getItem('terms');
             const company = localStorage.getItem('company');
           
           
             if (!token) {
                 logout();//):
                
             } else{   
                  
                const userId = localStorage.getItem('userId');
                   
                //bilo
                authSuccess(token, userId, role, terms, company);   
                  
             }
    }, []);
    

    return (

        <AuthContext.Provider
            
            //exposing
            value={{
                user: {
                    id: authUser.id,

                    //POSTO APP KORISTI USER GLOBAL STATE OBJEKAT, STA GOD DA SE U USER MENJA UTICACE NA RERENCER APP!!!
                    //pri login i logut menjamo authUser a user je exposovan i zavisi od authUser
                    username: authUser.username,
                    password: authUser.password,
                    role: authUser.role,
                    terms: authUser.terms,
                    token: authUser.token,
                    company: authUser.company,
                    
                },

                authRedirectPath: authRedirectPath,//dodajemo u context

                error: authError,
                loading: authLoading,
                authenticate: auth,
                logoutUser: logout,
                authenticationCheckState: authCheckState,//

            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default withErrorHandler(AuthContextProvider, axios);