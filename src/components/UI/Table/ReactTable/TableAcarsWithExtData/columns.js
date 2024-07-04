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
        accessor: "acarsDateTime", 
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
    // {
    //     Header: "Aggregated Text",
    //     accessor: "aggregatedText",
    //     Cell: ({ value }) => { return JSON.stringify(value, replacer, '').replace(/"/g, '').toString()}
          
    // },
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
        Header: "Message Num.",
        accessor: "msgno"
    },
    {
        Header:"Destination Airport",
        accessor:"dsta"
    },   
    {
        Header:"Airline Name",
        accessor:"airlineName"
    },  
    {
        Header:"Airline IATA",
        accessor:"iata"
    },
    // {
    //     Header:"Airline ICAO",
    //     accessor:"airline.icao"
    // },    
    // {
    //     Header:"Operator Name",
    //     accessor:"operator.airlineName"
    // },
    // {
    //     Header:"Operator IATA",
    //     accessor:"operator.iata"
    // },
    // {
    //     Header:"Operator ICAO",
    //     accessor:"operator.icao"
    // },
    {
        Header:"Aircraft Type",
        accessor:"aircraftType"
    },
    {
        Header:"Type Code",
        accessor:"typeCode"
    },
    {
        Header:"Serial Number",
        accessor:"serialNumber"
    },
    
    // {
    //     Header:"From airport",
    //     accessor:"fromAirport.airportName"
    // },
    // {
    //     Header:"From IATA",
    //     accessor:"fromAirport.airportIata"
    // },
    // {
    //     Header:"From City",
    //     accessor:"fromAirport.city"
    // },
    // {
    //     Header:"From Country",
    //     accessor:"fromAirport.country"
    // },
    // {
    //     Header:"To airport",
    //     accessor:"toAirport.airportName"
    // },
    // {
    //     Header:"To IATA",
    //     accessor:"toAirport.airportIata"
    // },
    // {
    //     Header:"To City",
    //     accessor:"toAirport.city"
    // },
    // {
    //     Header:"To Country",
    //     accessor:"toAirport.country"
    // },
    // {
    //     Header: "Source Flight Date",
    //     accessor: "flightDate",         
    //     Cell: ({ value }) => { return JSON.stringify(value, replacer1, 2).replace(/T/g, ' ').substring(1,11)}
    // },
    // {
    //     Header: "Source Flight Std",
    //     accessor: "flightStd.value.totalSeconds",
    //     Cell: ({ value }) => { if(value != null){
    //         return moment.utc(value*1000).format('HH:mm')} else return ''} 
    // },

    ////////////////////////////////////////
    {
        Header:"Aggregation Status",
        accessor: "aggregationStatus"
    },
    {
        Header:"Parsed Text",
        accessor: "parsedText"
    },
    {
        Header:"Consensus Status",
        accessor: "consensusStatus"
    },
    {
        Header:"Consensus Result",
        accessor: "consensusResult"
    }
    ////////////////////////////////////////
]
