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
    refreshToken: null,
    username: null,
    //expiresDateTimeISO: null,//vec iso zona u odnosu na 00:00 
    //expiresDateTimeISOExtend: null,
    
    //iat i exp nam trebaju iz decodedToken a konvertovacemo ih iz sec od 1970 u mils
    //iatMils: null,
    //expMils: null,
    //////////

};
    //exp-iat == 1h
    //valid 1h+3min
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
    
    const [authUser, setAuthUser] = useState({...initialUser});//kopiramo polja od initialUser u authUser a initialUser je za reset vrednosti odnosno logout

    const [authError, setAuthError] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);

    const [authRedirectPath,setAuthRedirectPath] = useState("/")//
    const [authShouldLogout,authSetShouldLogout] = useState(false)//

    //////////
    const timerLogoutTokenInvalid = useRef(null);
    const timerLogoutTimeoutInactivity = useRef(null)
    const [logoutInactivityTimeRemainingMils,setLogoutInactivityTimeRemainingMils] = useState(0);
    const [logoutTokenInvalidTimeRemainingMils,setLogoutTokenInvalidTimeRemainingMils] = useState(0)
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    //////////

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

    //const navigateTo = useNavigate();


    // const startLogoutTimeoutTokenInvalid = (mils)=>{

    //     localStorage.setItem('tokenInvalidTimerStartMils',Date.now())
    //     localStorage.setItem('tokenInvalidTimerEndMils',Date.now()+mils)

    //     //alert(mils)
    
    //     //localStorage.setItem('logoutTokenInvalidTimeRemainingMils',mils)
    //     //setLogoutTokenInvalidTimeRemainingMils((prev)=>prev>=mils?mils-1:mils+1)//da bi se izazvali refresh(reset) u clock

    //                         //deref
    //     timerLogoutTokenInvalid.current = setTimeout(()=>{
    //         //alert("LA")
    //         checkTimeout("tokenInvalid")
    //     },mils)  
    // }

    //1)
    //*.......r.*
    //#.......r.#
    //refresh
    //2)
    //*.....r..*
    //#.....r...#
    //refresh
    //3)
    //*.....r.*
    //

    // const startLogoutTimeoutInactivity = (mils)=>{    

    //     localStorage.setItem('inactivityTimerStartMils',Date.now())
    //     localStorage.setItem('inactivityTimerEndMils',Date.now()+mils)//-5000

    //     //setLogoutInactivityTimeRemainingMils((prev)=>prev>=mils?mils-1:mils+1)

    //     timerLogoutTimeoutInactivity.current = setTimeout(()=>{
    //         //alert(mils)
    //         checkTimeout("inactivity")
    //     },mils)//-5000  
    // }

    // const authSuccess = (tokenn,iatt,expp, refreshTokenn,expiresDateTimeISOO,expiresDateTimeISOExtendd,usernamee, userId, userRole, userTerms, userCompany) => {
        const authSuccess = (tokenn,refreshTokenn,usernamee, userId, userRole, userTerms, userCompany) => {
        //const authSuccess = (token, userId, userRole, userTerms, userCompany) => {
       
        // const user = {...authUser,iatMils:iatt,expMils:expp, token: tokenn, refreshToken:refreshTokenn,expiresDateTimeISO:expiresDateTimeISOO,expiresDateTimeISOExtend:expiresDateTimeISOExtendd,username:usernamee, id: userId, role: userRole, terms:userTerms, company: userCompany};
        const user = {...authUser,token: tokenn, refreshToken:refreshTokenn,username:usernamee, id: userId, role: userRole, terms:userTerms, company: userCompany};
       
        //bilo
        //const user = {...initialUser, token: tokenn, id: userId, role: userRole, terms:userTerms, company: userCompany};

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
        //console.log("LOGOUT")

        localStorage.removeItem('token');//bilo

        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('terms');
        localStorage.removeItem('company');

        //##
        ///////////////////
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('expiresDateTimeISO');
        localStorage.removeItem('expiresDateTimeISOExtend');
        localStorage.removeItem('iatMils');
        localStorage.removeItem('expMils');
        localStorage.removeItem('lastUsedReqMils');
        ///////////////////
        localStorage.removeItem('inactivityTimerStartMils')
        localStorage.removeItem('tokenInvalidTimerStartMils')
        localStorage.removeItem('inactivityTimerEndMils')
        localStorage.removeItem('tokenInvalidTimerEndMils')                                   

        localStorage.removeItem('logoutInactivityTimeRemainingMils')
        localStorage.removeItem('logoutTokenInvalidTimeRemainingMils')
        

        // clearTimeout(timerLogoutTokenInvalid.current)
        // clearTimeout(timerLogoutTimeoutInactivity.current)
   
        // setLogoutInactivityTimeRemainingMils(0);
        // setLogoutTokenInvalidTimeRemainingMils(0);
        
        setIsLoggedIn(false)
    
        //prelazi u da1 switch
        setAuthUser(initialUser);//kljucno setovanje za rerender App jer App koristi user odnosno authUser
        
        //redirect na Auth za login(ili bilo koju rutu koja je dozovljena bez tokena) jer ce inace ostati trenutna ruta koja ne mora postojati u da1
        authSetShouldLogout(true)
        
        //window.removeEventListener('storage',listenLocalRef.current)//ako se izloguje manuelno odnosno ne preko authCheckState
           
        
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
                //we must set token, which login backend endpoint returns, 
                //in authContext state and localStorage, to be able to 
                //embedd token in the next api request fetchMe to retreive
                //all other user data that we need (username, role, ...)
                localStorage.setItem('token',response.data.token);
                setAuthUser({token: response.data.token, ...authUser});
                fetchMe(
                    response.data.token
                    //,response.data.refreshToken
                    //,response.data.expires
                    //,response.data.username
                )
                .then(res=>{        
                    alert('Nice to see you again '+response.data.user.username)
                })
                
                /*
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
                        
                    
                        localStorage.setItem('userId', r.data.id);
                        localStorage.setItem('role', r.data.role);
                        localStorage.setItem('terms', r.data.terms);
                        localStorage.setItem('company', r.data.company)
                        
                                                                                                                                                                                                                                //!!!r.data.company
                        authSuccess(token,decodedToken.iat*1000,decodedToken.exp*1000,response.data.refreshToken,response.data.expires,response.data.username ,r.data.id, r.data.role, r.data.terms, company);

                        //bilo
                        //authSuccess(token, r.data.id, r.data.role, r.data.terms, company);
                        startLogoutTimeout(decodedToken.exp*1000-decodedToken.iat*1000);

                        alert('Nice to see you again '+r.data.userName);
                    });
                    */
                
            })
            .catch(err => {
                //localStorage.removeItem('lastUsedReqMils')
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


/*
const listenLocalRef = useRef(null)

const handleStorageEvent = (token,userId,role,tokenInvalidTimerEndMils,tokenInvalidTimerStartMils,inactivityTimerEndMils,inactivityTimerStartMils,expMils,iatMils,refreshToken,username,lastUsedReqMils,expiresDateTimeISO,terms,company) => {
    listenLocalRef.current = function listenLocal(){
        alert("NO no..")
        if(localStorage.token !== token || 
           localStorage.userId !== userId || 
           localStorage.role !== role ||
           localStorage.expMils !== expMils ||
           localStorage.iatMils !== iatMils || 
           localStorage.refreshToken !== refreshToken ||
           localStorage.username !== username ||
           localStorage.lastUsedReqMils !== lastUsedReqMils ||
           localStorage.expiresDateTimeISO !== expiresDateTimeISO ||
           localStorage.expiresDateTimeISOExtnd !== expiresDateTimeISOExtnd ||
           localStorage.terms !== terms ||
           localStorage.tokenInvalidTimerEndMils !== tokenInvalidTimerEndMils ||
           localStorage.tokenInvalidTimerStartMils !== tokenInvalidTimerStartMils ||
           localStorage.inactivityTimerEndMils !== inactivityTimerEndMils ||
           localStorage.inactivityTimerStartMils !== inactivityTimerStartMils ||
           localStorage.company !== company){//kada se clearuje localStorage manuelno vracamo iz context a kada se clearuje iz context vracamo iz localStorage
                localStorage.token = token;
                localStorage.userId = userId;
                localStorage.role = role;
                localStorage.expMils = expMils;
                localStorage.iatMils = iatMils;
                localStorage.refreshToken = refreshToken;
                localStorage.username = username; 
                localStorage.lastUsedReqMils = lastUsedReqMils;
                localStorage.expiresDateTimeISO = expiresDateTimeISO;
                localStorage.expiresDateTimeISOExtnd = expiresDateTimeISOExtnd;
                localStorage.terms = terms;
                localStorage.tokenInvalidTimerEndMils = tokenInvalidTimerEndMils;
                localStorage.tokenInvalidTimerStartMils = tokenInvalidTimerStartMils; 
                localStorage.inactivityTimerEndMils = inactivityTimerEndMils;
                localStorage.inactivityTimerStartMils = inactivityTimerStartMils;
                localStorage.company = company;
           }
    }
    return listenLocalRef.current;
  }
*/

// const initializeStateStorage = (token,refreshToken,expiresDateTimeISO,username,expMils,iatMils,userId,role,terms,company) => {
const initializeStateStorage = (token,refreshToken,username,userId,role,terms,company) => {
    
    
    //let expiresDateTimeISOO = new Date(expiresDateTimeISO);
    //let currDate = new Date();

    // currDate.setUTCFullYear(9999);//currDate.setUTCFullYear(expiresDateTimeISOO.getUTCFullYear());//
    // currDate.setUTCHours(expiresDateTimeISOO.getUTCHours());
    // currDate.setUTCMinutes(expiresDateTimeISOO.getUTCMinutes());
    // currDate.setUTCSeconds(expiresDateTimeISOO.getUTCSeconds());
    // currDate.setUTCMilliseconds(expiresDateTimeISOO.getUTCMilliseconds());

    //localStorage.setItem('expiresDateTimeISOExtend',currDate.toISOString())
    //localStorage.setItem('expiresDateTimeISO',expiresDateTimeISO)

    localStorage.setItem('token',token);
    localStorage.setItem('refreshToken',refreshToken);
    localStorage.setItem('username',username);
    //localStorage.setItem('iatMils',iatMils);
    //localStorage.setItem('expMils',expMils);

    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
    localStorage.setItem('terms', terms);
    localStorage.setItem('company', company)

    
    authSuccess(token,refreshToken,username ,userId, role, terms, company);

    //const user = {...authUser,iatMils:decodedToken.iat,expMils:decodedToken.exp,token: token,refreshToken:refreshTokenn,expiresDateTimeISO:expiresDateTimeISOO,username:usernamee};
    //setAuthUser(user);
};


    //i login i refresh-token
// const fetchMe = (token,refreshToken,expires,username) =>{
const fetchMe = (token) =>{

    return new Promise((resolve,reject)=>{    
        
    //axios.get('/account/me', {headers: {'Authorization': `Bearer ${token}`}})
    axios.get('/account/me', {headers: {'Authorization': `Bearer ${token}`}})
    .then(r => {

        //let decodedToken = decodeToken(token)   
        // initializeStateStorage(token,refreshToken,expires,username,decodedToken.exp*1000,decodedToken.iat*1000,r.data.id,r.data.role,r.data.terms,r.data.company)
        //We have already initialized token in login api call!
        // initializeStateStorage(token,r.data.refreshToken,r.data.userName,r.data.id,r.data.role,r.data.terms,r.data.company);
        //Now it is changed that user data are in user object:
        initializeStateStorage(token,r.data.user.refreshToken,r.data.user.userName,r.data.user.id,r.data.user.role,r.data.user.terms,r.data.user.company);
        
        // if(!isLoggedIn)
        //     localStorage.setItem('lastUsedReqMils',0)//new Date(0) 1970 mils//da ne obuhvatimo da je aktivan nakon logina
        
        resolve(r);
    }).catch(error => {
        logout();
        // initializeStateStorage(token,refreshToken,expires,username)//postavljamo nezavisno od /account/me tako da ce naredni neprosledjeni biti undefined
        //initializeStateStorage(r.data.refreshToken,r.data.expires,r.data.username)//postavljamo nezavisno od /account/me tako da ce naredni neprosledjeni biti undefined
        reject(error)
    })
    
    }) 
}
// const extendTokenDuration = (username,expiresDateTimeISOExtend,refreshToken)=>{
  
//     axios.post(`/Account/refresh-token?username=`+username+"&expires="+expiresDateTimeISOExtend,{
//         'refreshToken': refreshToken
//     }).then(response => { 
//         fetchMe(response.data.token,response.data.refreshToken,response.data.expires,response.data.username)
//     }).catch(error => {
//         logout();
//         alert('Cant refresh token');
//     }) 
    
// }

    // const checkTimeout = (timerName)=>{
    //     //alert(timerName)
        
    //     const lastUsedReqMils = Number(localStorage.getItem('lastUsedReqMils'))
    //     const iatMils = Number(localStorage.getItem('iatMils'))
    //     const expMils = Number(localStorage.getItem('expMils'))

    //     const inactivityTimerStartMils = Number(localStorage.getItem('inactivityTimerStartMils'))
    //     const inactivityTimerEndMils = Number(localStorage.getItem('inactivityTimerEndMils'))
    //     const tokenInvalidTimerStartMils = Number(localStorage.getItem('tokenInvalidTimerStartMils'))
    //     const tokenInvalidTimerEndMils = Number(localStorage.getItem('tokenInvalidTimerEndMils'))                                   
    
    //     let tokenExpires = expMils-iatMils
            
    //     if(timerName && (timerName === "tokenInvalid")){
                
    //             //alert("1")
    //             if((lastUsedReqMils > tokenInvalidTimerStartMils) && (lastUsedReqMils < tokenInvalidTimerEndMils)){
    //                 //alert("TOKEN EXTEND") 
    //                 extendTokenDuration(localStorage.getItem('username'),localStorage.getItem('expiresDateTimeISOExtend'),localStorage.getItem('refreshToken'))
    //                 startLogoutTimeoutTokenInvalid(tokenExpires);//ts tokenExpires//20*1000
    //             }else{
    //                 logout();
    //                 alert('Token expired, login again'); 
    //             }
    //         //#
    //     }else if(timerName){
    //         //alert(timerName)
    //         //inactivity istekao i bio je aktivan              
    //         if((lastUsedReqMils > inactivityTimerStartMils) && (lastUsedReqMils < inactivityTimerEndMils)){
                
    //             //alert("NEXT REMAINING INACTIVITY")
    //             //alert(20*1000-(inactivityTimerEndMils-lastUsedReqMils))
    //             //alert("INACTIVITY EXTEND")                    //novo_vreme_dostupne_neaktivnosti=tokenExpires-vreme_ostale_neaktivnosti
    //             startLogoutTimeoutInactivity(tokenExpires-(inactivityTimerEndMils-lastUsedReqMils));//ts tokenExpires//20*1000
    //         }else{//nije bio aktivan
                    
    //             logout();
    //             alert('Inactivity time reached, login again'); 
    //         }
    //     }
    // }

    const fromStorageToState = () => {
  
             
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const terms = localStorage.getItem('terms');
        const company = localStorage.getItem('company');
        const userId = localStorage.getItem('userId');
        
        //##
        /////////
        const refreshToken = localStorage.getItem('refreshToken');
        const username = localStorage.getItem('username')
        //const expiresDateTimeISO = localStorage.getItem('expiresDateTimeISO')
        //const expiresDateTimeISOExtend = localStorage.getItem('expiresDateTimeISOExtend')
        //const iatMils = Number(localStorage.getItem('iatMils'))
        //const expMils = Number(localStorage.getItem('expMils'))
        /////////
        
        // authSuccess(token,iatMils,expMils,refreshToken,expiresDateTimeISO,expiresDateTimeISOExtend,username ,userId, role, terms, company);  
        authSuccess(token,refreshToken,username ,userId, role, terms, company);  
        
    }
    // useEffect(()=>{

    //     if(isLoggedIn){
    //         //alert("REFRESH")

    //         fromStorageToState();
    //         let lastUsedReqMils = Number(localStorage.getItem('lastUsedReqMils'));
    //         let iatMils = Number(localStorage.getItem('iatMils'))
    //         let expMils = Number(localStorage.getItem('expMils'))
    //         let tokenInvalidTimerEndMils = Number(localStorage.getItem('tokenInvalidTimerEndMils'))
    //         let inactivityTimerEndMils = Number(localStorage.getItem('inactivityTimerEndMils')) 

    //          //odmah nakon logina
    //         if(lastUsedReqMils === 0){
    //             //alert("DA1")
    //             startLogoutTimeoutTokenInvalid(expMils-iatMils);//ts expMils-iatMils//20*1000
    //             startLogoutTimeoutInactivity(expMils-iatMils);//ts expMils-iatMils//20*1000
    //         }
    //         //refresh(remount context i ako postoji token u localStorage)
    //         else if(tokenInvalidTimerEndMils > Date.now() && inactivityTimerEndMils > Date.now()){
    //             //alert("DA2")
    //             startLogoutTimeoutTokenInvalid(tokenInvalidTimerEndMils-Date.now());
    //             startLogoutTimeoutInactivity(inactivityTimerEndMils-Date.now()); 
    //         }else{//isteklo vreme iako je refreshovao
    //             //alert("DA3")
    //             logout()
    //         }
    // }
    // },[isLoggedIn])
   
    const authCheckState = useCallback(() => {
        
             //window.removeEventListener('storage',listenLocalRef.current)

             const token = localStorage.getItem('token');//bilo

            //alert("TKNE"+token)

             if(!token){//za inicijalni mount pre logina
                //alert("LOLP")
                logout()
             }else{//pri mount(ili nezavisan poziv) ili ctrl+r ili manuelni odlazak na url ili login onda refreshTimers i refreshState(iz localStorage)
                
                setIsLoggedIn(true)

                //window.addEventListener('storage',handleStorageEvent(token,userId,role,tokenInvalidTimerEndMils,tokenInvalidTimerStartMils,inactivityTimerEndMils,inactivityTimerStartMils,expMils,iatMils,refreshToken,username,lastUsedReqMils,expiresDateTimeISO,expiresDateTimeISOExtend,terms,company))
            }                
            //bilo
            //authSuccess(token, userId, role, terms, company);           
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
                    refreshToken: authUser.refreshToken,
                    username: authUser.username,
                    expiresDateTimeISO: authUser.expiresDateTimeISO,
                    iatMils: authUser.iatMils,
                    expMils: authUser.expMils,
                    //////////
                },

                /////
                authRedirectPath: authRedirectPath,//dodajemo u context
                authShouldLogout: authShouldLogout,
                authSetShouldLogout: authSetShouldLogout, 
                logoutInactivityTimeRemainingMils: logoutInactivityTimeRemainingMils,
                logoutTokenInvalidTimeRemainingMils: logoutTokenInvalidTimeRemainingMils,
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