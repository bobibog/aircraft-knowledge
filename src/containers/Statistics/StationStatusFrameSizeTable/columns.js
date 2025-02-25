export const COLUMNS=[
    {
        Header: "CREATED On",
        accessor: "createdOn",
        Cell: ({ value }) => { return JSON.stringify(value, null, 2).replace(/T/g, ' ').substring(1,20)}
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
        Header: "Message Type",
        accessor: "msgType"
    },
    {
        Header: "Frame size MIN",
        accessor: "frameSizeMin"
    },
    {
        Header: "Frame size MAX",
        accessor: "frameSizeMax"
    },
    {
        Header: "Frame size AVG",
        accessor: "frameSizeAvg"
    }
    
]