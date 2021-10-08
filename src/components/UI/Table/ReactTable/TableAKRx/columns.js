import { format } from 'date-fns';
import moment from 'moment';



function replacer(key, value) {
    // Filtering out properties
    if (value === null) {
      return '';
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
        Cell: ({ value }) => { return JSON.stringify(value, replacer, '').replace(/"/g, '').split("").join(" ")},
        
    },
    {
        Header: "Frequency",
        accessor: "freq"
    },
    {
        Header: "Timestamp",
        accessor: "timestamp"
    },
    {
        Header: "Station ID",
        accessor: "stationId"
    },
    {
        Header: "Channel",
        accessor: "channel"
    },    
    {
        Header: "Level",
        accessor: "level",
        // Cell: ({ value }) => { return JSON.stringify(value, replacer, '')}
    },
    {
        Header: "Error",
        accessor: "error",
        // Cell: ({ value }) => { return JSON.stringify(value, replacer, '')}
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
        Header: "Ack",
        accessor: "ack"
    },      
    {
        Header: "Mesage Num.",
        accessor: "msgno"
    },      
    {
        Header: "End",
        accessor: "end"
    },    
    {
        Header: "Altitude",
        accessor:"alt"
    },
    {
        Header:"Destination Airport",
        accessor:"dsta"
    },
    {
        Header: "Icao",
        accessor:"icao"
    },
    {
        Header:"Is on Ground",
        accessor:"isOnground"
    },
    {
        Header:"Is Response",
        accessor:"isResponse"
    },
    {
        Header:"Latitude",
        accessor:"lat"
    },
    {
        Header:"Longitude",
        accessor:"lon"
    },    
    {
        Header:"To Addr",
        accessor:"toAddr"
    },
    {
        Header:"Message Type",
        accessor: "type"
    }

]