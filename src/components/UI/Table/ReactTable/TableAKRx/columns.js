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
        Header: "Message Time",
        accessor: "acarsMessageDateTime",        
        Cell: ({ value }) => { return format(new Date(value), "dd/MM/yyyy HH:mm:ss")}
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
        Cell: ({ value }) => { return JSON.stringify(value, replacer, '').replace(/"/g, '')}        
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
        accessor: "level"
    },
    {
        Header: "Error",
        accessor: "error"
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
        Header:"Attachments",
        accessor:"attachments"
    },
    {
        Header: "Etag",
        accessor: "etag"
    },
    {
        Header:"Rid",
        accessor: "rid"
    },
    {
        Header: "Self",
        accessor: "self"
    },
    {
        Header: "Ts",
        accessor: "ts"
    },
    {
        Header: "Altitude",
        accessor:"alt"
    },
    {
        Header:"Dsta",
        accessor:"dsta"
    },
    {
        Header: "Icao",
        accessor:"icao"
    },
    {
        Header:"Is on Ground",
        accessor:"is_onground"
    },
    {
        Header:"Is Response",
        accessor:"is_response"
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
        Header:"Partition Key",
        accessor:"partition_key"
    },
    {
        Header:"To Addr",
        accessor:"toaddr"
    },
    {
        Header:"Message Type",
        accessor: "type"
    }

]