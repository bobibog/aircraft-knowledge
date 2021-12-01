import React, {useRef, useMemo} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import classes from './OpenstreetMap.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const position = [20.4568974, 44.8178131]

const OpenstreetMap = ({center, draggable, onDragMarker, location}) => {
    
    const markerRef = useRef(null);

    const dragHandlers = useMemo(
        ()=> ({
            dragend() {
                const marker = markerRef.current;
                if(marker != null){
                    onDragMarker(marker.getLatLng());
                }
            },
        }),
        []
    );
    
    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [40,40],
        },
    });

    var customIcon = new LeafIcon({iconUrl: "/assests/images/airplane.png"});
    
    return (
        <MapContainer center={position} zoom={3} className={classes.mapContainer} scrollWheelZoom={false}>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker 
                icon={customIcon}
                position={[
                    location && location.lng ? location.lng : "",
                    location && location.lat ? location.lat : "",
                ]}
                draggable = {draggable}
                eventHandlers={dragHandlers}
                ref={markerRef}
            >
                <Popup className={classes.popup}>{"my title"}</Popup>
            </Marker>

        </MapContainer>
    )
}

export default OpenstreetMap;

// https://www.youtube.com/watch?v=MujnOg175Yo

// https://www.youtube.com/watch?v=1gkAnx6TGCk