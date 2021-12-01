import React,{useState} from 'react';
import dynamic from 'next/dynamic';

const OsmMap = dynamic(()=> import("./Openstreet/OpenstreetMap"), {
    ssr: false,
});

const Markers=()=> {
    
    const[location, setLocation]= useState({lng:20.4568974, lat: 44.8178131});
    
    return (
        <div>
            <OsmMap 
                center={location}
                location={location}
                draggable={true}
                title="sample"
                onDragMarker={(e)=>{
                    let loc = {lat: e.lng, lng: e.lat};
                    setLocation(loc); 
                }}
            />
            {"lng: "+location.lng}
            <br />
            {"lat: "+location.lat}
        </div>
    )
}

export default Markers;
