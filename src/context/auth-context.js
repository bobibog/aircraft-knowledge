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

    //##
    //////////
    firstLoginReqDateTimeMils: null,//
    refreshToken: null,//
    username: null,//
    expiresDateTimeISO: null//
    //////////
};


export const AuthContext = React.createContext({

    user: {...initialUser},
    error: null,
    loading: false,//?? vec imamo u AuthContextProvider
    authRedirectPath: "/",//
    authenticate: (username, password, isRegistration) => {},
    logoutUser: () => {},
    authenticationCheckState: () => {},

    //##
    authenticationExtendTokenExpiration: () => {}//
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

    //##
    const authExtendTokenExpiration = (userToken,refreshTokenn,expiresDateTimeISOO,usernamee,firstLoginReqDateTimeMilss) => {

        localStorage.setItem('token',userToken);
        localStorage.setItem('refreshToken',refreshTokenn);
        
        /*
        let expiresDateTimeISO = new Date(response.data.expires);
        expiresDateTimeISO.setDate(expiresDateTimeISO.getDate() + 1);
        expiresDateTimeISO = expiresDateTimeISO.toISOString();
        localStorage.setItem('expiresDateTimeISO', expiresDateTimeISO)//
        */
        localStorage.setItem('expiresDateTimeISO', expiresDateTimeISOO)//


        localStorage.setItem('username',usernamee);
        localStorage.setItem('firstLoginReqDateTimeMils',firstLoginReqDateTimeMilss);//kao da smo se ulogovali ponovo

        const user = {...authUser, token: userToken,refreshToken:refreshTokenn,expiresDateTimeISO:expiresDateTimeISOO,username:usernamee,firstLoginReqDateTimeMils:firstLoginReqDateTimeMilss};
        
        setAuthUser(user);
    };
    

    const authSuccess = (userToken, refreshTokenn,expiresDateTimeISOO,firstLoginReqDateTimeMilss,usernamee, userId, userRole, userTerms, userCompany) => {

                            //overridujemo polja iz initialUser objekta poljima nakon initialUser jer im se matchuju polja sa istim nazivom
        const user = {...initialUser, token: userToken, refreshToken:refreshTokenn,expiresDateTimeISO:expiresDateTimeISOO, firstLoginReqDateTimeMils:firstLoginReqDateTimeMilss,username:usernamee, id: userId, role: userRole, terms:userTerms, company: userCompany};

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

        //##
        ///////////////////
        localStorage.removeItem('refreshToken');//
        localStorage.removeItem('username');//
        localStorage.removeItem('expiresDateTimeISO');//
        localStorage.removeItem('firstLoginReqDateTimeMils');//
        ///////////////////

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
                                                
                //##
                ///////
                localStorage.setItem('token',token);
                localStorage.setItem('refreshToken', response.data.refreshToken)//
                localStorage.setItem('username', response.data.username)//
               

                ///////
                /*
                let expiresDateTimeISO = new Date(response.data.expires);
                expiresDateTimeISO.setDate(expiresDateTimeISO.getDate() + 1);//+1 dan (:(
                expiresDateTimeISO = expiresDateTimeISO.toISOString();
                localStorage.setItem('expiresDateTimeISO', expiresDateTimeISO)//
                */
                let newDate = new Date(response.data.expires).toISOString();
                localStorage.setItem('expiresDateTimeISO', newDate)//
                ///////

                axios.get('/account/me', {headers: {'Authorization': `Bearer ${token}`}})
                    .then(r => {
                        

                        //##
                        ///////
                        let firstLoginReqDateTimeMils = new Date(Date.now()).getTime();//ili samo Date.now()
                        localStorage.setItem('firstLoginReqDateTimeMils',firstLoginReqDateTimeMils);//
                        ///////

                        localStorage.setItem('userId', r.data.id);
                        localStorage.setItem('role', r.data.role);
                        localStorage.setItem('terms', r.data.terms);
                        localStorage.setItem('company', r.data.company)

                                                                                                                                                                        //!!!treba r.data.company
                        authSuccess(token,response.data.refreshToken,newDate,firstLoginReqDateTimeMils,response.data.username ,r.data.id, r.data.role, r.data.terms, company);
                        
                        //bilo
                        //authSuccess(token, r.data.id, r.data.role, r.data.terms, company);
                        
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

             //##
             const firstLoginReqDateTimeMils = localStorage.getItem('firstLoginReqDateTimeMils');// 
             const refreshToken = localStorage.getItem('refreshToken');//
             const username = localStorage.getItem('username')//
             const expiresDateTimeISO = localStorage.getItem('expiresDateTimeISO')//


             const role = localStorage.getItem('role');
             const terms = localStorage.getItem('terms');
             const company = localStorage.getItem('company');
           
           
             if (!token) {
                 logout();//):
                
             } else{   
                  
                const userId = localStorage.getItem('userId');
                
                //##
                authSuccess(token, refreshToken,expiresDateTimeISO,firstLoginReqDateTimeMils,username,userId, role, terms, company);
                
                //bilo
                //authSuccess(token, userId, role, terms, company);   
                  
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
                    
                    //##
                    //////////
                    firstLoginReqDateTimeMils: authUser.firstLoginReqDateTimeMils,//
                    refreshToken: authUser.refreshToken,//
                    username: authUser.username,//
                    expiresDateTimeISO: authUser.expiresDateTimeISO//
                    //////////
                },

                authRedirectPath: authRedirectPath,//dodajemo u context

                error: authError,
                loading: authLoading,
                authenticate: auth,
                logoutUser: logout,
                authenticationCheckState: authCheckState,//

                //##
                authenticationExtendTokenExpiration: authExtendTokenExpiration//
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default withErrorHandler(AuthContextProvider, axios);