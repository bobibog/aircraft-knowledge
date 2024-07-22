import React, {useState, useCallback, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions/index';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAcarsWithExtData.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from '../../UI/Dropdown/Dropdown';


//////////////////////
//import {AuthContext} from '../../../context/auth-context';
//import {useContext} from 'react';
//////////////////////


const SearchAcarsWithExtData = (props) => {


    //const authContext = useContext(AuthContext);
    //const authExtendTokenExpiration = authContext.authenticationExtendTokenExpiration;

    ////////////////////////////////
    //#
    //useRef za direktno menjanje podatka bez izazivanja rerendera i cuvaju vrednosti nakon rerendera i nestaje nakon unmounta
    //const isFirstTimeMounting = useRef(2);//
    //predstavljaju proslo stanje a uvek su predefinisane po vrednosti u setTimeout ondosno njihova naredna promena ne menja proslu vrednost u proslom timeru tako da moramo totalno ukloniti prosli timer
    const lastFetchTime = useRef(-500);
    const timeOutRef = useRef(null);
    ////////////////////////////////

    const airlineNameList = useSelector(state => {
        return state.airline.airlines;
    });      
    
    const aircraftTypeList = useSelector(state=>{
        return state.aircraftType.aircraftTypes;
    });

    const typeCodeList = useSelector(state=>{
        return state.typeCode.typeCodes;
    });
    
        
    const[valueName, setValueName] = useState(null);
    const[valueIATA, setValueIATA] = useState(null);
    const[valueICAO, setValueICAO] = useState(null);
    
    const[valueAircraftTypeFull, setValueAircraftTypeFull] = useState(null);//selektovan objekat iz DropDown
    const[valueTypeCode, setValueTypeCode] = useState(null);//

    const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState('');
    const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState('');
    const[tail, setTail]= useState('');
    const[flight, setFlight]=useState('');
    const[text, setText]=useState('');
    const[mode, setMode]= useState('');
    const[label, setLabel]= useState('');
    const[blockId, setBlockId] = useState('');
    const[msgno, setMsgno]= useState('');
    const[dsta, setDsta]= useState('');
    const[airlineIata, setAirlineIata] = useState('');
    const[airlineIcao, setAirlineIcao] = useState('');
    const[airlineName, setAirlineName] = useState('');
    const[operatorName, setOperatorName] = useState('');
    const[operatorIata, setOperatorIata] = useState('');
    const[operatorIcao, setOperatorIcao] = useState('');
    //const[aggregatedText , setAggegatedText] = useState('');//!
    
    const[serialNumber, setSerialNumber] = useState('');    
    
    /////////////////////////
    const[aircraftType, setAircraftType] = useState('');
    const[typeCode, setTypeCode] = useState('');
    /////////////////////////

    const[modeS, setModeS] = useState(''); 
    

    const[typeCodeChange,setTypeCodeChange] = useState('')
    const[aircraftTypeChange,setAircraftTypeChange] = useState('')

    /////////////////////////////
    const[aggrStatus, setAggrStatus]=useState('');

    //MENJA SE RESPONSE PRI ISTOM SEARCH U AcarsMessage/acarsWithExtData kao i channel
    const[consensusStatus, setConsensusStatus]=useState('');

    
    const[aggrText, setAggrText]=useState('');
    const[consensusResult, setConsensusResult]=useState('');
    /////////////////////////////

    const dispatch = useDispatch();

    // const onFetchAirlineName = useCallback(
    //     () => dispatch(actions.fetchAirlineNameList(airlineName))
    //     , [dispatch, airlineName ]
    // );

    // const onFetchAirlineIATA = useCallback(
    //     () => dispatch(actions.fetchAirlineIATAList(airlineIata))
    //     , [dispatch, airlineIata ]
    // );

    // const onFetchAirlineICAO = useCallback(
    //     () => dispatch(actions.fetchAirlineICAOList(airlineIcao))
    //     , [dispatch, airlineIcao ]
    // );

    // const onFetchOperatorName = useCallback(
    //     () => dispatch(actions.fetchOperatorNameList(operatorName))
    //     , [dispatch, operatorName ]
    // );

    // const onFetchOperatorIATA = useCallback(
    //     () => dispatch(actions.fetchOperatorIATAList(operatorIata))
    //     , [dispatch, operatorIata ]
    // );

    // const onFetchOperatorICAO = useCallback(
    //     () => dispatch(actions.fetchOperatorICAOList(operatorIcao))
    //     , [dispatch, operatorIcao ]
    // );
    

    const [limitTypeMax,setLimitTypeMax] = useState(30)

                //!         //pri rerender se obicnoj funkciji uvek menja referenca a state samo ako je promenjena vrednost sa setState 
    const onFetchAircraftType = useCallback(
                            //funkcija akcije ili vraca actionObject ili funkciju(koja u sebi zove dispatcheve)
                            //ako je actionObject vracen u dispatch onda se prosledjuje svim reducerima
                            //ako je funkcija vracena u dispatch onda se automatski zove i u nju se moze proslediti dispatch funkcija
        
                                                    //(aircraftType)//bilo
                                                                                //,authExtendTokenExpiration
        () => dispatch(actions.fetchAircraftTypes(aircraftTypeChange,limitTypeMax))
        //, [dispatch, aircraftType]//bilo
        ,[dispatch,aircraftTypeChange,limitTypeMax]
    );

    const onFetchTypeCode = useCallback(        //(typeCode)
        () => dispatch(actions.fetchTypeCodes(typeCodeChange,limitTypeMax))
        //, [dispatch, typeCode]
        ,[dispatch,typeCodeChange,limitTypeMax]
    );


    // useEffect(()=>{ 
    //     const timer = setTimeout(() => {
                        
    //         // onFetchAirlineName();
             
    //         // if(airlineIata!=''){
    //         //     onFetchAirlineIATA();
    //         // }           
    //         // if(airlineIcao!=''){
    //         //     onFetchAirlineICAO();
    //         // }
    //         // if(operatorName!= ''){
    //         //     onFetchOperatorName();
    //         // }
    //         // if(operatorIata!=''){
    //         //     onFetchOperatorIATA();
    //         // }
    //         // if(operatorIcao!=''){
    //         //    onFetchOperatorICAO(); 
    //         // }            
                                   
        
    //     }, 300);
    //     return () => clearTimeout(timer);

    // }, [airlineName, airlineIata, airlineIcao, operatorName, operatorIata, operatorIcao]);
    

    //mozemo u useEffect watch da stavimo funkciju za useCallback ili promenjljivu za useMemo koji imaju svoj watch
    //tako se pri promeni watch od useMemo ili useCallback ponovo referencira promenjljiva i onda zbog promene reference se aktivira watch od useEffect
    useEffect(()=>{
        
       //da ne bismo fetchovali podatke pri inicijalnom mountu vec kada krene da se kuca min 1 karakter
       //# 
       /*if (isFirstTimeMounting.current) {
            isFirstTimeMounting.current--;
            return;
          }
        */

        //onFetchAircraftType();//posto je aircraftType inicijalno '' nakon mounta pri pozivu onFetchAircraftType ce se fetchovati svi aircraftTypes a pri promeni aircraftType iz filtera pri kucanju karaketera zbog onFetchAircraftType watcha ce se fetchovati konkretan trenutno ukucani aircraftType,isto vazi i za typeCode
   
        timerFetchBreak(onFetchAircraftType)//fetch pauza 0.5 sekundi odnosno rec ukljucujuci naredni karakter se fetchuje samo ako je proslo >= 0.5 sekundi a ako se ponovi < 0.5 vise od 2 puta onda fetchujemo samo rec ukljucuju poslednji ukucani karakter jer svakako prikazujemo samo filtiran DropDown za trenutnu rec
    }, [onFetchAircraftType])

    useEffect(()=>{

        //#
        /*if (isFirstTimeMounting.current) {
            isFirstTimeMounting.current--;
            return;
          }
        */
        //onFetchTypeCode();//!

        timerFetchBreak(onFetchTypeCode)
    }, [onFetchTypeCode])


    //mozemo gledati kao da izvrsenje onFetchAircraftType traje 0.5
    const timerFetchBreak = (fetchFun) =>{

        const now = Date.now();//trenutak kada je naredna pozvana
    
        //cak i da je inicijalno now==0 aktivirace se
        if(now - lastFetchTime.current >= 500){//ako je proslo 0.5 sekundi nakon proslog onFetchAircraftType smemo da zovemo ponovo onFetchAircraftType
          lastFetchTime.current = now;//dodela ovde znaci kada je trenutna pocela sa izvrsenjem
          fetchFun();
          
        //fakticki je nebitno za narednog zakazivanje da li se prethodna izvrsava ili je zakazano da se prethodna izvrsava jer se svakako kreira novi timer
        //ako se izvrsava onda se kreira timer
        //ako je zakazano da se izvrsava onda se overiduje novim timerom
        }else{//ako nije proslo 0.5 sekunde a zelimo ponovo da pozovemo onFetchAircraftType onda zakazujemo pozivanje naredne za razliku do 0.5 trenutne odnosno ako naredni zeli na 0.2 da prekine cekanje trenutne onda naredni ceka 0.3
          
          clearTimeout(timeOutRef.current);//pri prekidu prethodnog timeout overidovacemo ga novim

          timeOutRef.current = setTimeout(() =>{
            lastFetchTime.current = Date.now();//trenutak kada naredna prekida cekanje zavrsetka prosle izmedju (0..0.5] potrebnog cekanja
            fetchFun();
          },0.5 - (now - lastFetchTime.current));
        }
      };
      //naredna1 pocela u 0
      //naredna2 pocela u 0.2, ceka jos 0.5-(0.2-0) odnosno ceka 0.3
      //naredna3 pocela u 0.3, ceka jos 0.5-(0.3-0.2) odnosno ceka 0.4 sto znaci da ako naredni timer od naredna3 overiduje prethodni od naredna2 malo iznad njegovog pocetka odnosno 0.21 cekace podjednako za prikaz naredna3 a ako ga overiduje pri samom kraju odnosno u 0.5 cekace ceo timeout
      //formula naredne koja ceka proslu je 0.5-(pocetak nove naredne-pocetak prosle naredne)


    useEffect(() =>{
        return () => clearTimeout(timeOutRef.current);
    },[]);

    // Disable Input
    const [disabled, setDisabled] = useState(false);

    // DATE-TIME input VALIDATION
    const[dateFromErr, setDateFromErr] = useState({});
    const[dateToErr, setDateToErr] = useState({});

    var hoursMin = acarsMessageDateTimeMin.slice(11, 13);    
    var minutesMin = acarsMessageDateTimeMin.slice(14, 16);   
    var dayMin = acarsMessageDateTimeMin.slice(8, 10);    
    var monthMin = acarsMessageDateTimeMin.slice(5, 7);    
    var yearMin = acarsMessageDateTimeMin.slice(0, 4);

    var hoursMax = acarsMessageDateTimeMax.slice(11, 13);    
    var minutesMax = acarsMessageDateTimeMax.slice(14, 16);   
    var dayMax = acarsMessageDateTimeMax.slice(8, 10);    
    var monthMax = acarsMessageDateTimeMax.slice(5, 7);    
    var yearMax = acarsMessageDateTimeMax.slice(0, 4);
    

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
        setAcarsMessageDateTimeMin('');
        setAcarsMessageDateTimeMax('');
        setTail('');
        setFlight('');
        setText('');
        setMode('');
        setLabel('');
        setBlockId('');
        setMsgno('');
        setDsta('');
        //setAirlineName('');
        //setAirlineIATA('');
        //setAirlineICAO('');
        //setOperatorName('');
        //setOperatorIata('');
        //setOperatorIcao('');
        setSerialNumber('');        
        //setAggregatedText('');
        setValueName(null);
        setValueIATA(null);
        setValueICAO(null);
        //setValueOperatorName(null);
        //setValueOperatorIATA(null);
        //setValueOperatorICAO(null);
        

        ////////////////////////////////
        setAircraftType('');//
        setValueAircraftTypeFull(null);//
        setTypeCode('');//
        setValueTypeCode(null);//
        ////////////////////////////////

        ///////////////
        setAggrStatus("")
        setConsensusStatus("")
        
        setAggrText('');
        setConsensusResult('');
        ///////////////
        
        setDateFromErr({});
        setDateToErr({});
        props.clickedReset();        
    };    

    // const disabler = () =>{
    //     if(airlineName!= null){
    //         setDisabled(true);
    //     }
    // }

    // DROPDOWN MENUS
    let dropAirlineName = '';
    let dropAirlineIATA= '';
    let dropAirlineICAO = '';
    let dropOperatorName = '';
    let dropOperatorIATA= '';
    let dropOperatorICAO = '';
    let dropAircraftTypeFull = '';
    
    let dropTypeCode = '';//

    const onDropNameChange = (e) =>{
        setValueName(e);       
        //setAirlineName(e.airlineName);
        //disabler();                     
    }
    const onDropIATAChange = (e) =>{
        setValueIATA(e);       
        //setAirlineIATA(e.iata);
        //disabler();                     
    }
    const onDropICAOChange = (e) =>{
        setValueICAO(e);       
        //setAirlineICAO(e.icao);
        //disabler();                     
    }

    // const onDropOperatorNameChange = (e) =>{
    //     setValueOperatorName(e);       
    //     //setOperatorName(e.airlineName);
    //     //disabler();                     
    // }
    // const onDropOperatorIATAChange = (e) =>{
    //     setValueOperatorIATA(e);       
    //     //setOperatorIata(e.iata);
    //     //disabler();                     
    // }
    // const onDropOperatorICAOChange = (e) =>{
    //     setValueOperatorICAO(e);       
    //     setOperatorIcao(e.icao);
    //     //disabler();                     
    // }


                                        //e nije event vec trenutno selektovan objekat
    const onDropAircraftTypeFullChange = (e) =>{

        console.log("onChangeAircraftTypeFull")
        
        ///////////
        //bilo
        //setValueAircraftTypeFull(e);//pamti selektovan objekat a u DropDown prikazuje full naziv
        //setAircraftType(e.aircraftType);//pamti full DropDown naziv selektovanog objekta jer smo mogli da ga selektujemo po contains < cele reci pa Search po tom nazivu a konkretnom izboru ne bi imao smisla
        //**setAircraftType(e);
        ///////////

        setAircraftTypeChange(e)//za fetch novog pri promeni ukucanog

        //disabler();                     
    }
    const onDropAircraftTypeFullSelected = (e) =>{
        console.log("onSelectedAircraftTypeFull")
        
        setValueAircraftTypeFull(e);//za promenu u DropDown childu koji koristi valueAircraftTypeFull samo za prikaz vrednosti polja pa ni ne mora biti u Search
        setAircraftType(e.aircraftType);//za Search selektovanog
        
    }

    const onDropTypeCodeChange = (e) =>{//fetch
        console.log("onChangeTypeCode")
        
        ///////////
        //bilo
        //setValueTypeCode(e);       
        //setTypeCode(e.typeCode);
        ///////////

        setTypeCodeChange(e)

        //disabler();                     
    }
    const onDropTypeCodeSelected = (e) =>{
        console.log("onSelectedTypeCode")
        
        setValueTypeCode(e);       
        setTypeCode(e.typeCode);
        
    }


    // DELETING VALUE BY BACKSPACE
    // const deletingAirlineName=(e)=>{
    //     if (e.keyCode === 8) {
    //         setValueName('');
    //         setAirlineName('');
    //     }
    // }
    // const deletingAirlineIATA=(e)=>{
    //     if (e.keyCode === 8) {
    //         setValueIATA('');
    //         setAirlineIATA('');
    //     }
    // }
    // const deletingAirlineICAO=(e)=>{
    //     if (e.keyCode === 8) {
    //         setValueICAO('');
    //         setAirlineICAO('');
    //     }
    // }
    // const deletingOperatorName=(e)=>{
    //     if (e.keyCode === 8) {
    //         setValueOperatorName('');
    //         setOperatorName('');
    //     }
    // }
    // const deletingOperatorIATA=(e)=>{
    //     if (e.keyCode === 8) {
    //         setValueOperatorIATA('');
    //         setOperatorIata('');
    //     }
    // }
    // const deletingOperatorICAO=(e)=>{
    //     if (e.keyCode === 8) {
    //         setValueOperatorICAO('');
    //         setOperatorIcao('');
    //     }
    // }
    const deletingAircraftType=(e)=>{
        console.log("KEY DOWN deletingAircraftType")//moze i sa key up ali onda nece moci da se drzi
        if (e.keyCode === 8) {
            setValueAircraftTypeFull('');
            setAircraftType('');
        }
    }
    const deletingTypeCode=(e)=>{
        console.log("KEY DOWN deletingTypeCode")
        if (e.keyCode === 8) {
            setValueTypeCode('');
            setTypeCode('');
        }
    }

    // Dropdown  Status 
    const[dropStatus, setDropStatus]=useState(0);
    function dropChanger(dropStatus){
        if(dropStatus==0){
            setDropStatus(1);
            return dropStatus; 
        }
             
    };
     
    // Dropdown Airline Name
    if(airlineNameList != null)
    {
        dropAirlineName = <Dropdown
            prompt= 'Airline Name'            
            options={airlineNameList}              
            value={valueName}   
            onChange={onDropNameChange} 
            descriptor='airlineName' 
            characterLimit = {2} 
            //onKeyDown={deletingAirlineName} 
            dropChanger={dropStatus}                                             
        />;
    }

    
    // Dropdown Airline IATA
    if(airlineNameList != null)
    {
        dropAirlineIATA = <Dropdown
            prompt= 'Airline IATA'            
            options={airlineNameList}              
            value={valueIATA}   
            onChange={onDropIATAChange} 
            descriptor='iata'  
            characterLimit = {0}  
            //onKeyDown={deletingAirlineIATA} 
            dropChanger={dropStatus}                                             
        />;
    }
    // Dropdown Airline ICAO
    if(airlineNameList != null)
    {
        dropAirlineICAO = <Dropdown
            prompt= 'Airline ICAO'            
            options={airlineNameList}              
            value={valueICAO}   
            onChange={onDropICAOChange} 
            descriptor='icao'
            characterLimit = {1}  
            //onKeyDown={deletingAirlineICAO}
            dropChanger={dropStatus}                                                
        />;
    }

    // Dropdown Operator Name
    if(airlineNameList != null)
    {
        dropOperatorName = <Dropdown
        prompt= 'Operator Name'            
        options={airlineNameList}              
        //value={valueOperatorName}   
        //onChange={onDropOperatorNameChange} 
        descriptor='airlineName' 
        characterLimit = {2}   
        //onKeyDown={deletingOperatorName}  
        dropChanger={dropStatus}                                            
        />;
    }
    // Dropdown Operator IATA
    if(airlineNameList != null)
    {
        dropOperatorIATA = <Dropdown
            prompt= 'Operator IATA'            
            options={airlineNameList}              
            //value={valueOperatorIATA}   
            //onChange={onDropOperatorIATAChange} 
            descriptor='iata'  
            characterLimit = {0} 
            //onKeyDown={deletingOperatorIATA}
            dropChanger={dropStatus}                                               
        />;
    }
    // Dropdown Operator ICAO
    // if(airlineNameList != null)
    // {
    //     dropOperatorICAO = <Dropdown
    //         prompt= 'Operator ICAO'            
    //         options={airlineNameList}              
    //         //value={valueOperatorICAO}   
    //         //onChange={onDropOperatorICAOChange} 
    //         descriptor='icao'
    //         characterLimit = {1} 
    //         onKeyDown ={deletingOperatorICAO} 
    //         dropChanger={dropStatus}                                                
    //     />;
    // }

    // Dropdown Aircraft Type Full
    if(aircraftTypeList != null)
    {
        dropAircraftTypeFull= <Dropdown
            prompt= 'Aircraft Type'            
            options={aircraftTypeList}              
            
            value={valueAircraftTypeFull}

            onChange={onDropAircraftTypeFullChange}//
            onDropSelected={onDropAircraftTypeFullSelected}//

            descriptor='aircraftType'
            characterLimit = {3}//bilo 2,minimum za prikazivanje options   
            onKeyDown={deletingAircraftType}
            dropChanger={dropStatus}                                             
        />;
    }

    // Dropdown Type Code
    if(typeCodeList != null)
    {

        dropTypeCode = <Dropdown
            prompt= 'Type Code'            
            
            options={typeCodeList}

            value={valueTypeCode} 
            
            onChange={onDropTypeCodeChange}//
            onDropSelected={onDropTypeCodeSelected}//

            descriptor='typeCode'
            characterLimit = {2}//bilo 1 
            onKeyDown = {deletingTypeCode}   
            dropChanger={dropStatus}                                       
        />;
    }
    //kao props za filter
    const aggrStatusInputConfig = {
        type:'text',
        placeholder:'Aggregation Status'
    }
    const aggrTextInputConfig = {
         type:'text',
         placeholder:'Aggregated Text',             
    }    

    const consensStatusInputConfig = {
        type:'text',
        placeholder:'Consensus Status'
    }   
    const consensResultInputConfig = {
        type:'text',
        placeholder:'Consensus Result'
    }   
    ////////////////////////

    const acarsMessageDateTimeMinInputConfig = {
        type:'datetime-local',
        placeholder:'From:'
    }
    const acarsMessageDateTimeMaxInputConfig = {
        type:'datetime-local',
        placeholder:'To:'
    }  
    const tailInputConfig = {
        type:'text',
        placeholder:'Tail'
    } 
    const flightInputConfig = {
        type:'text',
        placeholder:'Flight'
    } 
    const textInputConfig = {
        type:'text',
        placeholder:'Text'
    } 
    const modeInputConfig = {
        type:'text',
        placeholder:'Mode'
    } 
    const labelInputConfig = {
        type:'text',
        placeholder:'Label'
    }
    const blockIdInputConfig = {
        type:'text',
        placeholder:'Block ID'
    }  
    const msgnoIdInputConfig = {
        type:'text',
        placeholder:'Msgno'
    } 
    const dstaIdInputConfig = {
        type:'text',
        placeholder:'Destination Airport'
    }
    // const airlineInputConfig = {
    //     type:'text',
    //     placeholder:'Airline Name',        
    // }
    // const airlineIataInputConfig = {
    //     type:'text',
    //     placeholder:'Airline IATA',        
    // }
    // const airlineIcaoInputConfig = {
    //     type:'text',
    //     placeholder:'Airline ICAO',        
    // }
    // const operartorNameInputConfig = {
    //     type:'text',
    //     placeholder:'Operator Name',        
    // }
    // const operartorIataInputConfig = {
    //     type:'text',
    //     placeholder:'Operator IATA',        
    // }
    // const operartorIcaoInputConfig = {
    //     type:'text',
    //     placeholder:'Operator ICAO',        
    // }
    const aircraftTypeInputConfig = {
        type:'text',
        placeholder:'Aircraft Type',        
    }
    const serialNumberInputConfig = {
        type:'text',
        placeholder:'Serial Number'        
    }
    const typeCodeInputConfig = {//nije bilo ubaceno u search
        type:'text',
        placeholder:'Type Code',
        //disabled: disabled        
    }
    //const aggregatedTextInputConfig = {//!
    //     type:'text',
    //     placeholder:'Aggregated Text',
             
    // }      
    
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

      // /

    const changer=0;
    
   

    const onSerach = (e) =>{
            //parent metoda
        props.clickedSearch(acarsMessageDateTimeMin, acarsMessageDateTimeMax, 
            tail,  flight, text, mode, label, blockId, msgno,  dsta,  airlineName,  airlineIata,  airlineIcao,  
                                                                            //          //
            serialNumber, operatorName,  operatorIata,  operatorIcao,  aircraftType,  typeCode,
        
            aggrStatus,consensusStatus,      aggrText,consensusResult);
        
        setFilter('a');
        toggleDropdown();
        props.allChanger(changer);
        
    };

    const onReset =(e)=>{
        resetSearchHandler();
        setFilter('');
        toggleDropdown();
        dropChanger(changer);
    };
                   
    return (
        <div className={classes.container} > 
            {/* <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} onMouseLeave={(e)=> toggleDropdown()}> */}
            <DropdownButton title={title} className={classes.Drop} show={showDropdown} onToggle={(e) => open()} ref={wrapperRef}  onClick={(e)=> dropStatus==1 ? setDropStatus(0) : setDropStatus(1) }>
                <div className={classes.dropdownShow}>
                    <div className="row"> 
                        {/* 1. kolona */}
                        <div className={classes.bar}>          
                        <div className="col-sm-3" id="bar">                        
                            <div className={classes.card} >
                                <div className={classes.dateTime}>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span2}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend> 
                                                      
                                    <Input 
                                        value={acarsMessageDateTimeMin}
                                        // changed={(e)=>setAcarsMessageDateTimeMin(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>(setAcarsMessageDateTimeMin(e.target.value))}                                        
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
                                        value={acarsMessageDateTimeMax}
                                        // changed={(e)=>setAcarsMessageDateTimeMax(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setAcarsMessageDateTimeMax(e.target.value)}
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
                                        value={tail}                                        
                                        changed={(e)=>setTail(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {tailInputConfig}                                               
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={flight}
                                        // changed={(e)=>setFlight(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setFlight(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {flightInputConfig}                                               
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={text}
                                        // changed={(e)=>setText(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setText(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {textInputConfig}                                               
                                    />
                                </InputGroup>

                                {/*/////////////////////////////////*/}
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={aggrText}                                      
                                        changed={(e)=>setAggrText(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {aggrTextInputConfig}                                               
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={aggrStatus}       
                                                    //pri kucanju menjamo dinamicki                                 
                                        changed={(e)=>setAggrStatus(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {aggrStatusInputConfig}                                               
                                    />
                                </InputGroup>

                                {/*/////////////////////////////////*/}


                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={mode}
                                        // changed={(e)=>setStationId(e.target.value) & setFilter(e.target.value)}
                                        changed={(e)=>setMode(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {modeInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={label}                                        
                                        changed={(e)=>setLabel(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {labelInputConfig}                     
                                    />
                                </InputGroup>
                                                                                  
                                                                                                               
                            </div>
                            
                        </div>
                        </div>
                        {/* 2. column */}
                        <div className={classes.bar}>    
                        <div className="col-sm-3">                
                            <div className={classes.card}>   
                            <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={blockId}                                        
                                        changed={(e)=>setBlockId(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {blockIdInputConfig}                     
                                    />
                                </InputGroup>  
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={msgno}                                        
                                        changed={(e)=>setMsgno(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {msgnoIdInputConfig}                     
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={dsta}                                        
                                        changed={(e)=>setDsta(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {dstaIdInputConfig}                     
                                    />
                                </InputGroup>   


                                {/* <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={airlineName}                                        
                                        changed={(e)=>setAirlineName(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {airlineInputConfig}                                               
                                    />
                                    <div className={classes.dropDownList}>
                                        {dropAirlineName}
                                    </div>                           
                                </InputGroup>                                
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={airlineIata}                                        
                                        changed={(e)=>setAirlineIATA(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {airlineIataInputConfig}                                               
                                    />
                                    <div className={classes.dropDownList}>
                                        {dropAirlineIATA}
                                    </div>
                                </InputGroup>
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={airlineIcao}                                        
                                        changed={(e)=>setAirlineICAO(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {airlineIcaoInputConfig}                     
                                    />
                                    <div className={classes.dropDownList}>
                                        {dropAirlineICAO}
                                    </div>
                                </InputGroup>                               
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={operatorName}                                        
                                        changed={(e)=> setOperatorName(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {operartorNameInputConfig}                                                                                                               
                                    />
                                    <div className={classes.dropDownList}>
                                        {dropOperatorName}
                                    </div>
                                </InputGroup>                                */}
                                {/* <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input 
                                        value={operatorIata}                                        
                                        changed={(e)=>setOperatorIata(e.target.value)}          
                                        elementType='input' 
                                        elementConfig= {operartorIataInputConfig}                     
                                    />
                                    <div className={classes.dropDownList}>
                                        {dropOperatorIATA}
                                    </div>
                                </InputGroup>                                */}
                                {/* <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={operatorIcao}                                        
                                        changed={(e)=> setOperatorIcao(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {operartorIcaoInputConfig}                                                                                                               
                                    />
                                    <div className={classes.dropDownList}>
                                        {dropOperatorICAO}
                                    </div>
                                </InputGroup> */}
                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    
                                    {/*
                                     <Input
                                        value={aircraftType}                                        
                                        changed={(e)=> setAircraftType(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {aircraftTypeInputConfig}                                                                                                               
                                    /> 
                                    */}

                                    <div className={classes.dropDownList}>
                                        {dropAircraftTypeFull}{/*--*/}
                                    </div>
                                </InputGroup>


                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    
                                    {/*
                                    //nije potrebno jer smo povezali typeCode sa dropTypeCode(DropDown)
                                     <Input
                                        value={typeCode}//typeCode -> UI                                        
                                        changed={(e)=> setTypeCode(e.target.value)}//UI -> typeCode                                                                             
                                        elementType='input' 
                                        elementConfig= {typeCodeInputConfig}                                                                                                               
                                    /> 
                                    */}

                                    <div className={classes.dropDownList}>
                                        {dropTypeCode}{/*--*/}
                                    </div>
                                </InputGroup>


                                <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={serialNumber}                                        
                                        changed={(e)=> setSerialNumber(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {serialNumberInputConfig}                                                                                                               
                                    />
                                </InputGroup>

                                
                                {/*///////////////////////////////////////////////*/}
                         
                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={consensusStatus}                                      
                                        changed={(e)=>setConsensusStatus(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {consensStatusInputConfig}                                               
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3 input-group-sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={consensusResult}                                      
                                        changed={(e)=>setConsensusResult(e.target.value)}
                                        elementType='input' 
                                        elementConfig= {consensResultInputConfig}                                               
                                    />
                                </InputGroup>
                                {/*///////////////////////////////////////////////*/}



                                {/* <InputGroup className="mb-3 input-group-sm" size="sm">
                                    <InputGroup.Prepend className={classes.inputPrepend}>
                                        <InputGroup.Text className={classes.span}>
                                            <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                        </InputGroup.Text>                                
                                    </InputGroup.Prepend>                   
                                    <Input
                                        value={aggregatedText}                                        
                                        changed={(e)=> setAggregatedText(e.target.value)}                                                                             
                                        elementType='input' 
                                        elementConfig= {aggregatedTextInputConfig}                                                                                                           
                                    />
                                </InputGroup> */}
                                                                                            
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

export default SearchAcarsWithExtData;