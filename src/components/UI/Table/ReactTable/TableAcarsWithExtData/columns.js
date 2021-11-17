import { format } from 'date-fns';
import moment from 'moment';
import { RiAwardFill } from 'react-icons/ri';

function replacer(key, value) {
    // Filtering out properties
    if (value == null ) {
      return '';
    }    
    return value;
}

function replacer1(key, value) {
    // Filtering out properties
    if (value == null || value == "0001-01-01T00:00:00") {
      return 0;
    }    
    return value;
}


export const COLUMNS = [
    {
        Header: "UTC Date/Time",
        accessor: "acarsMessageDateTime", 
        // Local Date Time       
        //Cell: ({ value }) => { return format(new Date(value), "dd/MM/yyyy HH:mm:ss")}
        //UTC
        Cell: ({ value }) => { return JSON.stringify(value, null, 2).replace(/T/g, ' ').substring(1,20)}
    },
    {
        Header: "Tail",
        accessor: "tail"
    },
    {
        Header: "Flight",
        accessor: "flight"
    },
    {
        Header: "Text",
        accessor: "text",
        Cell: ({ value }) => { return JSON.stringify(value, replacer, '').replace(/"/g, '').toString()}
        //Cell: ({ value }) => { return String.raw`${value}` }
        //Cell: ({ value }) => { return String.raw`${JSON.stringify(value, replacer, '').replace(/"/g, '').toString()}` }  
    },
    {
        Header: "Mode",
        accessor: "mode"
    },
    {
        Header: "Label",
        accessor: "label"
    },
    {
        Header: "Block ID",
        accessor: "blockId"
    },
    {
        Header: "Mesage Num.",
        accessor: "msgno"
    },
    {
        Header:"Destination Airport",
        accessor:"dsta"
    },   
    {
        Header:"Airline",
        accessor:"airline.airlineName"
    },  
    {
        Header:"Serial Number",
        accessor:"serialNumber"
    },
    {
        Header:"Operator",
        accessor:"operator.airlineName"
    },
    {
        Header:"Aircraft Type",
        accessor:"aircraftType"
    },
    {
        Header:"From airport",
        accessor:"fromAirport.airportName"
    },
    {
        Header:"From IATA",
        accessor:"fromAirport.airportIata"
    },
    {
        Header:"From City",
        accessor:"fromAirport.city"
    },
    {
        Header:"From Country",
        accessor:"fromAirport.country"
    },
    {
        Header:"To airport",
        accessor:"toAirport.airportName"
    },
    {
        Header:"To IATA",
        accessor:"toAirport.airportIata"
    },
    {
        Header:"To City",
        accessor:"toAirport.city"
    },
    {
        Header:"To Country",
        accessor:"toAirport.country"
    },
    {
        Header: "Source Flight Date",
        accessor: "flightDate",         
        Cell: ({ value }) => { return JSON.stringify(value, replacer1, 2).replace(/T/g, ' ').substring(1,11)}
    },
    {
        Header: "Source Flight Std",
        accessor: "flightStd.value.totalSeconds",
        Cell: ({ value }) => { if(value != null){
            return moment.utc(value*1000).format('HH:mm')} else return ''} 
    },
]
