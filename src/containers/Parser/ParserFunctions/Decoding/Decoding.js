import React, { useState, useContext, useCallback, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../../../shared/utility';
import {AuthContext} from '../../../../context/auth-context';
import { CallMissedSharp } from '@material-ui/icons';
import { mergeClasses } from '@material-ui/styles';
import classes from './Decoding.module.css';
import { Link } from 'react-router-dom';
import { set } from 'lodash';
import ReactTooltip from "react-tooltip";

const Decoding = props => {
    
        const dispatch = useDispatch();    
        const[label, setLabel]=useState('');
        const[text, setText]=useState('');
        
        const decodedMessage = useSelector(state => {
            return state.acarsDecoder.decodingModel;
        });  

        const[messageToPresent, setMessageToPresent] = useState(decodedMessage);
        
        console.log("Dekodirana poruka:"+decodedMessage);
               
        
        const authContext = useContext(AuthContext);
        let isAuthenticated = authContext.user.token;
        
       
        // console.log("TOLKEN="+isAuthenticated);

        const onDecoding = useCallback(
            () => dispatch(actions.decodingAkrx(label, text, isAuthenticated))
            , [dispatch, label, text, isAuthenticated]
        );

        const onReset =()=>{
            setLabel('');
            setText('');    
            setMessageToPresent(null);
        }

        const onSubmit =()=>{
            onDecoding();
            //onReset();
            setMessageToPresent(decodedMessage);
        };

        // useEffect(()=>{
        //     onSubmit();
        //     }, [onSubmit]);

        return (
            <>
                <h2><u>ACARS MESSAGE DECODER</u></h2>  
                <div className={classes.container}>         
                    <form className={classes.form} >
                        <div >                        
                            <input className={classes.input} value={label} onChange={(e)=>setLabel(e.target.value)} placeholder='Insert Label'/>
                        </div>
                        <div >                        
                            <textarea className={classes.input1} value={text} onChange={(e)=>setText(e.target.value)} placeholder='Insert Text'/>
                        </div>
                       
                        
                    </form>
                    <div className={classes.btnContainer}>
                        <div className={classes.button}>
                            <button   data-tip data-for="registerTip" type="submit"  onClick={onSubmit}>DECODE</button>
                            <ReactTooltip id="registerTip" place="top" effect="solid">
                                Double click Please
                            </ReactTooltip>
                        </div>
                        <div className={classes.button}>
                            <button  type="submit" className="btn btn-warning" onClick={onReset}>CLEAR</button>
                           
                        </div>
                    </div>
                    <div className="form-group">
                        <label className={classes.resultLabel}>DECODING RESULTS: </label>
                        <textarea className={classes.formControl} id="exampleFormControlTextarea3" rows="12" value = {messageToPresent != null ? 'Decoded message: '+messageToPresent : ''} />              
                        
                    </div>
                </div>
            </>
           
        )
    
}
    
export default Decoding;