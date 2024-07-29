import React, {useState, useCallback, useRef, useEffect} from 'react';
//import axios from '../axios-local';
import axios from '../axios-azure';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import { Redirect } from 'react-router-dom';//useNavigate

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
    firstLoginReqDateTimeMils: null,//mils od 1970(odnosno unix)
    refreshToken: null,
    username: null,
    expiresDateTimeISO: null,//vec iso zona u odnosu na 00:00 
    
    //iat i exp nam trebaju iz decodedToken a konvertovacemo ih iz sec od 1970 u mils
    iatMils: null,
    expMils: null,
    //////////

};
    //exp-iat == 1h+~8min valid
    //iat i exp nam trebaju iz decodedToken a konvertovacemo ih iz sec od 1970 u mils
    //u iso u odnosu na utc prikazujemo offset za vremensku zonu
    //UTC 2024-07-23 10:00:00 == ISO 8601: 2024-07-23T10:00:00Z
    //utc je offset zone 00:00
 
    
            
export const AuthContext = React.createContext({

    user: {...initialUser},
    error: null,
    loading: false,
    
    authRedirectPath: "/",//
    authShouldLogout: null,//
    authSetShouldLogout: () => {},//

    authenticate: (username, password, isRegistration) => {},
    logoutUser: () => {},
    authenticationCheckState: () => {},
});





const AuthContextProvider = props => {
    
    const [authUser, setAuthUser] = useState({...initialUser});//kopija od initialUser i vise nas ne zanima initialUser objekat vec samo authUser

    const [authError, setAuthError] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const [authRedirectPath,setAuthRedirectPath] = useState("/auth")//
    const [authShouldLogout,authSetShouldLogout] = useState(false)//

    let timerLogout = useRef(null);//u current



    const authStart = () => {
        setAuthError(null);
        setAuthLoading(true);
    };


    const decodeToken = (token) => {

        var base64Url = token.split('.')[1];//payload
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {//bod ptp 1:1, N:1?
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        var decodedToken = JSON.parse(jsonPayload);
        return decodedToken;
    }

    //const navigateTo = useNavigate();//iz js

    const startLogoutTimeout = (mils) => {
        timerLogout.current = setTimeout(()=>{
            authCheckState()//navigateTo("/logout")
        },mils)  
    }

    useEffect(()=>{

        return () => {clearTimeout(timerLogout.current)}

    },[])


    const authSuccess = (userToken,iatt,expp, refreshTokenn,expiresDateTimeISOO,firstLoginReqDateTimeMilss,usernamee, userId, userRole, userTerms, userCompany) => {
        //const authSuccess = (userToken, userId, userRole, userTerms, userCompany) => {

       
        const user = {...initialUser,iatMils:iatt,expMils:expp, token: userToken, refreshToken:refreshTokenn,expiresDateTimeISO:expiresDateTimeISOO, firstLoginReqDateTimeMils:firstLoginReqDateTimeMilss,username:usernamee, id: userId, role: userRole, terms:userTerms, company: userCompany};

        //bilo
        //const user = {...initialUser, token: userToken, id: userId, role: userRole, terms:userTerms, company: userCompany};

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

        //##
        ///////////////////
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('expiresDateTimeISO');
        localStorage.removeItem('firstLoginReqDateTimeMils');
        localStorage.removeItem('iatMils');
        localStorage.removeItem('expMils');
       ///////////////////
    
        clearTimeout(timerLogout.current)

   
        setAuthUser(initialUser);//kljucno setovanje za rerender App jer App koristi user odnosno authUser
        
        
        authSetShouldLogout(true)
     
        //redirect = <Redirect to="/auth" />
    };      
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
                       

                let decodedToken = decodeToken(token);
                
                localStorage.setItem('token',token);
          
                //##
                ///////
                localStorage.setItem('refreshToken', response.data.refreshToken)
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('expiresDateTimeISO', response.data.expires)//vec u iso
                localStorage.setItem('iatMils',decodedToken.iat*1000)//iz sec u mils
                localStorage.setItem('expMils',decodedToken.exp*1000)
                
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
                        
                                                                                                                                                                                                                                //!!!r.data.company
                        authSuccess(token,decodedToken.iat*1000,decodedToken.exp*1000,response.data.refreshToken,response.data.expires,firstLoginReqDateTimeMils,response.data.username ,r.data.id, r.data.role, r.data.terms, company);

                        //bilo
                        //authSuccess(token, r.data.id, r.data.role, r.data.terms, company);
                        startLogoutTimeout(decodedToken.exp*1000-decodedToken.iat*1000);

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

             const token = localStorage.getItem('token');//bilo

             const role = localStorage.getItem('role');
             const terms = localStorage.getItem('terms');
             const company = localStorage.getItem('company');
             const userId = localStorage.getItem('userId');
             
             //##
             /////////
             const firstLoginReqDateTimeMils = Number(localStorage.getItem('firstLoginReqDateTimeMils'));
             const refreshToken = localStorage.getItem('refreshToken');
             const username = localStorage.getItem('username')
             const expiresDateTimeISO = localStorage.getItem('expiresDateTimeISO')
             const iatMils = Number(localStorage.getItem('iatMils'))
             const expMils = Number(localStorage.getItem('expMils'))
             /////////
           

             
             let firstLoginReqDateTimeMilsExtnd = firstLoginReqDateTimeMils+(expMils-iatMils);
                
                

             if (!token || firstLoginReqDateTimeMilsExtnd <= Date.now()) {
                 if(token)
                    alert('Login again, token expired');
                
                 logout();//):
                
             }else if(firstLoginReqDateTimeMilsExtnd > Date.now()){   
                authSuccess(token,iatMils,expMils,refreshToken,expiresDateTimeISO,firstLoginReqDateTimeMils,username,userId, role, terms, company);
                startLogoutTimeout(firstLoginReqDateTimeMilsExtnd-Date.now());
            
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
                    firstLoginReqDateTimeMils: authUser.firstLoginReqDateTimeMils,
                    refreshToken: authUser.refreshToken,
                    username: authUser.username,
                    expiresDateTimeISO: authUser.expiresDateTimeISO,
                    iatMils: authUser.iatMils,
                    expMils: authUser.expMils
                    //////////
                },

                /////
                authRedirectPath: authRedirectPath,//dodajemo u context
                authShouldLogout: authShouldLogout,
                authSetShouldLogout: authSetShouldLogout, 
                /////

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