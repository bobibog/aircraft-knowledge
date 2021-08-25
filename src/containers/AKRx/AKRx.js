import React, {useState, useEffect, useCallback, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
//import axios from '../../axios-local';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Table from '../../components/UI/Table/Table';
//import {akrxHeader} from '../../shared/staticData';
import CardsInBox from '../../components/UI/CardsInBox/CardsInBox';
import * as actions from '../../store/actions/index';
import SearchAKRxElement from '../../components/SearchElement/SearchAKRxElement/SearchAKRxElement';


const AKRx = props => {   
    
    const akrxPageHeader =
        <CardsInBox
            headerText="AKRx messages"
            backColor="#F0F8FF" 
            
        />;
    
    return (
        <React.Fragment>           
            {akrxPageHeader} 
            <SearchAKRxElement />                       
        </React.Fragment>        
    );
};

export default AKRx;