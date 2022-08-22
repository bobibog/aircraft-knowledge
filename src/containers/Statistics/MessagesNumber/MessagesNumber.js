import React, { useState, useContext, useCallback, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './MessagesNumber.module.css';
import ReactTooltip from "react-tooltip";
import Input from '../../../components/UI/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from '../../../components/UI/Spinner/Spinner';

const MessagesNumber = () =>{
    
    const dispatch = useDispatch();    
    const[timeMin, settimeMin] = useState('');
    const[timeMax, settimeMax] = useState('');
    const[stationId, setStationId] = useState('');
    const[dateFromErr, setDateFromErr] = useState({});
    const[dateToErr, setDateToErr] = useState({});

    const messagesNumber = useSelector(state => {
        return state.statistics.messagesNumber;
    });

    const[messagesNumberResult, setMessagesNumberResult] = useState(messagesNumber);

   
    if(messagesNumberResult != null){
        console.log("Poruke "+messagesNumberResult);
    }
    
    const loading = useSelector(state => {
        return state.statistics.statisticsLoading;
    });

    // if(messagesNumber != null){
    //     console.log("Messages:"+messagesNumber);
    // }

    const onReset =()=>{
        settimeMin('');
        settimeMax('');
        setStationId('');
        setMessagesNumberResult('');
    }

    const onSubmit=()=>{
        onStatisticsMessagesNumber();
        setMessagesNumberResult(messagesNumber);        
    }    

    useEffect(() => {
        setMessagesNumberResult(messagesNumber);
    }, [messagesNumber])
    

    const onStatisticsMessagesNumber = useCallback(
        () => dispatch(actions.statisticsMessagesNumber(timeMin, timeMax, stationId), [dispatch, timeMin, timeMax, stationId])
    );

    
    
    var hoursMin = timeMin.slice(11, 13);    
    var minutesMin = timeMin.slice(14, 16);   
    var dayMin = timeMin.slice(8, 10);    
    var monthMin = timeMin.slice(5, 7);    
    var yearMin = timeMin.slice(0, 4);

    var hoursMax = timeMax.slice(11, 13);    
    var minutesMax = timeMax.slice(14, 16);   
    var dayMax = timeMax.slice(8, 10);    
    var monthMax = timeMax.slice(5, 7);    
    var yearMax = timeMax.slice(0, 4);
    
    const dateValidation1 = () =>{
        const dateFromErr = {};        
        let isValid1 = true;

        if(yearMin=='' || monthMin=='' || dayMin=='' || hoursMin=='' || minutesMin=='' ){
            dateFromErr.dateFromInvalid = "Please enter complete date &   time or use DatePicker ↑";
            isValid1 = false;
        } 

        setDateFromErr(dateFromErr);        
        return isValid1;
    }

    const dateValidation2 = () =>{
        
        const dateToErr = {};
        let isValid2 = true;

        if(yearMax=='' || monthMax=='' || dayMax=='' || hoursMax=='' || minutesMax=='' ){
            dateToErr.dateToInvalid = "Please enter complete date &   time or use DatePicker ↑";
            isValid2 = false;
        }         
        setDateToErr(dateToErr);
        return isValid2;
    } 
    
    const onBlur1 =(e)=>{
        e.preventDefault();
        const isValid1 = dateValidation1();
    }
    const onBlur2 =(e)=>{
        e.preventDefault();
        const isValid2 = dateValidation2();
    }  

    const timeMinInputConfig = {
        type:'datetime-local',
        placeholder:'From:'
    }
    const timeMaxInputConfig = {
        type:'datetime-local',
        placeholder:'To:'
    }  

    let result = <Spinner />

    if(!messagesNumber && !loading){
        result = <p style={{ textAlign: 'center', color:'red', marginTop:'15px' }}>Please insert search parameters to start search</p>;
    }
    if(messagesNumber && !loading){
        result = <textarea value={messagesNumber != null ? messagesNumberResult : ''} rows ={7} className={classes.resultBox} />
    }
    
    return (
        <>
            <h2><u>STATISTICS</u></h2>  
            <h5>Number of different messages per receiver</h5>
            <div className={classes.container}>         
                <form className={classes.form} >
                    <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">
                                    {/* <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span2}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>  */}
                                    <label className={classes.label}>From date and time</label>              
                                    <Input 
                                        value={timeMin}
                                        // changed={(e)=>settimeMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>(settimeMin(e.target.value))}                                        
                                        elementType='input' 
                                        elementConfig= {timeMinInputConfig} 
                                        toggle="tooltip"
                                        placement="right"
                                        title="FROM DATE & TIME"
                                        onBlur={onBlur1}                                              
                                    />
                                    {Object.keys(dateFromErr).map((key)=>{
                                        return <div style={{color:'yellow', fontSize:'small', fontWeight:'bold', paddingLeft:'15px', paddingRight: '7px', width:'220px', wordWrap:'break-word', textAlign:'right'}}>{dateFromErr[key]}</div>
                                    })}
                                </InputGroup>
                                </div>
                    <div >                        
                    <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">
                                    {/* <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span2}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> */}
                                    <label className={classes.label}>To date and time</label>                   
                                    <Input 
                                        value={timeMax}
                                        // changed={(e)=>settimeMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>settimeMax(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {timeMaxInputConfig}
                                        toggle="tooltip"
                                        placement="right"
                                        title="TO DATE & TIME"
                                        onBlur={onBlur2}                                              
                                    />
                                    {Object.keys(dateToErr).map((key)=>{
                                        return <div style={{color:'yellow', fontSize:'small', fontWeight:'bold', paddingLeft:'15px', paddingRight: '7px', width:'220px', wordWrap:'break-word', textAlign:'right'}}>{dateToErr[key]}</div>
                                    })}
                                </InputGroup>
                                </div>
                    </div>
                    <div >                        
                        <input className={classes.input} value={stationId} onChange={(e)=>setStationId(e.target.value)} placeholder='Insert Station ID'/>
                    </div>
                    
                </form>
                <div className={classes.btnContainer}>
                    <div className={classes.button}>
                        <button    type="submit" onClick={onSubmit}  >SEARCH</button>
                        {/* <ReactTooltip id="registerTip" place="top" effect="solid">
                            Double click Please
                        </ReactTooltip> */}
                    </div>
                    <div className={classes.button}>
                        <button  type="submit" className="btn btn-warning" onClick={onReset} >RESET</button>
                       
                    </div>
                </div>
                <div className="form-group">
                    <label className={classes.resultLabel}><u>RESULTS: </u></label>
                    <br></br>
                    {/* {result} */}
                    {result}
                    
                                
                    
                </div>
            </div>
        </>
       
    )
}

export default MessagesNumber;


