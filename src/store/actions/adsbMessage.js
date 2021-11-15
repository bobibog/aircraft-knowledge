import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
import {moment} from 'moment';

export const setAdsbOffsetLimit = (offset, limit) => {
    return {
        type: actionTypes.SET_ADSB_OFFSET_LIMIT,
        offset: offset,
        limit: limit
    }
};

export const setAdsbPage = (page) => {
    return {
        type: actionTypes.SET_ADSB_PAGE,
        page: page
    }
};

export const fetchAdsbSuccess = (adsbMessages, adsbMessagesCount) => {
    return {
        type: actionTypes.FETCH_ADSB_SUCCESS,
        adsbMessages: adsbMessages,
        adsbMessagesCount: adsbMessagesCount
    }
};

export const fetchAdsbFail = (error) => {
    return {
        type: actionTypes.FETCH_ADSB_FAIL,
        error: error
    }
};

export const fetchAdsbStart = () => {
    return {
        type: actionTypes.FETCH_ADSB_START
    }
};




export const fetchAdsb = (offset, limit, address,
    addressType, aircraftType, airspeedMin, airspeedMax, airspeedStatus,
    altInfo, altUnit, altitudeMin, altitudeMax, bds2Identification,
     capability, cc, commBBds, commBMb, controlField, dr, emergencyState,
    error, esSub, esType, ewStatus, ewVelocity, fFlag,
    flightStatus, haeBaro, heading, headingStatus, icao, identification,
    iid, latMin, latMax, levelMin, levelMax,
    lonMin, lonMax, modeA, modeAIdent, modeC, msgType, nacp, nsStatus, nsVelocity,
    nucp, posDecoding, report, sl, squawk, stationId, tFlag,
     timestampMin, timestampMax, type, um, verticalRateMin,
    verticalRateMax, verticalRateSrc, verticalStatus, vs,
    acarsMessageDateTimeMin, acarsMessageDateTimeMax) => {
    return dispatch => {
        dispatch(fetchAdsbStart());                      
                  
        const query = new URLSearchParams(); 
        query.append('address', address);
        query.append('addressType', addressType);
        query.append('aircraftType', aircraftType);
        query.append('airspeedMin', airspeedMin);
        query.append('airspeedMax', airspeedMax);
        query.append('airspeedStatus', airspeedStatus);
        query.append('altInfo', altInfo);
        query.append('altUnit', altUnit);
        query.append('altitudeMin', altitudeMin);
        query.append('altitudeMax', altitudeMax);
        query.append('bds2Identification', bds2Identification);
        query.append('capability', capability);
        query.append('cc', cc);
        query.append('commBBds',commBBds);
        query.append('commBMb',commBMb);
        query.append('controlField',controlField);
        query.append('dr',dr);
        query.append('emergencyState',emergencyState);
        query.append('error',error);
        query.append('esSub',esSub);
        query.append('esType',esType);
        query.append('ewStatus',ewStatus);
        query.append('ewVelocity',ewVelocity);
        query.append('fFlag',fFlag);
        query.append('flightStatus',flightStatus);
        query.append('haeBaro',haeBaro);
        query.append('heading',heading);
        query.append('headingStatus',headingStatus);
        query.append('icao',icao);
        query.append('identification',identification);
        query.append('iid',iid);
        query.append('latMin', latMin);
        query.append('latMax', latMax);
        query.append('levelMin', levelMin);
        query.append('levelMax', levelMax);
        query.append('lonMin',lonMin);
        query.append('lonMax', lonMax);
        query.append('modeA', modeA);
        query.append('modeAIdent', modeAIdent);
        query.append('modeC', modeC);
        query.append('msgType', msgType);
        query.append('nacp', nacp);
        query.append('nsStatus', nsStatus);
        query.append('nsVelocity', nsVelocity);
        query.append('nucp', nucp);
        query.append('posDecoding', posDecoding);
        query.append('report', report);
        query.append('sl', sl);
        query.append('squawk', squawk);
        query.append('stationId', stationId);
        query.append('tFlag', tFlag);                
        query.append('timestampMin', timestampMin);
        query.append('timestampMax', timestampMax); 
        query.append('type',type);              
        query.append('um', um);
        query.append('verticalRateMin', verticalRateMin);
        query.append('verticalRateMax', verticalRateMax);
        query.append('verticalRateSrc', verticalRateSrc);       
        query.append('verticalStatus', verticalStatus);
        query.append('vs', vs);       
        query.append('acarsMessageDateTimeMin', acarsMessageDateTimeMin);
        query.append('acarsMessageDateTimeMax', acarsMessageDateTimeMax);        
        query.append('offset', offset);
        query.append('limit', limit);     

        let queryString = limit !== "-1"            
            ? query
            : '';
            
        let url = '/AcarsMessage/adsb?'
            
        axios.get(url+ queryString)
            .then(response => {                
                dispatch(fetchAdsbSuccess(response.data['adsbMessages'], response.data['adsbMessagesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAdsbFail(error));                                
            }    
        );        
    }
};

