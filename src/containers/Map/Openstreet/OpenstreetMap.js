import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../../axios-local';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {MapContainer, TileLayer,Marker, Popup} from 'react-leaflet';
import classes from './OpenstreetMap.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Spinner from '../../../components/UI/Spinner/Spinner';
import markerIcon from '../../../assets/images/airplane-2-multi-size.ico';
import DinamicMarkers from './DinamicMarkers';
import StaticMarkers from './StaticMarkers';


const position = [0.0, 0.0]

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
            iconSize: [30,30],
        },
    });

    var customIcon = new LeafIcon({iconUrl: markerIcon}); 

    
    let  map = <MapContainer center={position} zoom={3.5} className={classes.mapContainer} scrollWheelZoom={true}>
        <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        
            
            <DinamicMarkers />
            {/* <StaticMarkers /> */}
        </MapContainer>
    //}
    
    return (
        <div>           
            {map} 
        </div>
        
    )
}

export default withErrorHandler(OpenstreetMap,axios);

