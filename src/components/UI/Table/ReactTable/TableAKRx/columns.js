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

export const COLUMNS = [//niz header objekata za useTable hook, i tacno moraju imati ocekivane nazive atributa koje ce useTable koristiti
    {
        Header: "UTC Date/Time",//naziv kolone
        //accessor: "acarsMessageDateTime", 
        accessor: "acarsDateTime", 
        //Header i accessor su medjusobno nezavisni
        
        // Local Date Time       
        //Cell: ({ value }) => { return format(new Date(value), "dd/MM/yyyy HH:mm:ss")}
        //UTC

        //Cell je zapamcena funkcija koja se koristi za renderovanje same celije kolone odnosno podatak koji vrati ce biti u jsx(td) tabele
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
    },


    ////////////////////////////////////////
    {
        Header:"Aggregation Status",
        accessor: ""
    },
    {
        Header:"Parsed Text",
        accessor: ""
    },
    {
        Header:"Consensus Status",
        accessor: ""
    },
    {
        Header:"Consensus Result",
        accessor: ""
    }
    ////////////////////////////////////////
    

]