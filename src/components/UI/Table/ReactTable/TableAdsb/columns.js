

function replacer(key, value) {
    // Filtering out properties
    if (value === -9999) {
      return 'not valid';
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
        Header: "Address",
        accessor: "address"
    },
    {
        Header: "Address Type",
        accessor: "addressType"
    },
    {
        Header: "Aircraft Type",
        accessor: "aircraftType"        
    },
    {
        Header: "Airspeed",
        accessor: "airspeed"
    },
    {
        Header: "Airspeed Status",
        accessor: "airspeedStatus"
    },
    {
        Header: "Alt Info",
        accessor: "altInfo"
    },
    {
        Header: "Alt Unit",
        accessor: "altUnit"
    },    
    {
        Header: "Altitude",
        accessor: "altitude"        
    },
    {
        Header: "Bds2",
        accessor: "bds2Identification"        
    },
    {
        Header: "Capability",
        accessor: "capability"
    },
    {
        Header: "Cc",
        accessor: "cc"
    },
    {
        Header: "Comm-B Bds",
        accessor: "commBBds"
    },
    {
        Header: "Comm-B Mb",
        accessor: "commBMb"
    },
    {
        Header: "Control Field",
        accessor: "controlField"
    },      
    {
        Header: "Dr",
        accessor: "dr"
    },      
    {
        Header: "Emergency St.",
        accessor: "emergencyState"
    },    
    {
        Header: "Error",
        accessor:"error"
    },
    {
        Header:"Es Sub",
        accessor:"esSub"
    },
    {
        Header: "Es Type",
        accessor:"esType"
    },
    {
        Header:"Ew Status",
        accessor:"ewStatus"
    },
    {
        Header:"Ew Velocity",
        accessor:"ewVelocity"
    },
    {
        Header:"F Flag",
        accessor:"fFlag"
    },
    {
        Header:"Flight Status",
        accessor:"flightStatus"
    },    
    {
        Header:"Hae Baro Offset",
        accessor:"haeBaroOffset",
        Cell: ({ value }) => { return JSON.stringify(value, replacer, '').replace(/"/g, '').toString()}
    },
    {
        Header:"Heading",
        accessor: "heading"
    },
    {
        Header:"Heading Status",
        accessor: "headingStatus"
    },
    {
        Header:"Icao",
        accessor: "icao"
    },
    {
        Header:"Identification",
        accessor: "identification"
    },
    {
        Header:"Iid",
        accessor: "iid"
    },
    {
        Header:"Latitude",
        accessor: "lat"
    },
    {
        Header:"Level",
        accessor: "level"
    },
    {
        Header:"Longitude",
        accessor: "lon"
    },
    {
        Header:"Mode A",
        accessor: "modeA"
    },
    {
        Header:"Mode A Ident",
        accessor: "modeAIdent"
    },
    {
        Header:"Mode C",
        accessor: "modeC"
    },
    {
        Header:"Message Type",
        accessor: "msgType"
    },
    {
        Header:"Nacp",
        accessor: "nacp"
    },
    {
        Header:"Ns Status",
        accessor: "nsStatus"
    },
    {
        Header:"Ns Velocity",
        accessor: "nsVelocity"
    },
    {
        Header:"Nucp",
        accessor: "nucp"
    },
    {
        Header:"Pos Decoding",
        accessor: "posDecoding"
    },
    {
        Header:"Report",
        accessor: "report"
    },
    {
        Header:"Sl",
        accessor: "sl"
    },
    {
        Header:"Squawk",
        accessor: "squawk"
    },
    {
        Header:"Station Id",
        accessor: "stationId"
    },
    {
        Header:"T Flag",
        accessor: "tFlag"
    },
    {
        Header:"Timestamp",
        accessor: "timestamp"
    },
    // {
    //     Header:"Message Type",
    //     accessor: "type"
    // },
    {
        Header:"Um",
        accessor: "um"
    },
    {
        Header:"Vertical Rate",
        accessor: "verticalRate"
    },
    {
        Header:"Vertical Rate Src",
        accessor: "verticalRateSrc"
    },
    {
        Header:"Vertical Status",
        accessor: "verticalStatus"
    },
    {
        Header:"Vs",
        accessor: "vs"
    }

]