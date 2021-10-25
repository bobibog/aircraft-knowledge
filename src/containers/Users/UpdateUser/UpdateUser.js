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


const  UpdateUser = (props) => {          
    
    const dispatch = useDispatch();

    const authContext = useContext(AuthContext);
    let isAuthenticated = authContext.user.token;
        
            
    const userPassword = useSelector(state => {
        return state.user.password;
    });
    console.log("pasword="+userPassword);
    const userUsername = useSelector(state => {
        return state.user.username;
    });
    const userName = useSelector(state => {
        return state.user.name;
    });
    const userRole = useSelector(state => {
        return state.user.role;
    });
    const userEmail = useSelector(state => {
        return state.user.email;
    });    
    const userSurname = useSelector(state => {
        return state.user.surname;
    });
    const userCompany = useSelector(state => {
        return state.user.company;
    });
    const userTerms = useSelector(state => {
        return state.user.terms;
    });      

    const idUser = props.match.params.id;    

    const[id, setId]= useState(idUser);  
    const[password, setPassword]=useState(userPassword);
    const[username, setUsername]=useState(userUsername);
    const[role, setRole]=useState(userRole);
    const[email, setEmail]=useState(userCompany);
    const[uName, setName]=useState(userName);
    const[surname, setSurname]=useState(userSurname);
    const[company, setCompany]=useState(userEmail);
    const[terms, setTerms]=useState(userTerms);   

    
    useEffect(()=>{
        setPassword(userPassword);
        setUsername(userUsername);
        setName(userName);
        setSurname(userSurname);
        setEmail(userCompany);
        setRole(userRole);
        setCompany(userEmail);
        setTerms(userTerms);
    },[userPassword, userUsername, userName, userSurname, userCompany, userRole, userEmail, userTerms]);
    

    const onUpdate = useCallback(
        () => dispatch(actions.updateUser(id, password, username, role, email, uName, surname, company, terms, isAuthenticated))
        , [dispatch, id, password, username, role, email, uName, surname, company, terms, isAuthenticated]
    );    
    
    const onReset =()=>{
        setPassword('');
        setUsername('');
        setRole('');
        setEmail('');
        setName('');
        setSurname('');
        setCompany('');
        setTerms(''); 

    }

    const onSubmit =()=>{
        onUpdate();
        onReset();        
    };
        
  return (
    <>
                <h2><u>UPDATE - {userName}</u></h2>  
                <div className={classes.container}>         
                    <form className={classes.form} >                        
                        <div >                        
                            <input className={classes.input} name="name" value={uName} onChange={(e)=>setName(e.target.value)}  placeholder='Name'/>
                        </div>
                        <div >                        
                            <input className={classes.input} name="surname" value={surname} onChange={(e)=>setSurname(e.target.value)}  placeholder='Surname'/>
                        </div>                        
                        <div >                        
                            <input className={classes.input} name="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Email' />
                        </div>
                        <div >                        
                            <input className={classes.input} name="company" value={company} onChange={(e)=>setCompany(e.target.value)}  placeholder='Company' />
                        </div>
                        <div >                        
                            <input className={classes.input} name="username" value={username} onChange={(e)=>setUsername(e.target.value)}  placeholder='Username' />
                        </div>
                        <div >                        
                            <input className={classes.input} name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Password'/>
                        </div>
                        <div >                        
                            <input className={classes.input} name='role' value={role} onChange={(e)=>setRole(e.target.value)}  placeholder='Role'/>
                        </div>
                        <div >                        
                            <input className={classes.input} name="terms" value={terms} onChange={(e)=>setTerms(e.target.value)}  placeholder='Terms'/>
                        </div>
                        
                    </form>
                    <div className={classes.btnContainer}>
                        <div className={classes.button}>
                            <button  className type="submit" className="btn btn-primary" onClick={onSubmit} >UPDATE</button>
                        </div>
                        <div className={classes.button}>
                            <button  type="submit" className="btn btn-warning" onClick={onReset}>CLEAR</button>
                        </div>
                    </div>
                </div>
            </>
  );
};

export default UpdateUser;