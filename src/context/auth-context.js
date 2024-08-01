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
    expiresDateTimeISOExtend: null,
    
    //iat i exp nam trebaju iz decodedToken a konvertovacemo ih iz sec od 1970 u mils
    iatMils: null,
    expMils: null,
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

    let timerLogoutTokenInvalid = useRef(null);

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

    const startLogoutTimeoutTokenInvalid = (mils) => {
        timerLogoutTokenInvalid.current = setTimeout(()=>{
            authCheckState()
        },mils)  
    }
    useEffect(()=>{

        return () => {clearTimeout(timerLogoutTokenInvalid.current)}
        
    },[])


    const authSuccess = (tokenn,iatt,expp, refreshTokenn,expiresDateTimeISOO,expiresDateTimeISOExtendd,firstLoginReqDateTimeMilss,usernamee, userId, userRole, userTerms, userCompany) => {
        //const authSuccess = (token, userId, userRole, userTerms, userCompany) => {

       
        const user = {...initialUser,iatMils:iatt,expMils:expp, token: tokenn, refreshToken:refreshTokenn,expiresDateTimeISO:expiresDateTimeISOO,expiresDateTimeISOExtend:expiresDateTimeISOExtendd, firstLoginReqDateTimeMils:firstLoginReqDateTimeMilss,username:usernamee, id: userId, role: userRole, terms:userTerms, company: userCompany};
    
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
        localStorage.removeItem('expiresDateTimeISOExtend');
        localStorage.removeItem('firstLoginReqDateTimeMils');
        localStorage.removeItem('iatMils');
        localStorage.removeItem('expMils');
        localStorage.removeItem('lastUsedReqMils');
       ///////////////////

        clearTimeout(timerLogoutTokenInvalid.current)

   
        //prelazi u da1 switch
        setAuthUser(initialUser);//kljucno setovanje za rerender App jer App koristi user odnosno authUser
        ////////////////////////////////////////////////    
        ////////////////////////////////////////////////
        //redirect na Auth jer ce inace ostati trenutna ruta koja ne mora postojati u da1
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
                fetchMe(response.data.token,response.data.refreshToken,response.data.expires,response.data.username,Date.now())
                .then(res=>alert('Nice to see you again '+response.data.username))
                
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
                    */
                
            })
            .catch(err => {
                localStorage.removeItem('lastUsedReqMils')
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

const handleStorageEvent = (token,userId,role,firstLoginReqDateTimeMils,expMils,iatMils,refreshToken,username,lastUsedReqMils,expiresDateTimeISO,terms,company) => {
    listenLocalRef.current = function listenLocal(){
        alert("NO no..")
        if(localStorage.token !== token || 
           localStorage.userId !== userId || 
           localStorage.role !== role ||
           localStorage.firstLoginReqDateTimeMils !== firstLoginReqDateTimeMils ||
           localStorage.expMils !== expMils ||
           localStorage.iatMils !== iatMils || 
           localStorage.refreshToken !== refreshToken ||
           localStorage.username !== username ||
           localStorage.lastUsedReqMils !== lastUsedReqMils ||
           localStorage.expiresDateTimeISO !== expiresDateTimeISO ||
           localStorage.terms !== terms ||
           localStorage.company !== company){//kada se clearuje localStorage manuelno vracamo iz context a kada se clearuje iz context vracamo iz localStorage
                localStorage.token = token;
                localStorage.userId = userId;
                localStorage.role = role;
                localStorage.firstLoginReqDateTimeMils = firstLoginReqDateTimeMils;
                localStorage.expMils = expMils;
                localStorage.iatMils = iatMils;
                localStorage.refreshToken = refreshToken;
                localStorage.username = username; 
                localStorage.lastUsedReqMils = lastUsedReqMils;
                localStorage.expiresDateTimeISO = expiresDateTimeISO;
                localStorage.terms = terms;
                localStorage.company = company;
           }
    }
    return listenLocalRef.current;
  }
*/

const initializeStateStorage = (token,refreshToken,expiresDateTimeISO,username,firstLoginReqDateTimeMils,expMils,iatMils,userId,role,terms,company) => {
    
    
    let expiresDateTimeISOO = new Date(expiresDateTimeISO);
    let currDate = new Date();
    currDate.setUTCFullYear(9999)
    currDate.setUTCHours(expiresDateTimeISOO.getUTCHours());
    currDate.setUTCMinutes(expiresDateTimeISOO.getUTCMinutes());
    currDate.setUTCSeconds(expiresDateTimeISOO.getUTCSeconds());
    currDate.setUTCMilliseconds(expiresDateTimeISOO.getUTCMilliseconds());

    localStorage.setItem('expiresDateTimeISOExtend',currDate.toISOString())
    localStorage.setItem('expiresDateTimeISO',expiresDateTimeISO)

    localStorage.setItem('token',token);
    localStorage.setItem('refreshToken',refreshToken);
    localStorage.setItem('username',username);
    localStorage.setItem('firstLoginReqDateTimeMils',firstLoginReqDateTimeMils);//kao da smo se ulogovali ponovo
    localStorage.setItem('iatMils',iatMils);
    localStorage.setItem('expMils',expMils);

    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
    localStorage.setItem('terms', terms);
    localStorage.setItem('company', company)

    authSuccess(token,iatMils,expMils,refreshToken,expiresDateTimeISO,currDate.toISOString(),firstLoginReqDateTimeMils,username ,userId, role, terms, company);

    //const user = {...authUser,iatMils:decodedToken.iat,expMils:decodedToken.exp,token: token,refreshToken:refreshTokenn,expiresDateTimeISO:expiresDateTimeISOO,username:usernamee,firstLoginReqDateTimeMils:firstLoginReqDateTimeMilss};
    //setAuthUser(user);
};


const fetchMe = (token,refreshToken,expires,username,firstLoginReqDateTimeMils) =>{

    return new Promise((resolve,reject)=>{    
        
    //initializeStateStorage(token,refreshToken,expires,username,firstLoginReqDateTimeMils)

    axios.get('/account/me', {headers: {'Authorization': `Bearer ${token}`}})
    .then(r => {

        let decodedToken = decodeToken(token)   
        initializeStateStorage(token,refreshToken,expires,username,firstLoginReqDateTimeMils,decodedToken.exp*1000,decodedToken.iat*1000,r.data.id,r.data.role,r.data.terms,r.data.company)
        startLogoutTimeoutTokenInvalid(decodedToken.exp*1000-decodedToken.iat*1000);//+1000*60*3//TEST 20*1000
        resolve(r);
    }).catch(error => {
        logout();
        initializeStateStorage(token,refreshToken,expires,username,firstLoginReqDateTimeMils)//postavljamo nezavisno od /account/me tako da ce naredni neprosledjeni biti undefined
        reject(error)
    })
    
    }) 
}
const extendTokenDuration = (username,expiresDateTimeISOExtend,refreshToken)=>{
  /*
    let expiresDateTimeISOO = new Date(expiresDateTimeISO);
    let currDate = new Date();
    currDate.setUTCHours(expiresDateTimeISOO.getUTCHours());
    currDate.setUTCMinutes(expiresDateTimeISOO.getUTCMinutes());
    currDate.setUTCSeconds(expiresDateTimeISOO.getUTCSeconds());
    currDate.setUTCMilliseconds(expiresDateTimeISOO.getUTCMilliseconds());

    let allPassedMins = ((Date.now()-authUser.firstLoginReqDateTimeMils)/1000)/60
    
    if(passedMins > 19){

        var passedHours = allPassedMins/60
        var passedMins = allPassedMins%60

        if(passedHours + currDate.getUTCHours() < 24){
            
            currDate.setUTCMinutes(currDate.getUTCMinutes()+passedMins)
            currDate.setUTCHours(currDate.getUTCHours()+passedHours)

            axios.post(`/Account/refresh-token?username=`+username+"&expires="+currDate.toISOString(),{
                'refreshToken': refreshToken//body
            }).then(response => { 
                                //                      //                      //
                fetchMe(response.data.token,response.data.refreshToken,response.data.expires,response.data.username,Date.now())
            }).catch(error => {
                logout();
                alert('Cant refresh token');
            }) 
        }else{
            logout()
            alert('Cant refresh token'); 
        }
    }else{ 
        axios.post(`/Account/refresh-token?username=`+username+"&expires="+currDate.toISOString(),{
            'refreshToken': refreshToken//body
        }).then(response => { 
            fetchMe(response.data.token,response.data.refreshToken,response.data.expires,response.data.username,Date.now())
        }).catch(error => {
            logout();
        }) 
    
    }
    */
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    axios.post(`/Account/refresh-token?username=`+username+"&expires="+expiresDateTimeISOExtend,{
        'refreshToken': refreshToken
    }).then(response => { 
        fetchMe(response.data.token,response.data.refreshToken,response.data.expires,response.data.username,Date.now())
    }).catch(error => {
        logout();
        alert('Cant refresh token');
    }) 
    
}

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
        const expiresDateTimeISO = localStorage.getItem('expiresDateTimeISO')
        const expiresDateTimeISOExtend = localStorage.getItem('expiresDateTimeISOExtend')
        const iatMils = Number(localStorage.getItem('iatMils'))
        const expMils = Number(localStorage.getItem('expMils'))
        const firstLoginReqDateTimeMils = Number(localStorage.getItem('firstLoginReqDateTimeMils'));
        /////////

        authSuccess(token,iatMils,expMils,refreshToken,expiresDateTimeISO,expiresDateTimeISOExtend,firstLoginReqDateTimeMils,username ,userId, role, terms, company);  
    }

    //kljucno za automatski login sa postojecim tokenom odnosno kada ode ponovo na front a prethodno je izasao bez logout
    //proveravamo iz localStorage ako je uradjen ctrl+r ili manuelni odlazak na url ili ponovo posecen url
    const authCheckState = useCallback(() => {
        
             //window.removeEventListener('storage',listenLocalRef.current)
          
           

             const token = localStorage.getItem('token');//bilo
             const firstLoginReqDateTimeMils = Number(localStorage.getItem('firstLoginReqDateTimeMils'));
             const lastUsedReqMils = Number(localStorage.getItem('lastUsedReqMils'))
             const iatMils = Number(localStorage.getItem('iatMils'))
             const expMils = Number(localStorage.getItem('expMils'))

                                                    
             let logoutTimeInactivity = expMils-iatMils//+1000*60*3//TEST 20*1000
             let firstLoginReqDateTimeMilsExtnd = firstLoginReqDateTimeMils+logoutTimeInactivity;//

             
             clearTimeout(timerLogoutTokenInvalid.current)

             
             if (!token)//za inicijalni mount pre logina
                logout()


            //osim poziva pri mount(ili nezavisno) i ctrl+r ili manuelni odlazak na url
            /////////////////////////////////////////////////////////////// //

                                                    //+1000 da ne obuhvati poslednji extendTokenDuration fetch odnosno lastUsedReqMils jer bi se inace radio extendTokenDuration posle inactivity time
             else if(lastUsedReqMils > (Date.now()-logoutTimeInactivity)){//ako je koristio front poslednjih 1h ne logoutujemo se
                
                if(Date.now() >= firstLoginReqDateTimeMilsExtnd){//ako je proslo 1h ali je postojala aktivnost(iz timerLogoutTokenInvalid)

                                        //ne mozemo koristiti authUser jer bi bio predefinisan na inicijalne vrednosti u trenutku definisanja authCheckState sto je null zbog useCallBack pa bismo onda morali da koristimo watch
                    extendTokenDuration(localStorage.getItem('username'),localStorage.getItem('expiresDateTimeISOExtend'),localStorage.getItem('refreshToken'))
                    //ne ovde startLogoutTimeoutTokenInvalid(expMils-iatMils) jer extendTokenDuration ima async fetch pa ce se zapravo timer postaviti pre lastUsedReqMils
                    

                    //window.addEventListener('storage',handleStorageEvent(token,userId,role,firstLoginReqDateTimeMils,expMils,iatMils,refreshToken,username,lastUsedReqMils,expiresDateTimeISO,terms,company))
                }else{
                    fromStorageToState();
                                                            //ako nije proslo 1h a ima aktivnosti onda setujemo na razliku ostatka do 1h
                    startLogoutTimeoutTokenInvalid(firstLoginReqDateTimeMilsExtnd-Date.now()); 
                    //startLogoutTimeoutTokenInvalid(expMils-iatMils);//+1000*60*3
                    //window.addEventListener('storage',handleStorageEvent(token,userId,role,firstLoginReqDateTimeMils,expMils,iatMils,refreshToken,username,lastUsedReqMils,expiresDateTimeISO,terms,company))
                }
            }else{//ako nije koristio front poslednjih 1h logoutujemo se automatski(iz timerLogoutTokenInvalid)
                  logout();
                  alert('Inactivity time reached, login again'); 
            }
                
            //bilo
            //authSuccess(token, userId, role, terms, company);           
             
             ///////////////////////////////////////////////////////////////
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