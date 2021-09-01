import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
import {akrxHeader} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';
import SearchAKRxElement from '../../components/SearchElement/SearchAKRxElement/SearchAKRxElement';


const AKRx = props => {   
    
    const akrxPageHeader =
        <CardsInBox
            headerText="AKRx messages"
            backColor="#F0F8FF" 
            
        />;

    let akrxTable = <Spinner />;
// if (!aircraft && !loading  ) {
//     aircraftsTable = <p style={{ textAlign: 'center' }}>Could not read aircraft from the server!</p>;
// }
// if (airline == '' || operators == '' || typeCode == '' || fullType == '' || registration == '' || serialNumber == '' || modeS == '' || minManufactureDate == '' || maxManufactureDate == '' || airlineAsc == '' || airlineDesc == '' || operatorsAsc == '' || operatorsDesc == '' || typeCodeAsc == '' || typeCodeDesc == '' || fullTypeAsc == '' || fullTypeDesc =='' || registrationAsc == '' || registrationDesc == '' || serialNumberAsc =='' || serialNumberDesc=='' || modeSAsc == '' || modeSDesc == '' || manufactureDateAsc == '' || manufactureDateDesc == '') {
//     aircraftsTable = <p style={{ textAlign: 'center', color:'white', marginTop:'65px', fontSize:'24px', background:'#007bff', borderRadius:'5px', marginLeft:'25px', marginRight:'25px' }}><u>↑ Please start your search ↑</u></p>;
// }
// if (aircraft && !loading ) {
    akrxTable = <Table 
        tableId="akrxTable"
        //data={aircraft}
        header={akrxHeader}
        // paramsRoute={{
        //     baseRoute: "/aircraft",
        //     params: ["aircraftId"],
        //     delimiter: "-"
        // }}
        // rowsPerPageDef={limit}
        // changeOffsetOrLimit={changeOffsetOrLimitHandler}
        // totalDataCount={aircraftCount}
        // setPageStore={setAircraftPageHandler}
        // currPage={page}  
                   
        />;        
    //}
    
    return (
        <React.Fragment>           
            {akrxPageHeader} 
            {/* <SearchAKRxElement />                        */}
            {akrxTable}
        </React.Fragment>        
    );
};

export default AKRx;