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
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LabelList, Dot} from 'recharts';
// import  Radar from 'react-svg-radar-chart';
//import {radarLinear} from 'chart.js';
//import {Radar} from 'react-chartjs-2';
// import { Chart, registerables, Tooltip } from 'chart.js';
// Chart.register(...registerables);
// import { IgrLegendModule, IgrDataChartCoreModule, IgrDataChartPolarModule, IgrDataChartPolarCoreModule, IgrDataChartInteractivityModule } from 'igniteui-react-charts';
// import { IgrLegend, IgrDataChart, IgrNumericAngleAxis, IgrNumericRadiusAxis, IgrPolarAreaSeries } from 'igniteui-react-charts';
import Plotly from 'plotly.js-dist-min'


const MessagesNumber = (props) =>{
    
    const dispatch = useDispatch();    
    const[timeMin, settimeMin] = useState('');
    const[timeMax, settimeMax] = useState('');
    const[stationId, setStationId] = useState('');
    const[dateFromErr, setDateFromErr] = useState({});
    const[dateToErr, setDateToErr] = useState({});

    const[timeMin1, settimeMin1] = useState('');
    const[timeMax1, settimeMax1] = useState('');
    const[stationId1, setStationId1] = useState('');
    const[angle, setAngle] = useState('');

    const[angles, setAngles] = useState([]);
    const[distances, setDistances] = useState([]);
    const[newArray, setNewArray] = useState([]);   
     

    const messagesNumber = useSelector(state => {
        return state.statistics.messagesNumber;
    });

    const directionalRangesStorages = useSelector(state => {
        return state.directionalRanges.directionalRangesStorages;
    });

    const[messagesNumberResult, setMessagesNumberResult] = useState(messagesNumber);

    const[directionalRangesResult, setDirectionalRangesResult] = useState(directionalRangesStorages);

           
    if(messagesNumberResult != null){
        console.log("Poruke "+messagesNumberResult);
    }
    // if(directionalRangesStorages != null){
    //     console.log("Directional Angles "+ directionalRangesStorages.map(a => a.angle));
    // }

    
    const loading = useSelector(state => {
        return state.statistics.statisticsLoading;
    });

    const loading1 = useSelector(state => {
        return state.directionalRanges.directionalRangesLoading;
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

    const onReset1 =()=>{
        settimeMin1('');
        settimeMax1('');
        setStationId1('');
        setAngle('');
        setAngles('');
        setDistances('');       
    }

    const onSubmit=()=>{
        onStatisticsMessagesNumber();
        setMessagesNumberResult(messagesNumber);        
    }    

    const onSubmit1=()=>{
        onDirectionalRanges();
        setDirectionalRangesResult(directionalRangesStorages);        
    }   

    
    useEffect(() => {
        setMessagesNumberResult(messagesNumber);
        setDirectionalRangesResult(directionalRangesStorages);
        setAngles(directionalRangesResult ? directionalRangesResult.map(a => a.angle) : '');
        setDistances(directionalRangesResult ? directionalRangesResult.map(a => a.distance) : '');
       
    }, [messagesNumber, directionalRangesStorages, directionalRangesResult])
    
      

    const onStatisticsMessagesNumber = useCallback(
        () => dispatch(actions.statisticsMessagesNumber(timeMin, timeMax, stationId), [dispatch, timeMin, timeMax, stationId])
    );

    const onDirectionalRanges = useCallback(
        () => dispatch(actions.statisticsDirectionalRanges(timeMin1, timeMax1, stationId1, angle), [dispatch, timeMin1, timeMax1, stationId1, angle])
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

    // 1
    var hoursMin = timeMin1.slice(11, 13);    
    var minutesMin = timeMin1.slice(14, 16);   
    var dayMin = timeMin1.slice(8, 10);    
    var monthMin = timeMin1.slice(5, 7);    
    var yearMin = timeMin1.slice(0, 4);

    var hoursMax = timeMax1.slice(11, 13);    
    var minutesMax = timeMax1.slice(14, 16);   
    var dayMax = timeMax1.slice(8, 10);    
    var monthMax = timeMax1.slice(5, 7);    
    var yearMax = timeMax1.slice(0, 4);   


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
        
    var data = [];
    
    if(angles != null && distances != null){
        for(var i = 0; i < angles.length; i++){
            var object = {
                angle: angles[i],
                distance: parseFloat(distances[i]).toFixed(2)
            }
            data.push(object);
        }        
    }

    var _ = require('lodash');
   var data1 = _.sortBy(data, 'angle', function(n){return Math.sin(n)});
    
    //const data1 = JSON.stringify(data, undefined, 2);
    //console.log("DATA =>" + data);  
    
    
    let result = <Spinner />

    if(!messagesNumber && !loading){
        result = <p style={{ textAlign: 'center', color:'red', marginTop:'15px' }}>Please insert search parameters to start search</p>;
    }
    if(messagesNumber && !loading){
        result = <textarea value={messagesNumber != null ? messagesNumberResult : ''} rows ={7} className={classes.resultBox} />
    }

    let result1 = <Spinner />

    if(!directionalRangesStorages && !loading1){
        
        result1 = <p style={{ textAlign: 'center', color:'red', marginTop:'15px' }}>Please insert search parameters to see directional ranges in Radar Graph</p>;
    }
    if(directionalRangesStorages && !loading1){
        
        result1 = <ResponsiveContainer width={2260} height={2260} style={{display: 'flex', alignItems:'center', justifyContent: 'center', margineTop: '1590px'}}>
        <RadarChart cx={850} cy={780} outerRadius={750} data={data1} >
          <PolarGrid />
          <PolarAngleAxis dataKey="angle" label="angle °"/>
          <PolarRadiusAxis angle={45} domain={[0, 400]} label="km" />
          <Radar name="Directional Range [km]" dataKey="distance" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} dot={<Dot r={2} fill="black"></Dot>} width={450} height={450} />
          <LabelList angle={20} 
                     offset={30}
                     dataKey="Count"
                     position = "center"
          />
        </RadarChart>        
      </ResponsiveContainer>

               
    }
    
    return (
        <>
            <h2><u>STATISTICS</u></h2>  
            <h5>Number of different messages per receiver</h5>
            <div className={classes.container}>         
                <form className={classes.form} >
                    <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">
                                   
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
            <hr style={{width:"100%", size:"3", color:"black"}}></hr>
            <h5>Directional ranges per receiver</h5>
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
                                        value={timeMin1}
                                        // changed={(e)=>settimeMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>(settimeMin1(e.target.value))}                                        
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
                                        value={timeMax1}
                                        // changed={(e)=>settimeMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>settimeMax1(e.target.value)}
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
                        <input className={classes.input} value={stationId1} onChange={(e)=>setStationId1(e.target.value)} placeholder='Insert Station ID'/>
                    </div>
                    <div >                        
                        <input className={classes.input} value={angle} onChange={(e)=>setAngle(e.target.value)} placeholder='Insert desired angle'/>
                    </div>
                    
                </form>
                <div className={classes.btnContainer}>
                    <div className={classes.button}>
                        <button    type="submit" onClick={onSubmit1}  >SEARCH</button>
                        
                    </div>
                    <div className={classes.button}>
                        <button  type="submit" className="btn btn-warning" onClick={onReset1} >RESET</button>
                       
                    </div>
                </div>
                <div className="form-group">
                    <label className={classes.resultLabel}><u>RADAR CHART: </u></label>
                    <br></br>
                    
                    {result1}
                    
                                
                    
                </div>
            </div>
        </>
       
    )
}

export default MessagesNumber;


