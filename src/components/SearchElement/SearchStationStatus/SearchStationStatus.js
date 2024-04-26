import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchStationStatus.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from '../../UI/Dropdown/Dropdown';



const  SearchStationStatus = (props) => {
           
    const[start, setStart] = useState('');
    const[end, setEnd] = useState('');
    const[statId, setStatId] = useState('');
    const[msgType, setMsgType] = useState('');
    
    const dispatch = useDispatch();

    // Disable Input
    const [disabled, setDisabled] = useState(false);

    // DATE-TIME input VALIDATION
    const[dateFromErr, setDateFromErr] = useState({});
    const[dateToErr, setDateToErr] = useState({});

    var hoursMin = start.slice(11, 13);    
    var minutesMin = start.slice(14, 16);   
    var dayMin = start.slice(8, 10);    
    var monthMin = start.slice(5, 7);    
    var yearMin = start.slice(0, 4);

    var hoursMax = end.slice(11, 13);    
    var minutesMax = end.slice(14, 16);   
    var dayMax = end.slice(8, 10);    
    var monthMax = end.slice(5, 7);    
    var yearMax = end.slice(0, 4);

    const onBlur1 =(e)=>{
        e.preventDefault();
        const isValid1 = dateValidation1();
    }
    
    const onBlur2 =(e)=>{
        e.preventDefault();
        const isValid2 = dateValidation2();
    }    

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

    const resetSearchHandler = () => {
        
        setStart('');
        setEnd('');
        setStatId('');
        setMsgType('');
        props.clickedReset();
    };   
       
    const acarsMessageDateTimeMinInputConfig = {
        type:'datetime-local',
        placeholder:'From:'
    }
    const acarsMessageDateTimeMaxInputConfig = {
        type:'datetime-local',
        placeholder:'To:'
    }  
    const statIdInputConfig = {
        type:'text',
        placeholder:'Station ID'
    } 
    const msgTypeInputConfig = {
        type:'text',
        placeholder:'Message Type'
    } 
    
    
    // Changing Dropdown Button title according to event (search or reset click)
    const[filter, setFilter] = useState('');
    let title = filter ? 'FILTER ON': 'FILTER OFF';

    //Closing/Opening DropdownButton
    const[showDropdown, setShowDropdown] = useState(false);

    const open=()=>{
        setShowDropdown(true);
    };
    
    const toggleDropdown = () => {        
            setShowDropdown(false);        
    };

    // FUNCTION WHICH LISTEN EVENTS OUTSIDE ELEMENT
    function useOutsideAlerter(ref) {
        useEffect(() => {
          
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                toggleDropdown();
            }
          }
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

      const wrapperRef = useRef(null);
      useOutsideAlerter(wrapperRef);

    const changer=0;
    const onSerach = (e) =>{
        props.clickedSearch(start, end, statId, msgType);
        setFilter('a');
        toggleDropdown();
        //props.allChanger(changer);
        
    };

    const onReset =(e)=>{
        resetSearchHandler();
        setFilter('');
        toggleDropdown();
        dropChanger(changer);
    };
            
    const[dropStatus, setDropStatus]=useState(0);
    function dropChanger(dropStatus){
        if(dropStatus==0){
            setDropStatus(1);
            return dropStatus; 
        }
    };

    return (
        <div className={classes.container} > 
            
            <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} ref={wrapperRef}  onClick={(e)=> dropStatus==1 ? setDropStatus(0) : setDropStatus(1) }>
                <div className={classes.dropdownShow}>
                    <div className="row"> 
                        {/* 1. kolona */}
                        <div className={classes.bar}>          
                        <div className="col-sm-5" id="bar">                        
                            <div className={classes.card} >
                                <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span2}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                                      
                                    <Input 
                                        value={start}
                                        // changed={(e)=>setAcarsMessageDateTimeMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>(setStart(e.target.value))}                                        
                                        elementType='input' 
                                        elementConfig= {acarsMessageDateTimeMinInputConfig} 
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
                                <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span2}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>
                                                       
                                    <Input 
                                        value={end}
                                        // changed={(e)=>setAcarsMessageDateTimeMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setEnd(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {acarsMessageDateTimeMaxInputConfig}
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
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={statId}                                        
                                        changed={(e)=>setStatId(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {statIdInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={msgType}
                                        changed={(e)=>setMsgType(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {msgTypeInputConfig}                                               
                                    />
                                </InputGroup>                                                               
                            </div>
                            <div className={classes.buttonBox}>
                                <ButtonBordered                                    
                                    clicked={onSerach}
                                    btnType="Success"                                                      
                                >SEARCH</ButtonBordered>
                                
                                <ButtonBordered                                    
                                    clicked={onReset}
                                    btnType="Secondary"                                     
                                >RESET</ButtonBordered>
                            </div>
                        </div>
                        </div>
                    </div> 
                </div>          
            </DropdownButton>
        </div> 
    );
}

export default SearchStationStatus;