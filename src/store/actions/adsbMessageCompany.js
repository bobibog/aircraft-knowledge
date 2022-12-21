import * as actionTypes from './actionTypes';
import axios from '../../axios-azure';
import {generatePath} from 'react-router';
import {moment} from 'moment';

export const setAdsbOffsetLimitCompany = (offset, limit) => {
    return {
        type: actionTypes.SET_ADSB_OFFSET_LIMIT_COMPANY,
        offset: offset,
        limit: limit
    }
};

export const setAdsbPageCompany = (page) => {
    return {
        type: actionTypes.SET_ADSB_PAGE_COMPANY,
        page: page
    }
};

export const fetchAdsbSuccessCompany = (adsbMessages, adsbMessagesCount) => {
    return {
        type: actionTypes.FETCH_ADSB_SUCCESS_COMPANY,
        adsbMessages: adsbMessages,
        adsbMessagesCount: adsbMessagesCount
    }
};

export const fetchAdsbFailCompany = (error) => {
    return {
        type: actionTypes.FETCH_ADSB_FAIL_COMPANY,
        error: error
    }
};

export const fetchAdsbStartCompany = () => {
    return {
        type: actionTypes.FETCH_ADSB_START_COMPANY
    }
};




export const fetchAdsbCompany = (offset, limit, address, address2,
    addressType, addressType2, aircraftType, aircraftType2,  airspeedMin, airspeedMax,
     airspeed2,  airspeedStatus,  airspeedStatus2,  altInfo, altInfo2,  altUnit,  altUnit2,
     altitudeMin,  altitudeMax, altitude2, bds2Identification, bds2Identification2, capability,
    capability2, cc, cc2, commBMb, commBMb2, controlField, controlField2, dr, dr2,
    emergencyState, emergencyState2, error, error2, esSub, esSub2, esType, esType2,
    ewStatus, ewStatus2, ewVelocity, ewVelocity2, fFlag, fFlag2, flightStatus, flightStatus2,
    haeBaro, haeBaro2, heading,heading2, headingStatus, headingStatus2, icao, icao2,
    identification, identification2, iid, iid2,  latMin, latMax, lat2, levelMin,
    levelMax, level2, lonMin,  lonMax,  lon2, msgType, msgType2, nacp, nacp2,
    nsStatus, nsStatus2, nsVelocity, nsVelocity2, nucp, nucp2, posDecoding,  posDecoding2,
    report, report2, sl, sl2,  squawk, squawk2, stationId, stationId2, tFlag, tFlag2,
    timestampMin, timestampMax, timestamp2, type, type2, um, um2, verticalRateMin,
    verticalRateMax, verticalRate2, verticalRateSrc, verticalRateSrc2, verticalStatus, verticalStatus2, vs, vs2,
    acarsMessageDateTimeMin, acarsMessageDateTimeMax, commBBds, commBBds2,
    modeA, modeA2,  modeAIdent, modeAIdent2, modeC, modeC2, company) => {
    return dispatch => {
        dispatch(fetchAdsbStartCompany());                      
                  
        const query = new URLSearchParams(); 
        query.append('address', address);
        query.append('address2', address2);
        query.append('addressType', addressType);
        query.append('addressType2', addressType2);
        query.append('aircraftType', aircraftType);
        query.append('aircraftType2', aircraftType2);
        query.append('airspeedMin', airspeedMin);
        query.append('airspeedMax', airspeedMax);
        query.append('airspeed2', airspeed2);
        query.append('airspeedStatus', airspeedStatus);
        query.append('airspeedStatus2', airspeedStatus2);
        query.append('altInfo', altInfo);
        query.append('altInfo2', altInfo2);
        query.append('altUnit', altUnit);
        query.append('altUnit2', altUnit2);
        query.append('altitudeMin', altitudeMin);
        query.append('altitudeMax', altitudeMax);
        query.append('altitude2', altitude2);
        query.append('bds2Identification', bds2Identification);
        query.append('bds2Identification2', bds2Identification2);
        query.append('capability', capability);
        query.append('capability2', capability2);
        query.append('cc', cc);
        query.append('cc2', cc2);
        query.append('commBBds',commBBds);
        query.append('commBBds2',commBBds2);
        query.append('commBMb',commBMb);
        query.append('commBMb2',commBMb2);
        query.append('controlField',controlField);
        query.append('controlField2',controlField2);
        query.append('dr',dr);
        query.append('dr2',dr2);
        query.append('emergencyState',emergencyState);
        query.append('emergencyState2',emergencyState2);
        query.append('error',error);
        query.append('error2',error2);
        query.append('esSub',esSub);
        query.append('esSub2',esSub2);
        query.append('esType',esType);
        query.append('esType2',esType2);
        query.append('ewStatus',ewStatus);
        query.append('ewStatus2',ewStatus2);
        query.append('ewVelocity',ewVelocity);
        query.append('ewVelocity2',ewVelocity2);
        query.append('fFlag',fFlag);
        query.append('fFlag2',fFlag2);
        query.append('flightStatus',flightStatus);
        query.append('flightStatus2',flightStatus2);
        query.append('haeBaro',haeBaro);
        query.append('haeBaro2',haeBaro2);
        query.append('heading',heading);
        query.append('heading2',heading2);
        query.append('headingStatus',headingStatus);
        query.append('headingStatus2',headingStatus2);
        query.append('icao',icao);
        query.append('icao2',icao2);
        query.append('identification',identification);
        query.append('identification2',identification2);
        query.append('iid',iid);
        query.append('iid2',iid2);
        query.append('latMin', latMin);
        query.append('latMax', latMax);
        query.append('lat2', lat2);
        query.append('levelMin', levelMin);
        query.append('levelMax', levelMax);
        query.append('level2', level2);
        query.append('lonMin',lonMin);
        query.append('lonMax', lonMax);
        query.append('lon2', lon2);
        query.append('modeA', modeA);
        query.append('modeA2', modeA2);
        query.append('modeAIdent', modeAIdent);
        query.append('modeAIdent2', modeAIdent2);
        query.append('modeC', modeC);
        query.append('modeC2', modeC2);
        query.append('msgType', msgType);
        query.append('msgType2', msgType2);
        query.append('nacp', nacp);
        query.append('nacp2', nacp2);
        query.append('nsStatus', nsStatus);
        query.append('nsStatus2', nsStatus2);
        query.append('nsVelocity', nsVelocity);
        query.append('nsVelocity2', nsVelocity2);
        query.append('nucp', nucp);
        query.append('nucp2', nucp2);
        query.append('posDecoding', posDecoding);
        query.append('posDecoding2', posDecoding2);
        query.append('report', report);
        query.append('report2', report2);
        query.append('sl', sl);
        query.append('sl2', sl2);
        query.append('squawk', squawk);
        query.append('squawk2', squawk2);
        query.append('stationId', stationId);
        query.append('stationId2', stationId2);
        query.append('tFlag', tFlag);  
        query.append('tFlag2', tFlag2);                
        query.append('timestampMin', timestampMin);
        query.append('timestampMax', timestampMax); 
        query.append('timestamp2', timestamp2); 
        query.append('type',type); 
        query.append('type2',type2);              
        query.append('um', um);
        query.append('um2', um2);
        query.append('verticalRateMin', verticalRateMin);
        query.append('verticalRateMax', verticalRateMax);
        query.append('verticalRate2', verticalRate2);
        query.append('verticalRateSrc', verticalRateSrc);
        query.append('verticalRateSrc2', verticalRateSrc2);       
        query.append('verticalStatus', verticalStatus);
        query.append('verticalStatus2', verticalStatus2);
        query.append('vs', vs);     
        query.append('vs2', vs2);       
        query.append('acarsMessageDateTimeMin', acarsMessageDateTimeMin);
        query.append('acarsMessageDateTimeMax', acarsMessageDateTimeMax);        
        query.append('company', company);
        query.append('offset', offset);
        query.append('limit', limit);     

        let queryString = limit !== "-1"            
            ? query
            : '';
            
        let url = '/AcarsMessage/adsbCompany?'
            
        axios.get(url+ queryString)
            .then(response => {                
                dispatch(fetchAdsbSuccessCompany(response.data['adsbMessages'], response.data['adsbMessagesCount']))                 
            })
            .catch(error => {
                dispatch(fetchAdsbFailCompany(error));                                
            }    
        );        
    }
};

