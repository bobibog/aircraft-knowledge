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
import ButtonMap from 'react-bootstrap/Button';


const position = [45.0, 25.0];

const OpenstreetMap = ({center, draggable, onDragMarker, location}) => {    
    
    const[lati1, setLat1] = useState(90);
    const[lati2, setLat2] = useState(-90);
    const[loni1, setLon1] = useState(180);
    const[loni2, setLon2] = useState(-180);
    
    //START ZOOM = 5
    const[alt1, setAlt1] = useState(10500);
    const[alt2, setAlt2] = useState(16000);

    // Icon dimensions at zoom 5
    const[lengthPix, setLengthPix] = useState(18);
    const[widthPix, setWidthPix] = useState(18);

    const[zoomi, setZoom] = useState(0);

    //console.log(zoomi);
    
    var[tail, setTail]= useState('openAIP'); 
    var[tailLayer, setTailLayer] = useState();

    const onButton1 = (e) =>{
       
        setTail('main');
     }
    const onButton2 = (e) =>{
        
        setTail('deLome');
     }

    useEffect(()=>{
        
        if(tail == 'main')
        {
            setTailLayer(<TileLayer        
            // GLAVNI TAJL    
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            attribution='Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
            />)
        }
        if(tail == 'deLome')
        {
            setTailLayer(<TileLayer url = "https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}"
            attribution = 'Tiles &copy; Esri &mdash; Copyright: &copy;2012 DeLorme' />)
        }
        if(tail == 'topographic'){
            setTailLayer(<TileLayer 
                 url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            attribution = "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
            />)
        }
        if(tail == 'topo2'){
            setTailLayer(<TileLayer 
                 url = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
            attribution = 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            />)
        }
        if(tail == 'worldImagery'){
            setTailLayer(<TileLayer 
                 url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution = "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            />)
        }
        if(tail == 'ocean'){
            setTailLayer(<TileLayer 
                 url = "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}"
            attribution = "Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
            />)
        }
        if(tail == 'natGeo'){
            setTailLayer(<TileLayer 
                 url = "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
            attribution = "Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC"
            />)
        }
        if(tail == 'openAIP'){            
           setTailLayer(<div><TileLayer 
            url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            attribution = 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
            /><TileLayer 
            url = "https://{s}.tile.maps.openaip.net/geowebcache/service/tms/1.0.0/openaip_basemap@EPSG%3A900913@png/{z}/{x}/{y}.{ext}"
            attribution = '<a href="https://www.openaip.net/">openAIP Data</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'
            ext = 'png'
            tms = 'true'
            detectRetina = 'true'
	        subdomains = '12'
            minZoom = '4'
	        maxZoom = '14'
        /></div>)
        }
        }, [tail]);

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
                
                if(zoom <= 2)
                {
                    setAlt1(12500);
                    setAlt2(20000);
                    setLengthPix(10);
                    setWidthPix(10);
                }
                if(zoom == 3)
                {
                    setAlt1(12000);
                    setAlt2(20000);
                    setLengthPix(12);
                    setWidthPix(12);
                }
                if(zoom == 4)
                {
                    setAlt1(11500);
                    setAlt2(20000);
                    setLengthPix(15);
                    setWidthPix(15);
                }
                if(zoom == 5)
                {
                    setAlt1(10500);
                    setAlt2(20000);
                    setLengthPix(18);
                    setWidthPix(18);
                }
                if(zoom == 6)
                {
                    setAlt1(9500);
                    setAlt2(20000);
                    setLengthPix(20);
                    setWidthPix(20);
                }
                if(zoom == 7)
                {
                    setAlt1(8500);
                    setAlt2(20000);
                    setLengthPix(25);
                    setWidthPix(25);
                }
                if(zoom == 8)
                {
                    setAlt1(6000);
                    setAlt2(20000);
                    setLengthPix(30);
                    setWidthPix(30);
                }
                if(zoom == 9)
                {
                    setAlt1(1000);
                    setAlt2(20000);
                    setLengthPix(32);
                    setWidthPix(32);
                }
                if(zoom >= 10)
                {
                    setAlt1(0);
                    setAlt2(20000);
                    setLengthPix(35);
                    setWidthPix(35);
                }
                
                console.log(
                    'center=' + center +'\n'+
                    'lon1='+lon1 +'\n'+
                    'lon2='+lon2+'\n'+
                    'lat1='+lat1+'\n'+
                    'lat2='+lat2+'\n'+
                    'width=' + width +'\n'+
                    'height=' + height +'\n'+
                    'Screen size in pixels=' + map.getSize() +'\n'+
                    'Zoom ='+zoom
                );
            });                
          },     
        
        })
        return null
    };   
    
    
    // TAJLOVI - http://leaflet-extras.github.io/leaflet-providers/preview/index.html

    let  mapContainer = 
    <div>
    {/* <ButtonMap className={classes.buttonMap1} onClick= {onButton1}>Main</ButtonMap>
    <ButtonMap className={classes.buttonMap1} onClick= {onButton2}>DeLome</ButtonMap> */}
    <MapContainer center={position} zoom={5} className={classes.mapContainer} scrollWheelZoom={true} >
        
        {
            tailLayer
        }
        
            <MapDragInfo />
            <MapZoomInfo />
            <DinamicMarkers 
                zoom = {zoomi}
                lat1 = {lati1}
                lat2 = {lati2}
                lon1 = {loni1}
                lon2 = {loni2}
                alt1 = {alt1}
                alt2 = {alt2}
                lengthPix = {lengthPix}
                widthPix = {widthPix}
            />
            
            <StaticMarkers 
                zoom = {zoomi}
                lat1 = {lati1}
                lat2 = {lati2}
                lon1 = {loni1}
                lon2 = {loni2}
            />
            
        </MapContainer>   
        </div>    
    
    return (
        <div>               
            {mapContainer}             
        </div>
        
    )
}

export default withErrorHandler(OpenstreetMap,axios);

