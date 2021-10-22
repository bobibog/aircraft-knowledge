import React, { useContext, useState, useEffect, useCallback } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useHistory, Redirect} from 'react-router-dom';
import classes from './UpdateUser.module.css';
import * as actions from '../../../store/actions/index';
import { result } from 'lodash';
import axios from '../../../axios-azure';
import {match} from 'react-router';
import {AuthContext} from '../../../context/auth-context';
import {UserContext} from '../../../context/user-context';


const  UpdateUser = (props) => {  

        
    
    const dispatch = useDispatch();

    const authContext = useContext(AuthContext);
    let isAuthenticated = authContext.user.token;
    //console.log("TOKEN="+isAuthenticated);
    
    // const {customer} = useContext(UserContext);   

    
    //   const history = useHistory();
    const idUser = props.match.params.id;
    
    // let [selectedCustomer, setSelectedCustomer] = useState({
    //     id: '',
    //     name: '',
    //     surname: '',
    //     email: '',
    //     password: '',
    //     username: '',
    //     company: '',
    //     role: '',
    //     terms: ''
    //   });    
    
    //   useEffect(()=>{
    //     const customerId = idUser;
        
    //     const selectedCustomer = Object.values(customer).filter(customer => customer.id === customerId);
        
    //     setSelectedCustomer(selectedCustomer);
      
    //   }, [idUser, customer])

     
    
    //   const onSubmit = () =>{
    //     updateCustomer(selectedCustomer);
    //     history.push('/crudcustomer');
    //   };
    
    //   const onChange = (e) => {
    //     setSelectedCustomer({...selectedCustomer, [e.target.name]: e.target.value, 
    //                                               [e.target.surname]: e.target.value,
    //                                               [e.target.email]: e.target.value,
    //                                               [e.target.password]: e.target.value,
    //                                               [e.target.username]: e.target.value,
    //                                               [e.target.role]: e.target.value,
    //                                               [e.target.company]: e.target.value,
    //                                               [e.target.terms]: e.target.value
    //                                             })
    //   };


    
    
    const userPassword = useSelector(state => {
        return state.user.password;
    });
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

    

    const[id, setId]= useState(idUser);  
    const[password, setPassword]=useState('');
    const[username, setUsername]=useState('');
    const[role, setRole]=useState('');
    const[email, setEmail]=useState('');
    const[uName, setName]=useState('');
    const[surname, setSurname]=useState('');
    const[company, setCompany]=useState('');
    const[terms, setTerms]=useState('');

    let route = null;
            
    // const onGetUser = useCallback(
    //     () => dispatch(actions.getUser(idUser))
    //     , [dispatch, idUser]
    // );  
    
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

    // useEffect(()=>{
    //     onGetUser();
        
    // },[onGetUser]);

    useEffect(()=>{
        setPassword(userPassword);
        setUsername(userUsername);
        setName(userName);
        setSurname(userSurname);
        setEmail(userCompany);
        setRole(userRole);
        setCompany(userEmail);
        setTerms(userTerms);
    },[setPassword, setUsername, setName,setSurname, setEmail, setRole, setCompany, setTerms]);
    

    const onUpdate = useCallback(
        () => dispatch(actions.updateUser(id, password, username, role, email, uName, surname, company, terms, isAuthenticated))
        , [dispatch, id, password, username, role, email, uName, surname, company, terms, isAuthenticated]
    );    
    

    const onSubmit =()=>{
        onUpdate();
        onReset();
        route =<Redirect to="/user" />
    };
        
  return (
    <>
                <h2><u>UPDATE - {userName}</u></h2>  
                <div className={classes.container}>         
                    <form className={classes.form} >
                        <div >                        
                            <input className={classes.input} value={id}   placeholder='Name'/>
                        </div>
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