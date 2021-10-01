import React, { useState, useContext } from 'react';
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


const AddUser = props => {
    // state = {
    //     controls: {
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
            },
            role: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Role'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            }
        });
        const [isRegistration, setIsRegistration] = useState(true);
    
        const authContext = useContext(AuthContext);
        let isAuthenticated = authContext.user.token !== null;
    
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
    
        const submitHandler = ( event ) => {
            event.preventDefault();
            authContext.authenticate( authForm.username.value, authForm.password.value, authForm.role.value, isRegistration );
        }
    
        const switchAuthModeHandler = () => {
            setIsRegistration(!isRegistration);
        }
    
        // const submitHandler = ( event ) => {
        //     event.preventDefault();
        //     authContext.authenticate( authForm.username.value, authForm.password.value);
        // }
    
        
    
        const formElementsArray = [];
        for ( let key in authForm ) {
            formElementsArray.push( {
                id: key,
                config: authForm[key]
            } );
        }
    
        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )}
            />
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
    
        // let authRedirect = null;
        // if ( isAuthenticated ) {
        //     authRedirect = <Redirect to={authContext.authRedirectPath} />
        // }
    
        return (
            <div className={classes.form}>
                {/* {authRedirect} */}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                
            </div>
        );
    }
    
    export default AddUser;