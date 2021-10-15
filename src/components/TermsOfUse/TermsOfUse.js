import React,{useState, useEffect, useCallback, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import text1 from './TermsText';
import text2 from './PolicyText';
import classes from './TermsOfUse.modal.css';
import Button from '../UI/Button/Button';
import axios from '../../axios-local';
import {AuthContext} from '../../context/auth-context';
import * as actions from '../../store/actions/index';
import { Redirect, useHistory } from 'react-router-dom';

const gotText1 = text1;
const gotText2 = text2;


const TermsOfUse = (props)=> {
    
    const authContext = useContext(AuthContext);
    const dispatch = useDispatch();    

    var id = authContext.user.id;

    const onAcceptTerms = useCallback(
        () => dispatch(actions.acceptTerms(id))
        , [dispatch, id]
    ); 
    
    
    const onAccept=(e)=>{
        props.clickedTerms();
        onAcceptTerms();
        window.location.href="/akrx";
    };

    const declineClick=(e)=>{
        alert('You have to accept our Terms and Conditions & Privacy Policy if you want to visit AKRx website. NOTE: You will be prompted to Log in page');
    };
    
    
    return (
        <>
            <h3>Terms and Conditions & Privacy Policy</h3>
            <p>Please read carefully before use</p>
            <div>
                <textarea defaultValue={gotText1} style={{resize:'horizontal', height:'145px', width:'350px', maxWidth:'450px', minWidth:'150px', backgroundColor:'#f0e7c0'}}/>
                <textarea defaultValue={gotText2} style={{resize:'horizontal', height:'145px', width:'350px', maxWidth:'450px', minWidth:'150px', backgroundColor:'#f0e7c0'}}/>
            </div>
            <div>
                <Button btnType="Success" clicked={onAccept}>ACCEPT</Button>
                <a href="/logout"><Button clicked={declineClick} btnType="Danger">DECLINE</Button></a>
            </div>           
            
        </>
       
    )
}

export default TermsOfUse;
