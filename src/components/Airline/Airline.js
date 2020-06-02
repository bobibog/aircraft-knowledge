import React from 'react';

const airline = props => {
    const airlineColumns = [];
    
    for (let airlineColumnName in props.airline) {
        airlineColumns.push({
            name: airlineColumnName,
            value: props.airline[airlineColumnName]
        });
    }

    const airlineRow = airlineColumns.map(airlineColumn => {
    return <td key={airlineColumn.name}>{airlineColumn.value}</td>
    });

    return (
        <tr>
            {airlineRow}
        </tr>
    );
};

export default airline;