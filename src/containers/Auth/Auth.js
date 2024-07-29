import React, { useState, useContext, useCallback, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
//import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import {AuthContext} from '../../context/auth-context';
import Modal from '../../components/UI/Modal/Modal';
import TermsOfUse from '../../components/TermsOfUse/TermsOfUse';
import Greetings from '../../components/Greetings/Greetings';
import * as actions from '../../store/actions/index';


const Auth = props => {

    //console.log("AUTH");

    //EYE
    const[eyeStatus, setEyeStatus]=useState('password');   

    const [authForm, setAuthForm] = useState({
        username: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Username'
            },
            value: '',
            validation: {
                required: true,
                isUsername: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    
    const[terms, setTerms] = useState(false);
    
    const[accept, setAccept] = useState(0);
    
    const authContext = useContext(AuthContext);//
    let isAuthenticated = authContext.user.token !== null;//
    
    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( authForm, {
            [controlName]: updateObject( authForm[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, authForm[controlName].validation ),
                touched: true
            } )
        } );
        setAuthForm(updatedControls);        
        // this.setState( { controls: updatedControls } );
    }

    useEffect(()=>{
        authContext.authSetShouldLogout(false)//
    },[])


    // const submitHandler = ( event ) => {
    //     event.preventDefault();
    //     authContext.authenticate( authForm.username.value, authForm.password.value, isRegistration );
    // }

    // const switchAuthModeHandler = () => {
    //     setIsRegistration(!isRegistration);
    // }    
    
    
    //Checking Terms of Use
    const termsHandler = (e)=>{        
            setTerms(true);                           
    };
    
    
    
    var isTermed = authContext.user.terms;   
    
    var isRole = authContext.user.role;

    var isParser = authContext.user.role;

    const submitHandler = (e) => {
        e.preventDefault();          
                        //! login
        authContext.authenticate( authForm.username.value, authForm.password.value);                
    };      
    
    const formElementsArray = [];
    for ( let key in authForm ) {
        formElementsArray.push( {
            id: key,
            config: authForm[key]
        } );
    }

    const onEye=(e)=>{
        setEyeStatus('text');
    };

    let form = formElementsArray.map( formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={( event ) => inputChangedHandler( event, formElement.id )} /> 
    ) );

    if ( authContext.loading ) {
        form = <Spinner />
    }

    

    let errorMessage = null;

    if ( authContext.error ) {
        let errorMessageText = null;
        if (authContext.error.response) {
            errorMessageText = authContext.error.response.data.message 
                ? authContext.error.response.data.message 
                : authContext.error.message;
        } else {
            errorMessage = authContext.error.message;
        }
        
        errorMessage = (
            <p style={{color: 'red'}}>
                {errorMessageText}
            </p>
        );
    }

    let authRedirect = null;


    if ( isAuthenticated ) {
        //ulazi
        console.log("e1")               //vrednost od authRedirectPath je bila undefined
        authRedirect = <Redirect to={authContext.authRedirectPath} />//redirect na "/"
    }

    //gde poslednje udje tu vrednost ce imati authRedirect
    if(isAuthenticated && isTermed!=1){
        //ulazi na kraju
        console.log("e2")
        //return (<div>bla</div>);
        authRedirect = <Redirect to="/auth2"/>
    }                                         
    if(isRole=='Admin')
    {
        authRedirect = <Redirect to="/administrator"/>
    }
    if(isRole=='Parser' && isAuthenticated)
    {
        authRedirect = <Redirect to="/parser"/>
    }
    if(isAuthenticated && isTermed== 1 && isRole!='Admin' && isRole != 'Parser' )
    {   
        authRedirect = <Redirect to="/akrx"/>
    }
    

    return (
        <div className={classes.Auth}>
            <Modal show={terms}>
                <TermsOfUse clickedTerms={termsHandler}/>
            </Modal> 


            {authRedirect}{/*postoji samo ako je isAuthenticated==true ili Admin i ovaj redirect prekida render ispod za login*/}
            {errorMessage}

        
            <form onSubmit={submitHandler}>{/*--*/}
                {form}
                <Button btnType="Success" >LOG IN</Button>
            </form>
            
            
            {/* <Button
                // clicked={switchAuthModeHandler}
                // btnType="Danger">SWITCH TO {isRegistration ? 'SIGN IN' : 'REGISTER'}
                btnType="Danger">SIGN IN
            </Button> */}
        </div>
    );
}

export default Auth;