import React, {useState, useEffect, useCallback} from 'react';
//import Hidden from '@material-ui/core/Hidden';
import {useSelector, useDispatch} from 'react-redux';

//import axiosFirebase from '../../axios-firebase';
import axios from '../../axios-local';
//import axios from '../../axios-azure';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
//import Airline from '../../components/Airline/Airline';
import Table from '../../components/UI/Table/Table';
import {airlineHeader} from '../../shared/staticData';
import {rowsPerPageDefault} from '../../shared/staticData';
//import {airlinesInit} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';

const Airlines = props => {
    const airlines = useSelector(state => {
        return state.airline.airlines;
    });
    const airlinesCount = useSelector(state => {
        return state.airline.airlinesCount;
    });
    const loading = useSelector(state => {
        return state.airline.airlinesLoading;
    });
    const offset = useSelector(state => {
        return state.airline.airlinesOffset;
    });
    const limit = useSelector(state => {
        return state.airline.airlinesLimit;
    });
    const page = useSelector(state => {
        return state.airline.airlinesPage;
    });

    const dispatch = useDispatch();

    const onFetchAirlines = useCallback(() => dispatch(actions.fetchAirlines(offset, limit)), [dispatch, offset, limit]);
    const onSetAirlinesOffsetLimit = (offset, limit) => dispatch(actions.setAirlinesOffsetLimit(offset, limit));
    const onSetAirlinesPage = (page) => dispatch(actions.setAirlinesPage(page));

    //const [airlines, setAirlines] = useState(null);
    //const [airlinesCount, setAirlinesCount] = useState(null);
    //const [loading, setLoading] = useState(false);
    // const [dataWindow, setDataWindow] = useState({
    //     offset: 0,
    //     limit: rowsPerPageDefault
    // });

    // const airlinesInitHandler = () => {
    //     //setAirlines(airlinesInit);
    //     for (let airline of airlinesInit) {
    //         axiosFirebase.post('/airlines.json', airline)
    //             .then(response => console.log('Odgovor je: ' + response))
    //             .catch(error => console.log('Greska je: ' + error));
    //     }        
    // };

    const changeOffsetOrLimitHandler = (tableOffset, tableLimit) => {        
        onSetAirlinesOffsetLimit(tableOffset, tableLimit);     
    }

    const setAirlinesPageHandler = page => {
        onSetAirlinesPage(page);
    }
    
    //console.log(props);
    useEffect(() => { 
        onFetchAirlines();       
        // setLoading(true);
        // axios.get('/airline' + '?' + 'offset=' + dataWindow.offset + '&' + 'limit=' + dataWindow.limit)
        //     .then(response => {
        //         // let airlinesList = response.data['airlines'];
        //         // let airlinesCount = response.data['airlinesCount'];
        //         setAirlines(response.data['airlines']);
        //         setAirlinesCount(response.data['airlinesCount']);
        //         // setAirlines(fetchedAirlines);

        //         setLoading(false); 
        //     })
        //     .catch(error => {
        //         setLoading(false);
        //         //console.log('Greska je: ' + error);                
        //     }
        // );
    }, [onFetchAirlines]);

    const airlinesPageHeader =
        <CardsInBox
            headerText="Airlines"
            backColor="#ffebee" />;


    //let airlinesDataRows = null;
    let airlinesTable = <Spinner />;
    if (!airlines && !loading) {
        airlinesTable = null;
    }
    if (airlines && !loading) {
        airlinesTable = <Table 
            data={airlines}
            header={airlineHeader}
            paramsRoute={{
                baseRoute: "/aircraft",
                params: ["airlineId"],
                delimiter: "-"
            }}
            rowsPerPageDef={limit}
            changeOffsetOrLimit={changeOffsetOrLimitHandler}
            totalDataCount={airlinesCount}
            setAirlinesPage={setAirlinesPageHandler}
            currPage={page} />;        
    };    

    // const hideCell = (index) => {
    //     let result = {};
    //     if (index > 11) {
    //         result = {xlDown: true};
    //     } else if (index > 5 && index <= 11) {
    //         result = {lgDown: true};
    //     } else if (index > 3 && index <= 5) {
    //         result = {mdDown: true};
    //     } else if (index === 3) {
    //         result = {smDown: true};
    //     } else if (index > 0 && index <= 2) {
    //         result = {xsDown: true};
    //     }
    //     return result;
    // };
    
    return (
        <React.Fragment>
            {/* <h2>Airlines</h2> */}
            {airlinesPageHeader}
            {airlinesTable}
            {/* <Hidden {...hideCell(12)}>
                <button onClick={airlinesInitHandler}>Airlines Init</button>
            </Hidden>  */}
        </React.Fragment>        
    );
};

export default withErrorHandler(Airlines, axios);