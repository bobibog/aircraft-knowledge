import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import axios from '../../../axios-local';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {MapContainer, TileLayer,Marker, Popup, useMapEvents, MapConsumer} from 'react-leaflet';
import classes from './OpenstreetMap.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Spinner from '../../../components/UI/Spinner/Spinner';
import markerIcon from '../../../assets/images/airplane-2-multi-size.ico';
import DinamicMarkers from './DinamicMarkers';
import StaticMarkers from './StaticMarkers';


const position = [0.0, 0.0];

const OpenstreetMap = ({center, draggable, onDragMarker, location}) => {
    
    
    const[lati1, setLat1] = useState();
    const[lati2, setLat2] = useState();
    const[loni1, setLon1] = useState();
    const[loni2, setLon2] = useState();
    const[zoomi, setZoom] = useState();

    //console.log(zoomi);

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
    
    const MapDragInfo = () => {
        const map = useMapEvents({
          drag: () => {
            map.on('dragend', function onDragEnd(){
                var center = map.getCenter();
                var lon1 = map.getBounds().getEast();
                var lon2 = map.getBounds().getWest();
                var lat1 = map.getBounds().getNorth();
                var lat2 = map.getBounds().getSouth()
                var width = lon1 - lon2;
                var height = lat1 - lat2;
                var zoom = map.getZoom();
                
                setLat1(lat1);
                setLat2(lat2);
                setLon1(lon1);
                setLon2(lon2);
                setZoom(zoom);
                // console.log(
                //     'center=' + center +'\n'+
                //     'lon1='+lon1 +'\n'+
                //     'lon2='+lon2+'\n'+
                //     'lat1='+lat1+'\n'+
                //     'lat2='+lat2+'\n'+
                //     'width=' + width +'\n'+
                //     'height=' + height +'\n'+
                //     'Screen size in pixels=' + map.getSize() +'\n'+
                //     'Zoom ='+zoom
                // );
            });                
          },     
        
        })
        return null
    };

    const MapZoomInfo = () => {
        const map = useMapEvents({
          zoom: () => {
            map.on('zoomend', function onDragEnd(){
                var center = map.getCenter();
                var lon1 = map.getBounds().getEast();
                var lon2 = map.getBounds().getWest();
                var lat1 = map.getBounds().getNorth();
                var lat2 = map.getBounds().getSouth()
                var width = lon1 - lon2;
                var height = lat1 - lat2;
                var zoom = map.getZoom();
                setLat1(lat1);
                setLat2(lat2);
                setLon1(lon1);
                setLon2(lon2);
                setZoom(zoom);
                // console.log(
                //     'center=' + center +'\n'+
                //     'lon1='+lon1 +'\n'+
                //     'lon2='+lon2+'\n'+
                //     'lat1='+lat1+'\n'+
                //     'lat2='+lat2+'\n'+
                //     'width=' + width +'\n'+
                //     'height=' + height +'\n'+
                //     'Screen size in pixels=' + map.getSize() +'\n'+
                //     'Zoom ='+zoom
                // );
            });                
          },     
        
        })
        return null
    };
    
    

    let  mapContainer = <MapContainer center={position} zoom={2} className={classes.mapContainer} scrollWheelZoom={true}>
        <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />       
            <MapDragInfo />
            <MapZoomInfo />
            {/* <DinamicMarkers 
                
            /> */}
            
            <StaticMarkers 
                zoom = {zoomi}
                lat1 = {lati1}
                lat2 = {lati2}
                lon1 = {loni1}
                lon2 = {loni2}
            />
        </MapContainer>   
    

    
    
    return (
        <div>           
            {mapContainer}             
        </div>
        
    )
}

export default withErrorHandler(OpenstreetMap,axios);

