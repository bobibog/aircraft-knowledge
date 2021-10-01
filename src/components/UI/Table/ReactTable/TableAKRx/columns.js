import { format } from 'date-fns';
import moment from 'moment';

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
        Cell: ({ value }) => { return JSON.stringify(value, null, '')}
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
    }
]