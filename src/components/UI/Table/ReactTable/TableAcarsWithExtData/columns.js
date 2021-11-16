import { format } from 'date-fns';
import moment from 'moment';
import { RiAwardFill } from 'react-icons/ri';



function replacer(key, value) {
    // Filtering out properties
    if (value === null) {
      return '';
    }    
    return value;
}

// function replacer(key, value) {
//     if (typeof value === 'function') {
//       return value.toString()
//     }
//     return value
//   }

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
    }
]
