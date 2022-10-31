import React, { useState, useContext, useCallback, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './MessagesNumber.module.css';
import ReactTooltip from "react-tooltip";
import Input from '../../../components/UI/Input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LabelList, Dot, Text, XAxis} from 'recharts';
// import StackedBarChart from "../../../components/Graphs/StackedBarChart";
import HSBar from "react-horizontal-stacked-bar-chart";
// import { StackedBarChart, IChartDataPoint, IChartProps } from '@fluentui/react-charting';
// import { DefaultPalette } from '@fluentui/react/lib/Styling';
import Chart from 'react-apexcharts';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootstrap from 'react-bootstrap';


const MessagesNumber = (props) =>{
    
    //const ref = useRef(null);

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

    const[timeMin2, settimeMin2] = useState('');
    const[timeMax2, settimeMax2] = useState('');
    const[stationId2, setStationId2] = useState('');

    const[angles, setAngles] = useState([]);
    const[distances, setDistances] = useState([]);
    const[newArray, setNewArray] = useState([]);     
    
    const[feedingTimes, setFeedingTimes] = useState([]);
    const[idleTimes, setIdleTimes] = useState([]);
    const[idle, setIdle] = useState([]);
    const[total, setTotal] = useState([]);
    const[station, setStation] = useState([]);
    const[percentage, setPercentage] = useState([]);

    const messagesNumber = useSelector(state => {
        return state.statistics.messagesNumber;
    });

    const directionalRangesStorages = useSelector(state => {
        return state.directionalRanges.directionalRangesStorages;
    });
    
    const feedingTimeDtos = useSelector(state => {
        return state.feedingTime.feedingTimeDtos;
    })

    const feedingWorkPercentageDtos = useSelector(state => {
        return state.feedingPercentage.feedingWorkPercentageDtos;
    })

    const[messagesNumberResult, setMessagesNumberResult] = useState(messagesNumber);

    const[directionalRangesResult, setDirectionalRangesResult] = useState(directionalRangesStorages);

    const[feedingTimeDtosResult, setFeedingTimeDtosResult] = useState(feedingTimeDtos);

    const[feedingWorkPercentageDtosResult, setFeedingWorkPercentageDtos] = useState(feedingWorkPercentageDtos);

    const dataPercentages = JSON.stringify(feedingWorkPercentageDtos, undefined, 2);    
    
    //console.log("Feeding Percentages =" + dataPercentages);

    const percentages = (percentage, index) => {
        return(
            <tr key = {index}>
                <td>{percentage.stationId}</td>
                <td>{(percentage.feedingTime / 3600).toFixed(2)}</td>
                <td>{(percentage.idleTime / 3600).toFixed(2) }</td>
                <td>{(percentage.totalEngagement / 3600).toFixed(2)}</td>
                <td>{(percentage.feedingPercentage).toFixed(2)}</td>
            </tr>
        )
    }

    // if(messagesNumberResult != null){
    //     console.log("Poruke "+messagesNumberResult);
    // }
    // if(directionalRangesStorages != null){
    //     console.log("Directional Angles "+ directionalRangesStorages.map(a => a.angle));
    // }
    // if(feedingWorkPercentageDtos != null){
    //     console.log("Station ID = "+ percentage);        
    // }

    
    const loading = useSelector(state => {
        return state.statistics.statisticsLoading;
    });

    const loading1 = useSelector(state => {
        return state.directionalRanges.directionalRangesLoading;
    });

    const loading2 = useSelector(state => {
        return state.feedingTime.feedingTimeLoading;
    })

    const loading3 = useSelector(state => {
        return state.feedingPercentage.feedingWorkPercentageDtosLoading;
    })

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

    const onReset2 =()=>{
        settimeMin2('');
        settimeMax2('');
        setStationId2('');
        setStation('');
        setPercentage(''); 
        setIdle('');
        setTotal('');
        setFeedingTimes('');
        setIdleTimes('');        
        setFeedingWorkPercentageDtos('');

    }

    const onSubmit=()=>{
        onStatisticsMessagesNumber();
        setMessagesNumberResult(messagesNumber);        
    }    

    const onSubmit1=()=>{
        onDirectionalRanges();
        setDirectionalRangesResult(directionalRangesStorages);        
    }   

    const onSubmit2=()=>{        
        onFeedingTime();   
        setFeedingTimeDtosResult(feedingTimeDtos);         
        onFeedingPercentage();   
        // setFeedingWorkPercentageDtos(feedingWorkPercentageDtos);     
        
    }  

  
    
    useEffect(() => {
        setMessagesNumberResult(messagesNumber);
        setDirectionalRangesResult(directionalRangesStorages);
        setFeedingTimeDtosResult(feedingTimeDtos);
        setAngles(directionalRangesResult ? directionalRangesResult.map(a => a.angle) : '');
        setDistances(directionalRangesResult ? directionalRangesResult.map(a => a.distance) : '');
        setFeedingTimes(feedingTimeDtosResult ? feedingTimeDtosResult.map(a => a.feedingTime) : '');
        setIdleTimes(feedingTimeDtosResult ? feedingTimeDtosResult.map(a => a.idleTime) : '');
        setIdle(feedingWorkPercentageDtosResult ? feedingWorkPercentageDtosResult.map(a => a.idleTime) : '');
        setTotal(feedingWorkPercentageDtosResult ? feedingWorkPercentageDtosResult.map(a => a.totalEngagement) : '');
        setStation(feedingWorkPercentageDtosResult ? feedingWorkPercentageDtosResult.map(a => a.stationId) : '');
        setPercentage(feedingWorkPercentageDtosResult ? feedingWorkPercentageDtosResult.map(a =>a.feedingPercentage) : '');
        setFeedingWorkPercentageDtos(feedingWorkPercentageDtos);
    }, [messagesNumber, directionalRangesStorages, directionalRangesResult, feedingTimeDtos, feedingTimeDtosResult, feedingWorkPercentageDtosResult, feedingWorkPercentageDtos])
    
    //console.log("Percentage => " + percentage);

    const onStatisticsMessagesNumber = useCallback(
        () => dispatch(actions.statisticsMessagesNumber(timeMin, timeMax, stationId), [dispatch, timeMin, timeMax, stationId])
    );

    const onDirectionalRanges = useCallback(
        () => dispatch(actions.statisticsDirectionalRanges(timeMin1, timeMax1, stationId1, angle), [dispatch, timeMin1, timeMax1, stationId1, angle])
    );
    
    const onFeedingTime = useCallback(
        () => dispatch(actions.feedingTimeData(timeMin2, timeMax2, stationId2), [dispatch, timeMin2, timeMax2, stationId2])
    );

    const onFeedingPercentage = useCallback(
        () => dispatch(actions.feedingPercentageData(timeMin2, timeMax2, stationId2), [dispatch, timeMin2, timeMax2, stationId2])
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

    // 2
    var hoursMin = timeMin2.slice(11, 13);    
    var minutesMin = timeMin2.slice(14, 16);   
    var dayMin = timeMin2.slice(8, 10);    
    var monthMin = timeMin2.slice(5, 7);    
    var yearMin = timeMin2.slice(0, 4);

    var hoursMax = timeMax2.slice(11, 13);    
    var minutesMax = timeMax2.slice(14, 16);   
    var dayMax = timeMax2.slice(8, 10);    
    var monthMax = timeMax2.slice(5, 7);    
    var yearMax = timeMax2.slice(0, 4);

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
    var object = {};

    if(angles != null && distances != null){
        for(var i = 0; i < 359; i++){
            if(angles[i] != null){
                object = {
                    angle: angles[i],
                    distance: parseFloat(distances[i]).toFixed(2)
                }
            }
            else{
                object = {
                    angle: null,
                    distance: null
                }
            }         
            
            data.push(object);
        }    
        object.cursor = [0, 90, 180, 270]; 
        data.push(object);   
    }

    var dataFeeding = [];
    var objectFeeding = {};

    var feedingData = [{}];
    var feedingDataObject = {};
    var feedingSeries = [{}];

    if(feedingTimes != null && idleTimes != null){
        for(var i = 0; i < feedingTimes.length +idleTimes.length; i++){
            if(feedingTimes[i] != null){
                objectFeeding = {
                    name: "FEEDING",
                    value: feedingTimes[i],                    
                    color: "blue"
                }
                
                feedingSum += feedingTimes[i];
                dataFeeding.push(objectFeeding);
            }
            if(idleTimes[i] != null){
                objectFeeding = {
                    name: "IDLE",
                    value: idleTimes[i],                    
                    color: "yellow"
                }
                idleSum += idleTimes[i];
                dataFeeding.push(objectFeeding);
            }              
        }        
    }

    var feedingArray = [];
    var idleArray = [];

    var feedingSum = 0.00;
    var idleSum = 0.00;
    var sum = 0.00;
    var feedingPercentage = 0.00;
    var idlePercentage = 0.00;

    if(feedingTimes != null && idleTimes != null){
        for(var i = 0; i < feedingTimes.length +idleTimes.length; i++){
            if(feedingTimes[i] != null){
                //feedingArray.push(feedingTimes[i]);
                feedingDataObject = 
                    {
                        name: 'Feeding Time',
                        data: feedingTimes[i]
                    }
                feedingSum += feedingTimes[i];
            }
            if(idleTimes[i] != null){
                //idleArray.push(idleTimes[i]);
                feedingDataObject = 
                    
                    {
                        name: 'Idle Time',
                        data: idleTimes[i]
                    }
                   
                idleSum += idleTimes[i];
            } 
            feedingData.push(feedingDataObject);                           
        }                    
        
    //    feedingData = [
    //     {
    //         name: 'Feeding Time',
    //         data: feedingArray
    //     },
    //     {
    //         name: 'Idle Time',
    //         data: idleArray
    //     }
    //    ]

        
    }

    // if(feedingTimes != null && idleTimes != null){
    //     for(var i = 0; i < feedingTimes.length +idleTimes.length; i++){
    //         if(feedingTimes[i] != null){
    //             objectFeeding = {
    //                 name: "FEEDING",
    //                 data: feedingTimes[i]                    
                    
    //             }

    //             dataFeeding.push(objectFeeding);
    //         }
    //         if(idleTimes[i] != null){
    //             objectFeeding = {
    //                 name: "IDLE",
    //                 data: idleTimes[i]           
                    
    //             }

    //             dataFeeding.push(objectFeeding);
    //         }              
    //     }        
    // }
    // const data45 = JSON.stringify(dataFeeding, undefined, 2);
    // console.log("Data for diagram = "+ data45);

    // sum = feedingSum + idleSum;

    // feedingPercentage = feedingSum/sum *100;
    // idlePercentage = idleSum / sum *100;

    const data44 = JSON.stringify(feedingData, undefined, 2);
    //console.log("FeedingData = "+data44);
    //var series = feedingData;
    var series = dataFeeding;

    var options = {
        chart: {
          type: 'bar',
          height: 350,
          width:1200,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        // stroke: {
        //     width: 1,
        //     colors: ['green']
        //   },
          title: {
            text: 'Feeding/Idle time per receiver'
          },
          xaxis: {
            categories: [14],
            labels: {
              formatter: function (val) {
                return val 
              }
            }
          },
          yaxis: {
            title: {
              text: 'Station ID'
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              }
            }
          },
          fill: {
            opacity: 1
          },
          legend: {
            position: 'top',
            horizontalAlign: 'midle',
            offsetX: 80
          }
        };
    
    

   var _ = require('lodash');
   var data1 = _.sortBy(data, 'angle', function(n){return Math.sin(n)});
   var data2 = [{"angle":0}, {"angle":90}, {"angle":180}, {"angle": 270}];
    
    const data4 = JSON.stringify(data, undefined, 2);
    //console.log("DATA =>" + data);  
    
    function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }) {
        return (
          <Text
            {...rest}
            verticalAnchor="right"
            y={y + (y - cy) / 28}
            x={x + (x - cx) / 28}
            angle={45}
            fontSize={10}
            fill= 'blue'
            fontWeight="bold"
            fontFamily="Serif"
          >
            {payload.value}
          </Text>
        );
      }   
    
    let result = <Spinner />   

    if(!messagesNumber && !loading){
        result = <p style={{ textAlign: 'center', color:'red', marginTop:'15px' }}>Please insert search parameters to start search</p>;
    }
    if(messagesNumber && !loading){
        result = <textarea value={messagesNumber != null ? messagesNumberResult : ''} rows ={7} className={classes.resultBox} />
    }

   
    let result1 = <Spinner />

    if(!directionalRangesStorages && !loading1){
        
        result1 = <p style={{ textAlign: 'center', color:'red', marginTop:'15px' }}>Please insert search parameters to see directional ranges in Polar Graph</p>;
    }
    if(directionalRangesStorages && !loading1){
        
        result1 =          
        <ResponsiveContainer width={2480} height={2480} style={{display: 'flex', alignItems:'center', justifyContent: 'center', margineTop: '2420px'}}>      
        <RadarChart cx={820} cy={780} outerRadius={720} data={data1} >
          <PolarGrid  />          
          <PolarAngleAxis tick={props => renderPolarAngleAxis(props)} />              
        
          <PolarRadiusAxis angle={45} domain={[0, 400]} label='nmi' tick={ { fill: 'red', fontSize: 14, fontFamily:'Verdana' }} />
          <Radar name="Directional Range [nmi]" dataKey="distance" stroke="#8884d8" fill="red" fillOpacity={0.6} dot={<Dot r={2} fill="red"></Dot>} width={450} height={450} />
          <LabelList angle={20} 
                     offset={30}
                     dataKey="Count"
                     position = "center"
          />
        </RadarChart>        
      </ResponsiveContainer>
               
    }

    let result2 = <Spinner />

    if(!feedingTimeDtos && !feedingWorkPercentageDtos && !loading2 && !loading3){
        
        result2 = <p style={{ textAlign: 'center', color:'red', marginTop:'15px' }}>Please insert search parameters to see receivers feeding time in Horizontal Bar Graph</p>;
    }
    if(feedingTimeDtos && feedingWorkPercentageDtos && !loading2 && !loading3){
        
         result2 = 
        //     <HSBar
        //     height={50}
        //     showTextIn
        //     // showTextUp
        //     //showTextDown
        //     outlineWidth= {0.5}
        //     outlineColor= "black"
        //     id="new_id"
        //     fontColor="rgb(11, 11, 69)"
        //     data={dataFeeding}            
        //     onClick={e => console.log(e.bar)}
        // />;
        // <div
        //   style={{
        //     width: "auto",
        //     marginLeft: "10%",
        //     padding: "10px",
        //     border: "1px solid black"
        //   }}
        // >
        //   <HSBar
        //     //showTextDown
        //     id="hsbarExample"
        //     data={dataFeeding}
        //     onClick={e => console.log(e.bar)}
        //   />
        // </div>;
        <div
          style={{
            width: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "10px",
            border: "1px solid black"
          }}
        >
        <ReactBootstrap.Table striped bordered hover>
        <thead>
            <tr>
                <th>Station</th>
                <th>Feeding Time [h]</th>
                <th>Idle Time [h]</th>
                <th>Total Engagement [h]</th>
                <th>Feeding Percentage [%]</th>            
            </tr>
        </thead>
        <tbody>
           {feedingWorkPercentageDtos.map(percentages)}
        </tbody>
        </ReactBootstrap.Table>
        {/* <HSBar
            //showTextDown
            id="hsbarExample"
            data={dataFeeding}
            onClick={e => console.log(e.bar)}
          /> */}
        </div>;
        
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
                    <label className={classes.resultLabel}><u>POLAR CHART: </u></label>
                    <br></br>
                    {result1}                  
                </div>
            </div>
            <hr style={{width:"100%", size:"3", color:"black"}}></hr>
            <h5>Feeding time per receiver</h5>
            <div className={classes.container}>         
                <form className={classes.form} >
                    <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">
                                    
                                    <label className={classes.label}>From date and time</label>              
                                    <Input 
                                        value={timeMin2}
                                        // changed={(e)=>settimeMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>(settimeMin2(e.target.value))}                                        
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
                                        value={timeMax2}
                                        // changed={(e)=>settimeMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>settimeMax2(e.target.value)}
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
                        <input className={classes.input} value={stationId2} onChange={(e)=>setStationId2(e.target.value)} placeholder='Insert Station ID'/>
                    </div>
                    
                    
                </form>
                <div className={classes.btnContainer}>
                    <div className={classes.button}>
                        <button    type="submit" onClick={onSubmit2}  >SEARCH</button>
                        <ReactTooltip id="registerTip" place="top" effect="solid">
                            Double click Please
                        </ReactTooltip>
                    </div>
                    
                    <div className={classes.button}>
                        <button  type="submit" className="btn btn-warning" onClick={onReset2} >RESET</button>
                       
                    </div>
                </div>
                <div className="form-group">
                    <label className={classes.resultLabel}><u>STATISTICS TABLE: </u></label>
                    <br></br>
                    {result2}                  
                </div>
            </div>
        </>
       
    )
}

export default MessagesNumber;


//https://www.youtube.com/watch?v=dZX8obCsiB8