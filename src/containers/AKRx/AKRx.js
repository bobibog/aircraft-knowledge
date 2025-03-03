import React, {useState, useEffect, useCallback, useRef, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import axiosFirebase from '../../axios-firebase';
import axios from '../../axios-local';
//import axios from '../../axios-azure';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {akrxHeader} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';
import SearchAKRxElement from '../../components/SearchElement/SearchAKRxElement/SearchAKRxElement';
import {AuthContext} from '../../context/auth-context';

//import TableAKRx from '../../components/UI/Table/TableAKRx';
//import TableAKRx from '../../components/UI/Table/ReactTable/TableAKRx/TableAKisCompanyuseRxCustomSide';
import TableAKRx from '../../components/UI/Table/ReactTable/TableAKRx/TableAKRx';


//wraper za tabelu TableAKRx a i sam TableAKRx je wrapper za cist table html
const Akrx = props => {

    //////////////////////////////
    const authContext = useContext(AuthContext);
    const authCheckState = authContext.authenticationCheckState;    
    let isCompany = authContext.user.company;//
    //////////////////////////////

    //za referenciranje globalnog stanja(promenjljivih) iz redux store
    const acarsMessages = useSelector(state => {
        return state.acarsMessage.acarsMessages;
    });
    
    const acarsMessagesCount = useSelector(state => {
        return state.acarsMessage.acarsMessagesCount;
    });
    const loading = useSelector(state => {
        return state.acarsMessage.acarsMessagesLoading;
    });

    ////////////////////////////////////
    //reducers/acarsMessage iz initial state acarsMessagesOffset=0
    const offset = useSelector(state => {
        return state.acarsMessage.acarsMessagesOffset;
    });
    
    //reducers/acarsMessage iz initial state acarsMessagesLimit a iz staticData rowsPerPageDefault=10
    const limit = useSelector(state => {
        return state.acarsMessage.acarsMessagesLimit;
    });
    //////////////////////////////////////////

    const page = useSelector(state => {
        return state.acarsMessage.acarsMessagesPage;
    });   

    const [nowDateTime, setNowDateTime] = useState(new Date());
    const [twentyFourHoursAgoDateTime, setTwentyFourHoursAgoDateTime] = useState(new Date(Date.now() - 24 * 60 * 60 * 1000));

    useEffect(() => {
        // Update the state variables with the current and 24 hours before date and time
        const interval = setInterval(() => {
          setNowDateTime(new Date());
          setTwentyFourHoursAgoDateTime(new Date(Date.now() - 24 * 60 * 60 * 1000));
        }, 1000); // Update every second
    
        // Clean up interval on component unmount
        return () => clearInterval(interval);
      }, []);
    
      // Function to format date to yyyy-MM-dd HH:mm:ss format
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };


    const[timestampMin, setTimestampMin] = useState('');
    const[timestampMax, setTimestampMax] = useState('');
    const[stationId, setStationId] = useState('');
    const[channel, setChannel] = useState('');
    const[freqMin, setFreqMin] = useState('');
    const[freqMax, setFreqMax] = useState('');
    const[levelMin, setLevelMin] = useState('');
    const[levelMax, setLevelMax] = useState('');
    const[errorMin, setErrorMin] = useState('');
    const[errorMax, setErrorMax] = useState('');
    const[mode, setMode] = useState('');
    const[label, setLabel] = useState('');
    const[blockId, setBlockId] = useState('');
    const[ack, setAck] = useState('');
    const[tail, setTail] = useState('');
    const[flight, setFlight] = useState('');
    const[msgno, setMsgno] = useState('');
    const[text, setText] = useState('');
    const[end, setEnd] = useState('');
    const[acarsMessageDateTimeMin, setAcarsMessageDateTimeMin] = useState(formatDate(twentyFourHoursAgoDateTime));
    const[acarsMessageDateTimeMax, setAcarsMessageDateTimeMax] = useState(formatDate(nowDateTime));    
    const[altMin, setAltMin]=useState('');
    const[altMax, setAltMax]=useState('');
    const[dsta, setDsta]=useState('');
    const[icao, setIcao]=useState('');
    const[isOnground, setIsOnground]=useState('');
    const[isResponse, setIsResponse]=useState('');
    const[latMin, setLatMin]=useState('');
    const[latMax, setLatMax]=useState('');
    const[lonMin, setLonMin]=useState('');
    const[lonMax, setLonMax]=useState('');    
    const[toAddr, setToAddr]=useState('');
    const[type, setType]=useState('');

        //nije kolona vec flag
    const[company, setCompany] = useState(isCompany);


    const[refresh, setRefresh] = useState(0);
               
    // const [, updateState] = useState();
    // const forceUpdate = useCallback(() => updateState({}), []);



    //window.location.reload(false);

    //za menjanje globalnog stanja iz redux store tako sto mu prosledjujemo wraper funkciju koja vraca objekat akcije     
    const dispatch = useDispatch();
    
    //cak iako se rerenderuje parent zbog promene to ne znaci da ce se rerenderovati njegov child osim ako se prosledjeni prop promenio(bar 1) 
    //ako se menja state1 onda se trigeruje rerender a state1 se menja referenca na novi objekat nakon rerender ali state2 nece menjati referencu pri ponovnom rerender jer se nije menjao
    //ako se menjaju obicne promenjljive to ne utice na rerender
    //komponenta se u celosti rerenderuje samo ako se promeni state podatak(promenjljiva ili funkcija) a pri rerender obicne promenjljive se ponovo kreiraju i samo promenjene iz state 
    //mozemo watchovati funkciju ili promenjljivu a u oba slucaja je po referenci, a promena znaci promena reference pri ponovnom kreiranju ili dinamickom menjaju reference
    //za rerender komponente je bitna promena vrednosti samo ako je deo njenog state a za rerender childa je bitna promena u vrednosti nezavisno da li je deo parent state jer se prosledjuje dinamicki i posmatra kao  neki state
    //u prenesenom znacenju ako je promenjen props koji je parent state onda ce se desiti oba rerendera, a ako se promeni props koji nije deo parent state onda ce se desiti samo child rerender

    //useMemo je kesiranje za promenjljive a useCallback za funkcije da se pri rerender ne kreiraju ponovo(menja referenca)
    {/*--*/}
    const onFetchAkrx = useCallback(

        //funkcija za kesiranje koja se fakticki poziva sa onFetchAkrx()
                                        //celokupne kolone tabele koje su zapravo samo filter kolone sa backend
                                        //offset i limit nisu deo kolona ali mogu biti prosledjeni kao parametri rute

            /////////////////////////////////////////////////////////////////////////////////
            //!!!
            //postoje privatne kolone koje su uvek null i uvek se vracaju nezavisno da li se filtrira po njima ili ne ili se filtrira po drugima odnosno ne znamo da li su filtrirajuce jer su uvek null(mozda su privatne,mozda nemaju vrednost ali svakako mora ako su filtrirajuce da se vrati [] pri nepostojecoj vrednosti)
            //postoje nefilter kolone npr error za koje zasigurno ne utice filter i uvek se vraca
            //postoje filter kolone koje uticu na njihovu promenu na backend i pri ne postojanju vracaju [] a nefilter pri nepostojanju ne vracaju [] vec su uvek null, a samo je pitanje za filter kolone da li ako nam ne trebaju ih saljemo sa '' ili ih uopste ne saljemo odnosno ako je channel === bez slanja channel onda mozemo da je ne saljemo
            //svakako se vrsi filtriranje na backend na kome postoje filter,nefilter,privatne kolone,null kolone
            //takodje vracaju se sve kolone u objektu pri bilo kom query tako da za query radimo samo po filter kolonama jer za nefilter kolonu ne moramo slati nista i vratice se a za filter samo ako je channel= === bez slanja channel onda mozemo da je ne saljemo
            //svaka kolona na frontu se mora proveriti da li je filter ili ne
            //samo podskup filter kolona je u search a u tabeli ne moraju biti samo filter kolone
            /////////////////////////////////////////////////////////////////////////////////

            //U OVOJ FUNKCIJI SU SAMO KOLONE KOJE MOZE DA FILTRIRA BACKEND!!!(jer se nefilter i private svakako vracaju) ali nece sve filter kolone biti iskoriscene na frontu za filter(search) vec samo njihov podskup a taj podskup je u watch, a za ostale po kojima ne searchujemo saljemo ''(ili ih ni ne saljemo)
                                             //            //
        () => dispatch(actions.fetchAkrx    (offset,        limit,          timestampMin, timestampMax,
            stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
            flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, altMin, altMax, dsta, icao,
            isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, toAddr, type, company,//company ne postoji(zakomentarisano) u search a ovde postoji u onFetchAkrx sto znaci da se koristi za tabelu ali ne i za filter ali se ranije koristilo i za filter
            ))
          
        //watch svih promenjljivih i dispatch funkcije a koristimo ih u funkciji koju kesiramo sto znaci da ce se opet rekreirati funkcija koju kesiramo 
        //posto kesiramo celu funkciju ne znaci nam nista sto su ovi parametri deo state jer su zbog kesiranja fakticki predefinisani odnosno selectivan rerender
        //samo kolone koje mogu biti search parametri odnosno koje su u SearchAKRxElement
        
                                //      //
        , [dispatch,            offset, limit,          timestampMin, timestampMax,
            stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
            flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, altMin, altMax, dsta, icao,
            isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, toAddr, type, company,//ovde nam ni ne treba company jer ne postoji u SearchAKRxElement
        ]
    );    
    
    const onSetAkrxOffsetLimit = (offset, limit) => dispatch(actions.setAkrxOffsetLimit(offset, limit));//istovremeno ih setujemo

    const onSetAkrxPage = (page) => dispatch(actions.setAkrxPage(page));    
     

    ///////////////////////////////////
    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAkrxOffsetLimit(tableOffset, tableLimit);   
    };
    ///////////////////////////////////

    const setAkrxPageHandler = page => {                
        onSetAkrxPage(page);
    };    
       
    // FILTERING/SEARCHING
    const submitSearchHandler = (timestampMin, timestampMax,
        stationId, channel, freqMin, freqMax, levelMin, levelMax, errorMin, errorMax, mode, label, blockId, ack, tail,
        flight, msgno, text, end, acarsMessageDateTimeMin, acarsMessageDateTimeMax, altMin, altMax, dsta, icao,
        isOnground, isResponse, latMin, latMax,  lonMin,  lonMax, toAddr, type, 
        company) => {//company parametar se ni ne prosledjuje iz child jer je zakomentarisan odnosno ne postoji
        

        //bilo je da ostaje limit=10 odnosno ukljucivanje
        onSetAkrxOffsetLimit(0, limit);//deo 1) i 2)
        
                            //tek pri search ga menjamo odnosno predefinisemo
        //onSetAkrxOffsetLimit(0, 10);//ukljucujemo limit deo 3)

        onSetAkrxPage(0);
        setTimestampMin(timestampMin);
        setTimestampMax(timestampMax);
        setStationId(stationId);
        setChannel(channel);
        setFreqMin(freqMin);
        setFreqMax(freqMax);
        setLevelMin(levelMin);
        setLevelMax(levelMax);
        setErrorMin(errorMin);
        setErrorMax(errorMax);
        setMode(mode);
        setLabel(label);
        setBlockId(blockId);
        setAck(ack);
        setTail(tail);
        setFlight(flight);
        setMsgno(msgno);
        setText(text);
        setEnd(end);
        setAcarsMessageDateTimeMin(acarsMessageDateTimeMin ? acarsMessageDateTimeMin : formatDate(twentyFourHoursAgoDateTime));
        setAcarsMessageDateTimeMax(acarsMessageDateTimeMax ? acarsMessageDateTimeMax : formatDate(nowDateTime));       
        setAltMin(altMin);
        setAltMax(altMax);
        setDsta(dsta);
        setIcao(icao);
        setIsOnground(isOnground);
        setIsResponse(isResponse);
        setLatMin(latMin);
        setLatMax(latMax);
        setLonMin(lonMin);
        setLonMax(lonMax);        
        setToAddr(toAddr);
        setType(type);
        //setCompany(company);//zakomentarisan u search a i ovde iako postoji kao kolona

    };
    
 
    const resetSearchHandler = () => {
        

        //bilo ukljucivan u resetSearchHandler gde je trebalo da se iskljucuje
        onSetAkrxOffsetLimit(0, 10);//deo 1) i 2)
        
        //inicijalizujemo se offset i limit ponovo pri resetovanju filtera za prikaz pocetnih podataka tabele
        //onSetAkrxOffsetLimit(0, "-1");//iskljucen na "-1"(deo 3)

        onSetAkrxPage(0);
        
        setTimestampMin("");
        setTimestampMax("");
        setStationId("");
        setChannel("");
        setFreqMin("");
        setFreqMax("");
        setLevelMin("");
        setLevelMax("");
        setErrorMin("");
        setErrorMax("");
        setMode("");
        setLabel("");
        setBlockId("");
        setAck("");
        setTail("");
        setFlight("");
        setMsgno("");
        setText("");
        setEnd("");
        setAcarsMessageDateTimeMin(formatDate(twentyFourHoursAgoDateTime));
        setAcarsMessageDateTimeMax(formatDate(nowDateTime));       
        setAltMin("");
        setAltMax("");
        setDsta("");
        setIcao("");
        setIsOnground("");
        setIsResponse("");
        setLatMin("");
        setLatMax("");
        setLonMin("");
        setLonMax("");        
        setToAddr("");
        setType("");    
        setAllOption(0);    
    };    

    
       
    //flow je promeni se watch parametar iz useCallBack je kada se promeni u child(search) onda se i u parent promene te kolone pa se rekreira useCallBack(onFetchAkrx) metoda pa se zbog watcha nad onFetchAkrx u useEffect pozove onFetchAkrx
    //sto znaci da se onFetchAkrx zove inicijalno pri mountu i pri svakoj promeni kolona koje su u SearchAKRxElement sto znaci da u onFetchAkrx moramo imati sve kolone(i search i ne search)
    useEffect(() => { 
        onFetchAkrx();
        authCheckState();//
        
        setCompany(isCompany ? isCompany : '');//
        
                //
        const timeOut = setTimeout(()=>{
            setRefresh(1);       
        }, 2500);    
        
        /////////
        return () => {
            clearTimeout(timeOut);//uklanjamo da ne dodje do memory leaka pri unmount
        };
        ///////////
        
    }, [onFetchAkrx,authCheckState, setCompany, refresh]);     
    

    const akrxPageHeader =
        <CardsInBox
            // headerText="ACARS Messages"
            backColor="#F0F8FF" 
            
        />; 
        
    const[allOption, setAllOption]=useState(0);

                           //iz child inicijalno changer=0
    function allChanger(allOption){
        if(allOption==0){
            setAllOption(1);
        return allOption; 
        }
               
    };
    
    //console.log(acarsMessages);
      
    //zapamcen react element(za virtuelni dom) za slucaj njegovog ponavljanja ili dinamickog menjanja ili kondicionog renderovanja sa drugim elementom
    //ovde nam sluzi kao defaultni render za tabelu koji cemo menjati
    let akrxTable = <Spinner />;
    if (!acarsMessages && !loading  ) {
        akrxTable = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read AKRX messages from the server!</p>;
    }
    
    if (acarsMessages && !loading ) {

        console.log(acarsMessages)//[]

        // akrxTable = <TableAKRx 
        //     data={acarsMessages}
        //     header={akrxHeader}            
        //     rowsPerPageDef={limit}
        //     changeOffsetOrLimit={changeOffsetOrLimitHandler}
        //     totalDataCount={acarsMessagesCount}
        //     setPageStore={setAkrxPageHandler}
        //     currPage={page}                      
        // /> ;  

        {/*--*/}
        akrxTable =  <TableAKRx
            
            data={acarsMessages}//

            rowsPerPageDef={limit}            
            totalDataCount={acarsMessagesCount}
            currPage={page}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            setPageStore={setAkrxPageHandler}   
            allOption={allOption}                     
        />;
        
    }      
    
    return (
        <div style={{marginTop:'-2px'}}>                       
            
            
            {akrxPageHeader}             
            
            {/*--*/}
            {/*zapravo filter*/}
            <SearchAKRxElement
                clickedSearch={submitSearchHandler}                               
                clickedReset={resetSearchHandler} 
                allChanger={allChanger}                     
            />  
                                             
            {akrxTable}                       
        </div>        
    );
};

export default withErrorHandler(Akrx, axios);