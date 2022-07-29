import React, { useState, useContext, useCallback } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../../shared/utility';
import {AuthContext} from '../../../context/auth-context';
import { CallMissedSharp } from '@material-ui/icons';
import { mergeClasses } from '@material-ui/styles';
import classes from './AddUser.module.css';
import { Link } from 'react-router-dom';
import { set } from 'lodash';

const AddUser = props => {
    
        const dispatch = useDispatch();    
        const[password, setPassword]=useState('');
        const[username, setUsername]=useState('');
        const[role, setRole]=useState('User');
        const[email, setEmail]=useState('');
        const[uName, setUName]=useState('');
        const[surname, setSurname]=useState('');
        const[company, setCompany]=useState('');
        const[terms, setTerms]=useState(0);
        
        const authContext = useContext(AuthContext);
        let isAuthenticated = authContext.user.token;

        // console.log("TOLKEN="+isAuthenticated);

        const onRegister = useCallback(
            () => dispatch(actions.registerUser(password,username, role, email, uName, surname, company, terms, isAuthenticated))
            , [dispatch, password,username, role, email, uName, surname, company, terms, isAuthenticated]
        );

        const onReset =()=>{
            setPassword('');
            setUsername('');
            setRole('');
            setEmail('');
            setUName('');
            setSurname('');
            setCompany('');
            setTerms('');
        }

        const onSubmit =()=>{
            onRegister();
            onReset();
        };

        return (
            <>
                <h2><u>REGISTER NEW USER</u></h2>  
                <div className={classes.container}>         
                    <form className={classes.form} >
                        <div >                        
                            <input className={classes.input} value={uName} onChange={(e)=>setUName(e.target.value)} placeholder='Name'/>
                        </div>
                        <div >                        
                            <input className={classes.input} value={surname} onChange={(e)=>setSurname(e.target.value)} placeholder='Surname'/>
                        </div>
                        <div >                        
                            <input className={classes.input} value={company} onChange={(e)=>setCompany(e.target.value)} placeholder='Company' />
                        </div>
                        <div >                        
                            <input className={classes.input} value={email} type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email' />
                        </div>
                        <div >                        
                            <input className={classes.input} value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
                        </div>
                        <div >                        
                            <input className={classes.input} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
                        </div>
                        <div >                        
                            <input className={classes.input} value={role} onChange={(e)=>setRole(e.target.value)} placeholder='Role'/>
                        </div>
                        <div >                        
                            <input className={classes.input} value={terms} onChange={(e)=>setTerms(e.target.value)} placeholder='Terms'/>
                        </div>
                        
                    </form>
                    <div className={classes.btnContainer}>
                        <div className={classes.button}>
                            <button  className type="submit"  onClick={onSubmit}>REGISTER</button>
                        </div>
                        <div className={classes.button}>
                            <button  type="submit" className="btn btn-warning" onClick={onReset}>CLEAR</button>
                        </div>
                    </div>
                </div>
            </>
           
        )
    
}
    
export default AddUser;