import React from 'react';
import {Link} from 'react-router-dom';
import classesCss from '../components/UI/Table/CustomDataTableRow/CustomDataTableRow.module.css'

export const updateObject = (oldObject, updatedProperties) => {
    return {//vraca azuriran state objekat
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = ( value, rules ) => {
    let isValid = true;
    if ( !rules ) {
        return true;
    }

    if ( rules.required ) {
        isValid = value.trim() !== '' && isValid;
    }

    if ( rules.minLength ) {
        isValid = value.length >= rules.minLength && isValid
    }

    if ( rules.maxLength ) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }

    return isValid;
};


export const getApiModelPropValue = (rowData, apiModelHeaderColumn) => {
    //const propList = apiModelHeaderColumn.prop.trim().split('.');
    // let apiModelPropValue = rowData;
    // for (const modelProp of propList) {
    //     apiModelPropValue = apiModelPropValue[modelProp];
    // }
    let dataCellContent = "-";
    let toLinkRoute = null;
    let toLinkRouteBase = null;
    let toLinkRouteParam = null;

    if (rowData[apiModelHeaderColumn.prop]) {
        if (apiModelHeaderColumn.linkRoute) {
            toLinkRouteBase = apiModelHeaderColumn.linkRoute[0];
            toLinkRouteParam = rowData[apiModelHeaderColumn.linkRoute[1]];
            toLinkRoute = toLinkRouteBase + "/" + toLinkRouteParam;
        }          
        
        if (apiModelHeaderColumn.type) {
            if (apiModelHeaderColumn.type.indexOf("Header") !== -1) {
                //const nameOfType = apiModelHeaderColumn.type.trim().split("Header")[0]; 
                let dataCellContentFirstPart = '';
                let dataCellContentSecondPart = '';
                let dataCellContentThirdPart = '';
                let dataCellContentFourthPart = '';
                let dataCellContentFifthPart = '';
                let dataCellContentSixthPart = '';
                if (apiModelHeaderColumn.dataCellCreator) {
                    if (apiModelHeaderColumn.dataCellCreator[0]) {
                        dataCellContentFirstPart = rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[0]]
                        ? rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[0]]
                        : '—';
                    }
                    if (apiModelHeaderColumn.dataCellCreator[1]) {
                        dataCellContentSecondPart = apiModelHeaderColumn.dataCellCreator[1];
                    }
                    if (apiModelHeaderColumn.dataCellCreator[2]) {
                        dataCellContentThirdPart = rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[2]]
                        ? rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[2]]
                        : '—';
                    }
                    if (apiModelHeaderColumn.dataCellCreator[3]) {
                        dataCellContentFourthPart = apiModelHeaderColumn.dataCellCreator[3];
                    }
                    if (apiModelHeaderColumn.dataCellCreator[4]) {
                        dataCellContentFifthPart = rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[4]]
                        ? rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[4]]
                        : '—';
                    }
                    if (apiModelHeaderColumn.dataCellCreator[5]) {
                        dataCellContentSixthPart = apiModelHeaderColumn.dataCellCreator[5];
                    }
                    
                    dataCellContent = dataCellContentFirstPart + dataCellContentSecondPart
                        + dataCellContentThirdPart + dataCellContentFourthPart
                        + dataCellContentFifthPart + dataCellContentSixthPart;  
                }         
                /* let dataCellContentFirstPart = null;
                let dataCellContentSecondPart = null;
                let dataCellContentThirdPart = null;
                if (apiModelHeaderColumn.dataCellCreator) {
                    if (apiModelHeaderColumn.dataCellCreator[0]) {
                        dataCellContentFirstPart = rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[0]];
                    }
                    if (apiModelHeaderColumn.dataCellCreator[2]) {
                        dataCellContentSecondPart = rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[2]];
                    }
                    if (apiModelHeaderColumn.dataCellCreator[4]) {
                        dataCellContentThirdPart = rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[4]];
                    }
                    if (!dataCellContentSecondPart) {
                        dataCellContent = dataCellContentFirstPart;
                    } else {
                        dataCellContent = dataCellContentFirstPart + apiModelHeaderColumn.dataCellCreator[1]
                            + dataCellContentSecondPart + apiModelHeaderColumn.dataCellCreator[3]
                            + dataCellContentThirdPart + apiModelHeaderColumn.dataCellCreator[5];
                    }                
                } */
                if(apiModelHeaderColumn.linkRoute) {
                    toLinkRouteBase = apiModelHeaderColumn.linkRoute[0];
                    toLinkRouteParam = rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.linkRoute[1]];
                    toLinkRoute = toLinkRouteBase + "/" + toLinkRouteParam;           
                } 
            } else {
                let apiModelPropValue = rowData[apiModelHeaderColumn.prop];
                if (apiModelPropValue) {
                    if (apiModelHeaderColumn.type === "datetime") {
                        let d = new Date(apiModelPropValue);
                        const monthNames = ["jan", "feb", "mar", "apr", "may", "jun",
                            "jul", "aug", "sep", "oct", "nov", "dec"
                        ];
                        apiModelPropValue = d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
                    } else if (apiModelHeaderColumn.type === "timespan") {
                        if (apiModelPropValue.value) {
                            let minutes = apiModelPropValue.value.minutes;
                            if (minutes < 10) {
                                if (minutes !== 0) {
                                    minutes = "0" + minutes;
                                } else {
                                    minutes = "00";
                                }                                    
                            }
                            apiModelPropValue = apiModelPropValue.value.hours + ":" + minutes;                                
                        } else {
                            apiModelPropValue = "-"    
                        }
                    }            
                } else {
                    apiModelPropValue = "-"
                }
                dataCellContent = apiModelPropValue;
            }
        } else {
            dataCellContent = rowData[apiModelHeaderColumn.prop];
        }
        
        if(apiModelHeaderColumn.linkRoute) {
            dataCellContent = 
                <Link to={toLinkRoute} className={classesCss.a}>
                    {dataCellContent}
                </Link>            
        }
    }

    return dataCellContent;
}
