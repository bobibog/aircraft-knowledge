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
import StationStatusTable from '../StationStatusTable/StationStatusTable';
import SearchStationStatus from '../../../components/SearchElement/SearchStationStatus/SearchStationStatus';
import { useHistory, useLocation } from 'react-router-dom';


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

    const[timeMin3, settimeMin3] = useState('');
    const[timeMax3, settimeMax3] = useState('');
    const[stationId3, setStationId3] = useState('');

    const[angles, setAngles] = useState([]);
    const[distances, setDistances] = useState([]);
    const[newArray, setNewArray] = useState([]);     
    
    const[feedingTimes, setFeedingTimes] = useState([]);
    const[feedingADSB, setFeedingADSB] = useState([]);
    const[feedingACARS, setFeedingACARS] = useState([]);
    const[feedingVDLM2, setFeedingVDLM2] = useState([]);
    const[idleTimes, setIdleTimes] = useState([]);
    const[idle, setIdle] = useState([]);
    const[total, setTotal] = useState([]);
    const[station, setStation] = useState([]);
    const[percentage, setPercentage] = useState([]);
    const[percentageADSB, setPercentageADSB] = useState([]);
    

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

    const feedingPercentagePerMessageType = useSelector(state => {
        return state.feedingPercentagePerMessageType.feedingPercentagePerMessageType;
    })

    const stationData = useSelector(state => {
        return state.stationLastSeen.stationData;
    });

    const activeStationsNumber = useSelector(state => {
        return state.activeStationsNumber.stationsNumber;
    })

    // STATION STATUS
    const[start, setStart] = useState('');
    const[end, setEnd] = useState('');
    const[statId, setStatId] = useState('');
    const[msgType, setMsgType] = useState('');

    const stationStatus = useSelector(state => {
        return state.stationStatus.stationStatus;
    });

    const stationStatusCount = useSelector(state => {
        return state.stationStatus.stationStatusCount;
    });

    const loadingStationStatus = useSelector(state => {
        return state.stationStatus.stationStatusLoading;
    });
    const offsetStationStatus = useSelector(state => {
        return state.stationStatus.stationStatusOffset;
    });
    const limitStationStatus = useSelector(state => {
        return state.stationStatus.stationStatusLimit;
    });
    const pageStationStatus = useSelector(state => {
        return state.stationStatus.stationStatusPage;
    });    
        
    const onFetchStationStatus = useCallback(
        () => dispatch(actions.fetchStationStatus(offsetStationStatus, limitStationStatus, start, end, statId, msgType ))
        , [dispatch, offsetStationStatus, limitStationStatus, start, end, statId, msgType]
    );    

    const onSetStationStatusOffsetLimit = (offsetStationStatus, limitStationStatus) => dispatch(actions.setStationStatusOffsetLimit(offsetStationStatus, limitStationStatus));    
    
    const onSetStationStatusPage = (pageStationStatus) => dispatch(actions.setStationStatusPage(pageStationStatus)); 

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetStationStatusOffsetLimit(tableOffset, tableLimit);   
    };
    const setStationStatusPageHandler = pageStationStatus => {                
        onSetStationStatusPage(pageStationStatus);
    };   
    
    // FILTERING/SEARCHING
    const submitSearchHandler = (start, end, statId, msgType) => {  
        onSetStationStatusOffsetLimit(0, limitStationStatus);
        onSetStationStatusPage(0);
        setStart(start);
        setEnd(end);
        setStatId(statId);
        setMsgType(msgType);
    };
    
    
    const resetSearchHandler = () => {
        onSetStationStatusOffsetLimit(0, 10);
        onSetStationStatusPage(0);
        setStart('');
        setEnd('');
        setStatId('');
        setMsgType('');
    };    

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const targetStationId = searchParams.get("stationId");

    useEffect(() => {
        onFetchStationStatus();
    
        if (targetStationId) {
            setTimeout(() => {
                const element = document.getElementById(`station-row-${targetStationId}`);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                    element.focus();

                    element.classList.add(classes.highlight);
    
                    setTimeout(() => {
                        element.classList.add(classes.dehighlight);
    
                        setTimeout(() => {
                            element.classList.remove(classes.highlight);
                            element.classList.remove(classes.dehighlight);
                        }, 2000);
                    }, 2000); 
                }
            }, 100);
        }
    }, [onFetchStationStatus, targetStationId, classes.highlight, classes.dehighlight]);
    
    
    

    let stationStatusTable = <Spinner />;
    if (!stationStatus && !loadingStationStatus  ) {
        stationStatusTable = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read StationStation table from the server!</p>;
    }
    
    if (stationStatus && !loadingStationStatus ) {
        stationStatusTable =  <StationStatusTable
            data={stationStatus}
            rowsPerPageDef={limitStationStatus}            
            totalDataCount={stationStatusCount}
            currPage={pageStationStatus}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            setPageStore={setStationStatusPageHandler}   
            //allOption={allOption}                     
        />;
        
    }      

    // ↑ STATION STATUS


    const[messagesNumberResult, setMessagesNumberResult] = useState(messagesNumber);

    const[directionalRangesResult, setDirectionalRangesResult] = useState(directionalRangesStorages);

    const[feedingTimeDtosResult, setFeedingTimeDtosResult] = useState(feedingTimeDtos);

    const[feedingWorkPercentageDtosResult, setFeedingWorkPercentageDtos] = useState(feedingWorkPercentageDtos);

    const dataPercentages = JSON.stringify(feedingWorkPercentageDtos, undefined, 2);     

    const[feedingPercentagePerMessageTypeResult, setFeedingPercentagePerMessageTypeResult] = useState(feedingPercentagePerMessageType);

    const dataFeedingPercentagesPerMessageType = JSON.stringify(feedingPercentagePerMessageType, undefined, 2);

    const[stationRecord, setStationRecord] = useState(stationData);
        
    //console.log("Feeding Percentages Per Message Type =" + dataFeedingPercentagesPerMessageType);

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

    const percentagesPerType = (object, index) => {
        return(
            <tr key = {index}>
                <td>{object.stationId}</td>
                <td>{(object.feedingTime ).toFixed(2)}</td>
                {/* <td>{(object.feedMinutes).toFixed(2)}</td> */}
                {/* <td>{(object.idleTime / 3600).toFixed(2) }</td> */}
                {/* <td>{((hoursMax-hourMin)*60-object.feedMinute).toFixed(2) }</td> */}
                {/* <td>{(object.totalEngagement / 3600).toFixed(2)}</td> */}
                <td>{(object.feedingPercentage).toFixed(2)}</td>
                <td>{(object.feedingTimeADSB).toFixed(0)}</td>
                <td>{(object.feedingPercentageADSB).toFixed(2)}</td>
                <td>{(object.feedingTimeACARS).toFixed(0)}</td>
                <td>{(object.feedingPercentageACARS).toFixed(2)}</td>
                <td>{(object.feedingTimeVDLM2).toFixed(0)}</td>
                <td>{(object.feedingPercentageVDLM2).toFixed(2)}</td>
            </tr>
        )
    }

    const history = useHistory();

    const handleRowClick = (id) => {
        //history.push(`/updateStation/${id}`);
        history.push(`/stationDetails/${id}`);
    };
    
    const stationDataParsed = (object, index) => {
        return (
            <tr 
                key={index} 
                id={`station-row-${object.stationId}`}
                onClick={() => handleRowClick(object.id)} 
                style={{ cursor: 'pointer' }}
            >
                <td>{object.stationId}</td>
                <td>{object.latitude}</td>
                <td>{object.longitude}</td>
                <td>{object.city || ''}</td>
                <td>{object.country || ''}</td>
                <td>{object.locationAddress || ''}</td>
                <td style={{ width: '120px' }}>
                    {object.lastActiveTime != null ? 
                        (object.lastActiveTime).slice(0, 10) + ' ' + (object.lastActiveTime).slice(11, 19) 
                        : 
                        'Inactive'
                    }
                </td>
                <td>{object.feederName}</td>
                <td>{object.feederEmail}</td>
                <td>{object.feederPhone || ''}</td>
                <td>{object.description || ''}</td>
                <td>{object.notificationEmail || ''}</td>
                <td>{object.feederNotificationEmail || ''}</td>
                <td style={{ width: '120px' }}>
                    {object.firstTimeSentToFeeder != null ? 
                        (object.firstTimeSentToFeeder).slice(0, 10) + ' ' + (object.firstTimeSentToFeeder).slice(11, 19) 
                        : 
                        ''}
                </td>
            </tr>
        );
    };
    
  

       
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

    const loading4 = useSelector(state => {
        return state.feedingPercentagePerMessageType.feedingPercentagePerMessageTypeLoading;
    })
    
    const loading5 = useSelector(state => {
        return state.stationLastSeen.stationDataLoading;
    })

    const [value, onChange] = useState(new Date());
    

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
        //onFeedingTime();   
        setFeedingTimeDtosResult(feedingTimeDtos);         
        onFeedingPercentage();   
        //setFeedingWorkPercentageDtos(feedingWorkPercentageDtos);     
        
    }  

    const onSubmit3=()=>{           
        setFeedingPercentagePerMessageTypeResult(feedingPercentagePerMessageType);         
        onFeedingPercentagePerMessageType();                 
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

    useEffect(() =>{
        onStationData();
    }, [])

    useEffect(()=>{
        onActiveStationsNumber();
        
    },[])

    // if(activeStationsNumber){
    //     console.log(activeStationsNumber);
    // }
       
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

    const onFeedingPercentagePerMessageType = useCallback(() => dispatch(actions.feedingPercentagePerTypeData(timeMin3, timeMax3, stationId3), [dispatch, timeMin3, timeMax3, stationId3]));

    const onStationData = useCallback(() => dispatch(actions.getStationData(), [dispatch]));

    const onActiveStationsNumber = useCallback(() => dispatch(actions.getStationNumber(), [dispatch]));
    

    var hoursMin = timeMin.slice(11, 13);    
    // var minutesMin = timeMin.slice(14, 16);   
    var dayMin = timeMin.slice(8, 10);    
    var monthMin = timeMin.slice(5, 7);    
    var yearMin = timeMin.slice(0, 4);

    var hoursMax = timeMax.slice(11, 13);    
    // var minutesMax = timeMax.slice(14, 16);   
    var dayMax = timeMax.slice(8, 10);    
    var monthMax = timeMax.slice(5, 7);    
    var yearMax = timeMax.slice(0, 4);

    // 1
    var hoursMin = timeMin1.slice(11, 13);    
    // var minutesMin = timeMin1.slice(14, 16);   
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

    // 3
    var hoursMin = timeMin3.slice(11, 13);    
    // var minutesMin = timeMin3.slice(14, 16);   
    var dayMin = timeMin3.slice(8, 10);    
    var monthMin = timeMin3.slice(5, 7);    
    var yearMin = timeMin3.slice(0, 4);

    var hoursMax = timeMax3.slice(11, 13);    
    // var minutesMax = timeMax3.slice(14, 16);   
    var dayMax = timeMax3.slice(8, 10);    
    var monthMax = timeMax3.slice(5, 7);    
    var yearMax = timeMax3.slice(0, 4);

    const dateValidation1 = () =>{
        const dateFromErr = {};        
        let isValid1 = true;

        if(yearMin=='' || monthMin=='' || dayMin=='' || hoursMin==''  ){
            dateFromErr.dateFromInvalid = "Please enter complete date &   time or use DatePicker ↑";
            isValid1 = false;
        } 

        setDateFromErr(dateFromErr);        
        return isValid1;
    }

    const dateValidation2 = () =>{
        
        const dateToErr = {};
        let isValid2 = true;

        if(yearMax=='' || monthMax=='' || dayMax=='' || hoursMax=='' ){
            dateToErr.dateToInvalid = "Please enter complete date &   time or use DatePicker ↑";
            isValid2 = false;
        }         
        setDateToErr(dateToErr);
        return isValid2;
    }
    
    const dateValidation3 = () =>{
        
        const dateToErr = {};
        let isValid3 = true;

        if(yearMax=='' || monthMax=='' || dayMax=='' || hoursMax=='' ){
            dateToErr.dateToInvalid = "Please enter complete date &   time or use DatePicker ↑";
            isValid3 = false;
        }         
        setDateToErr(dateToErr);
        return isValid3;
    }
    
    const onBlur1 =(e)=>{
        e.preventDefault();
        const isValid1 = dateValidation1();
    }
    const onBlur2 =(e)=>{
        e.preventDefault();
        const isValid2 = dateValidation2();
    }  
    const onBlur3 =(e)=>{
        e.preventDefault();
        const isValid2 = dateValidation3();
    }  


    const timeMinInputConfig = {
        type:'datetime-local',        
        placeholder:'From:',
        //step: 3600
        //format: "dd:MM:yyyy hh",
        //pattern:"[0-9]{2}-[0-9]{2}-[0-9]{4}T[0-9]{2}"
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
        
    }    

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

    if(!feedingTimeDtos && !feedingWorkPercentageDtos && !loading3){
        
        result2 = <p style={{ textAlign: 'center', color:'red', marginTop:'15px' }}>Please insert search parameters to see receivers feeding time</p>;
    }
    if(feedingWorkPercentageDtos  && !loading3){
        
         result2 = 
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
        
        </div>;
        
    }


    let result3 = <Spinner />

    if(!feedingPercentagePerMessageType && !loading4){
        
        result3 = <p style={{ textAlign: 'center', color:'red', marginTop:'15px' }}>Please insert search parameters to see receivers feeding time per message type</p>;
    }
    if(feedingPercentagePerMessageType && !loading4){
        
         result3 = 
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
                <th>Feeding Time [min]</th>
                {/* <th>Idle Time [h]</th> */}
                {/* <th>Total Engagement [h]</th> */}
                <th>Feeding Percentage [%]</th>      
                <th>Feeding Time ADSB [min]</th>    
                <th>Feeding Percentage ADSB [%]</th>
                <th>Feeding Time ACARS [min]</th>    
                <th>Feeding Percentage ACARS [%]</th>
                <th>Feeding Time VDLM2 [min]</th>    
                <th>Feeding Percentage VDLM2 [%]</th>  
            </tr>
        </thead>
        <tbody>
           {feedingPercentagePerMessageType.map(percentagesPerType)}
        </tbody>
        </ReactBootstrap.Table>
        
        </div>;
        
    }
    if(feedingPercentagePerMessageType && !loading4 && !timeMin3){
        
        result3 = 
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
               <th>Feeding Time ADSB [h]</th>    
               <th>Feeding Percentage ADSB [%]</th>
               <th>Feeding Time ACARS [h]</th>    
               <th>Feeding Percentage ACARS [%]</th>
               <th>Feeding Time VDLM2 [h]</th>    
               <th>Feeding Percentage VDLM2 [%]</th>  
           </tr>
       </thead>
       <tbody>
          {/* {feedingPercentagePerMessageType.map(percentagesPerType)} */}
       </tbody>
       </ReactBootstrap.Table>
       
       </div>;
       
   }

   let result4 = <Spinner />

   if(!stationData && !loading5)
   {
    result4 = <p style={{ textAlign: 'center', color:'red', marginTop:'15px' }}>There is no data. Please load the page once again.</p>;
   }
   if(stationData && !loading5){
    result4 = <div
    style={{
      width: "auto",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "10px",
      border: "1px solid black"
    }}
  >

  <div className='d-flex pb-2'>
      <button onClick={() => history.push('/addStation')} className="btn btn-primary">
          Add Station
      </button>
  </div>
  <div className="table-responsive">
    <ReactBootstrap.Table striped bordered hover>
        <thead>
            <tr>
                <th>Station</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>City</th>
                <th>Country</th>
                <th>Location Address</th>
                <th>Last Time Seen</th>
                <th>Feeder Name</th>
                <th>Feeder Email</th>
                <th>Feeder Phone</th>
                <th>Description</th>
                <th>Notification Email</th>
                <th>Feeder Notification Email</th>
                <th>First Time Sent To Feeder</th>
            </tr>
        </thead>
        <tbody>
            {stationData.map(stationDataParsed)}
        </tbody>
    </ReactBootstrap.Table>
</div>

  
  </div>;
   }

    const onReset3 =()=>{
        settimeMin3('');
        settimeMax3('');
        setStationId3('');        
        setPercentage(''); 
        setIdle('');
        setTotal('');
        setFeedingTimes('');
        setIdleTimes('');        
        //setFeedingWorkPercentageDtos('');
        //setFeedingPercentagePerMessageTypeResult([]);              
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
            <h5>Feeding time per receiver and message type</h5>
            <div className={classes.container}>         
                <form className={classes.form} >
                    <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">
                                    
                                    <label className={classes.label}>From date and time</label>              
                                    <Input 
                                        value={timeMin3}
                                        // changed={(e)=>settimeMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>(settimeMin3(e.target.value))}                                        
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
                                        value={timeMax3}
                                        // changed={(e)=>settimeMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>settimeMax3(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {timeMaxInputConfig}
                                        toggle="tooltip"
                                        placement="right"
                                        title="TO DATE & TIME"
                                        onBlur={onBlur3}                                              
                                    />
                                    {Object.keys(dateToErr).map((key)=>{
                                        return <div style={{color:'yellow', fontSize:'small', fontWeight:'bold', paddingLeft:'15px', paddingRight: '7px', width:'220px', wordWrap:'break-word', textAlign:'right'}}>{dateToErr[key]}</div>
                                    })}
                                </InputGroup>
                                </div>
                    </div>
                    <div >                        
                        <input className={classes.input} value={stationId3} onChange={(e)=>setStationId3(e.target.value)} placeholder='Insert Station ID'/>
                    </div>
                    
                    
                </form>
                <div className={classes.btnContainer}>
                    <div className={classes.button}>
                        <button    type="submit" onClick={onSubmit3}  >SEARCH</button>
                        <ReactTooltip id="registerTip" place="top" effect="solid">
                            Double click Please
                        </ReactTooltip>
                    </div>
                    
                    <div className={classes.button}>
                        <button  type="submit" className="btn btn-warning" onClick={onReset3} >RESET</button>
                       
                    </div>
                </div>
                <div className="form-group">
                    <label className={classes.resultLabel}><u>STATISTICS TABLE: </u></label>
                    <br></br>
                    {result3}                  
                </div>
            </div>
            <hr style={{width:"100%", size:"3", color:"black"}}></hr>
            <h5>STATION DATA</h5>
            <div className={classes.container}>
            <br></br>
                    {result4}
            </div>
            <hr style={{width:"100%", size:"3", color:"black"}}></hr>
            <h2 style={{color:'red', fontWeight:'bold', backgroundColor:'lightblue'}}>ACTIVE STATIONS NUMBER IN LAST 4 HOURS = {activeStationsNumber ? activeStationsNumber : '-'}</h2>
            <hr style={{width:"100%", size:"3", color:"black"}}></hr>
            <h5>STATIONS STATUS</h5>
            <div className={classes.container}>
            <br></br>
                <div >
                    <SearchStationStatus 
                         clickedSearch={submitSearchHandler}                               
                        clickedReset={resetSearchHandler} 
                        //allChanger={allChanger}  
                    />
                    {stationStatusTable}
                </div>                    
            </div>
        </>       
    )
}

export default MessagesNumber;


//https://www.youtube.com/watch?v=dZX8obCsiB8