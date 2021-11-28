import React, {useState, useEffect, useCallback, useRef} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {useSelector, useDispatch} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-local';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import mapboxgl from 'mapbox-gl';
import classes from './Map.module.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWxhZGVuenYiLCJhIjoiY2t2dXoxejNxMDFjajJ2bDQ5NnZoZDkzaCJ9.040VkLVqD79PjdLXdItnLg';

const Map = () =>{   
   

    // const[viewport, setViewport] = useState({
    //     latitude: 44.8178131,
    //     longitude: 20.4568974,
    //     width: "100vw",
    //     height:"100vh",
    //     zoom: 2
    // });      
    

    // return (
    //     <div>
    //         <ReactMapGL {...viewport}
    //                     mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}    
    //                     onViewportChange={(viewport)=>{setViewport(viewport)}}  
    //                     //mapStyle="mapbox://styles/mladenzv/ckvv71grn2cxo14nmuq5g3jqh"
    //                     //mapStyle="mapbox://styles/mladenzv/ckwapbp181k1b16o7tfm7wn3a"     
    //         >
    //             {/* MARKERI */}       
                    
    //                     {/* <Marker>
    //                         <div>
    //                             AVION
    //                         </div>
    //                     </Marker>               
    //                       */}

    //         </ReactMapGL>
    //     </div>

    const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className={classes.sidebarStyle}>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className={classes.mapContainer} ref={mapContainerRef} />
    </div>
  );
    
}

export default Map;

// https://www.youtube.com/watch?v=JJatzkPcmoI
// PROBLEMI - RIJESENJA
// https://docs.mapbox.com/help/troubleshooting/blank-tiles/

// BING
// https://www.youtube.com/watch?v=QgM-q0z9aEw