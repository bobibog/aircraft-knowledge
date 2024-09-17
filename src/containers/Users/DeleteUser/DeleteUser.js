import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
//import {useSelector, useDispatch} from 'react-redux';
import {Link, useHistory, Redirect} from 'react-router-dom';
import classes from './DeleteUser.module.css';
//import * as actions from '../../../store/actions/index';
//import { result } from 'lodash';
import axios from '../../../axios-azure';
//import {match} from 'react-router';
import {AuthContext} from '../../../context/auth-context';
//import {UserContext} from '../../../context/user-context';
//import { faTheaterMasks } from '@fortawesome/free-solid-svg-icons';
//import { useParams, useHistory } from "react-router-dom";

const selectedUserInitialValue = {name: "", surname: "", email: "", username: "", role: "", company: "", terms: "", emailConfirmed: "", loginProvider: "", ethereumAccountAddress: ""}


const  DeleteUser = (props) => {          
    
    //const dispatch = useDispatch();
    const history = useHistory();

    const authContext = useContext(AuthContext);
    let isAuthenticated = authContext.user.token;

    const [selectedUser, setSelectedUser] = useState(selectedUserInitialValue);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

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

    const onDelete = () => {
        setDeleteLoading(true);
        const url = `/Account/Delete/${selectedUserId}`
        axios.delete(url, config)
            .then(response => {
                setDeleteLoading(false)
                //back to user page if update successfull:
                history.push('/user');
                //location.href is BAD idea because it makes HTTP call to the server!!!
                //window.location.href="/user"; 
            })
            .catch(error => {
                setDeleteLoading(false);
                alert(error.message);  
                //console.log('Greska je: ' + error);                
            });
    }
    
    const onCancel = () => {
        //back to user page if we want to cancel update:
        history.push('/user');
    }
    
    //We do not use this reset:
    const onReset = () => {
        //Ima smisla jedino resetovati Company na prazan string posto rola nije validna kao prazan string!
        //Ostala polja nema smisla resetovati jer se ona i ne mogu editovati jer bekend endpoint edituje samo rolu i kompaniju!
        //Zbog svega toga najbolje da ukinemo dugme Clear jer prakticno nema smisla ovde.
        setSelectedUser({...selectedUser, company: ""});
        // setSelectedUser(selectedUserInitialValue);      
    }
        
  return (
    <>
                <h2><u>DELETE - {selectedUser.username}</u></h2>  
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
                            <input className={classes.input} name="company" value={selectedUser.company} disabled />
                        </div>
                        <div className={classes.fieldContainer}> 
                            <label htmlFor="username">Username</label>                        
                            <input className={classes.input} name="username" value={selectedUser.username} disabled />
                        </div>
                        {/* <div >                        
                            <input className={classes.input} name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Password'/>
                        </div> */}
                        <div className={classes.fieldContainer}>
                            <label htmlFor="role">Role</label>                         
                            <input className={classes.input} name='role' value={selectedUser.role} disabled />
                        </div>
                        <div className={classes.fieldContainer}>                        
                            <input className={classes.input} name="terms" value={selectedUser.terms} disabled />
                        </div>
                        <div className={classes.fieldContainer}>
                            <label htmlFor="emailConfirmed">Email confirmed</label>                         
                            <input className={classes.input} name="emailConfirmed" value={selectedUser.emailConfirmed} disabled />
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
                            <button  type="submit" className="btn btn-danger" onClick={onDelete} >DELETE</button>
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

export default DeleteUser;