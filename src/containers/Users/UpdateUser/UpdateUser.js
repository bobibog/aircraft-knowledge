import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useHistory, Redirect} from 'react-router-dom';
import classes from './UpdateUser.module.css';
import * as actions from '../../../store/actions/index';
import { result } from 'lodash';
import axios from '../../../axios-azure';
import {match} from 'react-router';
import {AuthContext} from '../../../context/auth-context';
import {UserContext} from '../../../context/user-context';
import { faTheaterMasks } from '@fortawesome/free-solid-svg-icons';
//import { useParams, useHistory } from "react-router-dom";

const selectedUserInitialValue = {name: "", surname: "", email: "", username: "", role: "", company: "", terms: "", emailConfirmed: "", loginProvider: "", ethereumAccountAddress: ""}


const  UpdateUser = (props) => {          
    
    //const dispatch = useDispatch();
    const history = useHistory();

    const authContext = useContext(AuthContext);
    let isAuthenticated = authContext.user.token;

    const [selectedUser, setSelectedUser] = useState(selectedUserInitialValue);
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    //const selectedUserId = props.id;
    //const idUser = props.match.params.id; 
    const selectedUserId = props.match.params.id;    
    
    const config ={
        headers: {'Authorization': `Bearer ${isAuthenticated}`}
    }

    useEffect(() => {
        setLoading(true);
        axios.get(`/account/${selectedUserId}`, config)
            .then(response => {
                setSelectedUser(response.data);
                setLoading(false); 
            })
            .catch(error => {
                setLoading(false);
                //console.log('Greska je: ' + error);                
            });
    }, [selectedUserId]);

    const onUpdate = () => {
        setUpdateLoading(true);
        const updateUserDto = {
            username: selectedUser.username, 
            role: selectedUser.role,
            company: selectedUser.company
        };
        const url = '/Account/UpdateRoleCompany'
        axios.put(url, updateUserDto, config)
            .then(response => {
                setUpdateLoading(false)
                //back to user page if update successfull:
                history.push('/user');
                //location.href is BAD idea because it makes HTTP call to the server!!!
                //window.location.href="/user"; 
            })
            .catch(error => {
                setLoading(false);
                alert(error.message);  
                //console.log('Greska je: ' + error);                
            });
    }
        
            
    // const userPassword = useSelector(state => {
    //     return state.user.password;
    // });
    // console.log("pasword="+userPassword);
    // const userId = useSelector(state => {
    //     return state.user.id;
    // });
    // const userUsername = useSelector(state => {
    //     return state.user.username;
    // });
    // const userName = useSelector(state => {
    //     return state.user.name;
    // });
    // const userRole = useSelector(state => {
    //     return state.user.role;
    // });
    // const userEmail = useSelector(state => {
    //     return state.user.email;
    // });    
    // const userSurname = useSelector(state => {
    //     return state.user.surname;
    // });
    // const userCompany = useSelector(state => {
    //     return state.user.company;
    // });
    // const userTerms = useSelector(state => {
    //     return state.user.terms;
    // });
    // const userEmailConfirmed = useSelector(state => {
    //     return state.user.emailConfirmed;
    // });
    // const userLoginProvider = useSelector(state => {
    //     return state.user.loginProvider;
    // });
    // const userEthereumAccountAddress = useSelector(state => {
    //     return state.user.ethereumAccountAddress;
    // });      

    

    // const[id, setId]= useState(idUser);  
    // const[password, setPassword]=useState(userPassword);
    // const[username, setUsername]=useState(userUsername);
    // const[role, setRole]=useState(userRole);
    // const[email, setEmail]=useState(userCompany);
    // const[uName, setName]=useState(userName);
    // const[surname, setSurname]=useState(userSurname);
    // const[company, setCompany]=useState(userEmail);
    // const[terms, setTerms]=useState(userTerms);   

    
    // useEffect(()=>{
    //     setPassword(userPassword);
    //     setUsername(userUsername);
    //     setName(userName);
    //     setSurname(userSurname);
    //     setEmail(userCompany);
    //     setRole(userRole);
    //     setCompany(userEmail);
    //     setTerms(userTerms);
    // },[userPassword, userUsername, userName, userSurname, userCompany, userRole, userEmail, userTerms]);
    

    // const onUpdate = useCallback(
    //     () => dispatch(actions.updateUser(id, password, username, role, email, uName, surname, company, terms, isAuthenticated))
    //     , [dispatch, id, password, username, role, email, uName, surname, company, terms, isAuthenticated]
    // );    
    
    const onCancel = () => {
        //back to user page if we want to cancel update:
        history.push('/user');
    }
    
    const onReset = () => {
        //Ima smisla jedino resetovati Company na prazan string posto rola nije validna kao prazan string!
        //Ostala polja nema smisla resetovati jer se ona i ne mogu editovati jer bekend endpoint edituje samo rolu i kompaniju!
        //Zbog svega toga najbolje da ukinemo dugme Clear jer prakticno nema smisla ovde.
        setSelectedUser({...selectedUser, company: ""});
        // setSelectedUser(selectedUserInitialValue);
        
        // setPassword('');
        // setUsername('');
        // setRole('');
        // setEmail('');
        // setName('');
        // setSurname('');
        // setCompany('');
        // setTerms(''); 

    }

    // const onSubmit =()=>{
    //     onUpdate();
    //     onReset();        
    // };
        
  return (
    <>
                <h2><u>UPDATE - {selectedUser.username}</u></h2>  
                <div className={classes.container}>         
                    <form className={classes.form} >                        
                        <div className={classes.fieldContainer}> 
                            <label htmlFor="name">Name</label>                       
                            <input className={classes.input} name="name" value={selectedUser.name} placeholder='Name' disabled />
                        </div>
                        <div className={classes.fieldContainer}> 
                            <label htmlFor="surname">Surname</label>                       
                            <input className={classes.input} name="surname" value={selectedUser.surname} placeholder='Surname' disabled />
                        </div>                        
                        <div className={classes.fieldContainer}>                        
                            <label htmlFor="email">Email</label>
                            <input className={classes.input} name="email" value={selectedUser.email} placeholder='Email' disabled />
                        </div>
                        <div className={classes.fieldContainer}>                        
                            <label htmlFor="company">Company</label>                        
                            <input className={classes.input} name="company" value={selectedUser.company} onChange={(e)=>setSelectedUser({...selectedUser, company: e.target.value})}  placeholder='Company' />
                        </div>
                        <div className={classes.fieldContainer}> 
                            <label htmlFor="username">Username</label>                        
                            <input className={classes.input} name="username" value={selectedUser.username} placeholder='Username' disabled />
                        </div>
                        {/* <div >                        
                            <input className={classes.input} name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Password'/>
                        </div> */}
                        <div className={classes.fieldContainer}>
                            <label htmlFor="role">Role</label>                         
                            <input className={classes.input} name='role' value={selectedUser.role} onChange={(e)=>setSelectedUser({...selectedUser, role: e.target.value})}  placeholder='Role'/>
                        </div>
                        <div className={classes.fieldContainer}>                        
                            <input className={classes.input} name="terms" value={selectedUser.terms} placeholder='Terms' disabled />
                        </div>
                        <div className={classes.fieldContainer}>
                            <label htmlFor="emailConfirmed">Email confirmed</label>                         
                            <input className={classes.input} name="emailConfirmed" value={selectedUser.emailConfirmed} placeholder='Email confirmed' disabled />
                        </div>
                        <div className={classes.fieldContainer}>  
                            <label htmlFor="loginProvider">Login provider</label>                      
                            <input className={classes.input} name="loginProvider" value={selectedUser.loginProvider} placeholder='Login provider' disabled />
                        </div>
                        <div className={classes.fieldContainer}>
                            <label htmlFor="ethereumAccountAddress">Ethereum account address</label>                        
                            <input className={classes.input} name="ethereumAccountAddress" value={selectedUser.ethereumAccountAddress} placeholder='Ethereum Account' disabled />
                        </div>
                        
                    </form>
                    <div className={classes.btnContainer}>
                        <div className={classes.button}>
                            <button  type="submit" className="btn btn-primary" onClick={onUpdate} >UPDATE</button>
                        </div>
                        {/* <div className={classes.button}>
                            <button  type="submit" className="btn btn-warning" onClick={onReset}>CLEAR</button>
                        </div> */}
                        <div className={classes.button}>
                            <button  type="submit" className="btn btn-warning" onClick={onCancel}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </>
  );
};

export default UpdateUser;