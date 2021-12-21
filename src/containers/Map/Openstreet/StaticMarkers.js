import React,{useState} from 'react';
import dynamic from 'next/dynamic';

const OsmMap = dynamic(()=> import("./Openstreet/OpenstreetMap"), {
    ssr: false,
});

const StaticMarkers=()=> {
    
    const[location, setLocation]= useState({lon:0, lat: 0});
    
    return (
        <div>
            <OsmMap 
                center={location}
                location={location}
                draggable={true}
                title="sample"
                onDragMarker={(e)=>{
                    let loc = {lat: e.lon, lon: e.lat};
                    setLocation(loc); 
                }}
            />
            {"lon: "+location.lon}
            <br />
            {"lat: "+location.lat}
        </div>
    )
}

export default StaticMarkers;
