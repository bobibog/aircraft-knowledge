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

const selectedUserInitialValue = {name: "", surname: "", email: "", userName: "", role: "", company: "", terms: "", emailConfirmed: "", loginProvider: "", ethereumAccountAddress: ""}


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
            userName: selectedUser.userName, 
            role: selectedUser.role,
            company: selectedUser.company,
            emailConfirmed: selectedUser.emailConfirmed
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
                setUpdateLoading(false);
                alert(error.message);  
                //console.log('Greska je: ' + error);                
            });
    }
    
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
    }
        
  return (
    <>
                <h2><u>UPDATE - {selectedUser.userName}</u></h2>  
                <div className={classes.container}>         
                    <form className={classes.form} >                        
                        <div className={classes.fieldContainer}> 
                            <label htmlFor="name">Name</label>                       
                            <input className={classes.input} name="name" value={selectedUser.name} disabled />
                        </div>
                        <div className={classes.fieldContainer}> 
                            <label htmlFor="surname">Surname</label>                       
                            <input className={classes.input} name="surname" value={selectedUser.surname} disabled />
                        </div>                        
                        <div className={classes.fieldContainer}>                        
                            <label htmlFor="email">Email</label>
                            <input className={classes.input} name="email" value={selectedUser.email} disabled />
                        </div>
                        <div className={classes.fieldContainer}>                        
                            <label htmlFor="company">Company</label>                        
                            <input className={classes.input} name="company" value={selectedUser.company} onChange={(e)=>setSelectedUser({...selectedUser, company: e.target.value})} />
                        </div>
                        <div className={classes.fieldContainer}> 
                            <label htmlFor="userName">Username</label>                        
                            <input className={classes.input} name="userName" value={selectedUser.userName} disabled />
                        </div>
                        {/* <div >                        
                            <input className={classes.input} name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Password'/>
                        </div> */}
                        <div className={classes.fieldContainer}>
                            <label htmlFor="role">Role</label>                         
                            <input className={classes.input} name='role' value={selectedUser.role} onChange={(e)=>setSelectedUser({...selectedUser, role: e.target.value})} />
                        </div>
                        <div className={classes.fieldContainer}>   
                            <label htmlFor="terms">Terms</label>                      
                            <input className={classes.input} name="terms" value={selectedUser.terms} disabled />
                        </div>
                        <div className={classes.fieldContainer}>
                            <label htmlFor="emailConfirmed">Email confirmed</label>                         
                            <input className={classes.input} name="emailConfirmed" value={selectedUser.emailConfirmed} onChange={(e)=>setSelectedUser({...selectedUser, emailConfirmed: e.target.value})} />
                        </div>
                        {/* <div className={classes.fieldContainer}>  
                            <label htmlFor="loginProvider">Login provider</label>                      
                            <input className={classes.input} name="loginProvider" value={selectedUser.loginProvider} disabled />
                        </div> */}
                        <div className={classes.fieldContainer}>
                            <label htmlFor="ethereumAccountAddress">Ethereum account address</label>                        
                            <input className={classes.input} name="ethereumAccountAddress" value={selectedUser.ethereumAccountAddress} disabled />
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
                            <button  type="submit" className="btn btn-primary" onClick={onCancel}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </>
  );
};

export default UpdateUser;