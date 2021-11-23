import React, {useState, useEffect, useCallback} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import {useSelector, useDispatch} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-local';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Map = () =>{   
   

    const[viewport, setViewport] = useState({
        latitude: 44.8178131,
        longitude: 20.4568974,
        width: "100vw",
        height:"100vh",
        zoom: 2
    });      
    

    return (
        <div>
            <ReactMapGL {...viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}    
                        onViewportChange={(viewport)=>{setViewport(viewport)}}  
                        //mapStyle="mapbox://styles/mladenzv/ckvv71grn2cxo14nmuq5g3jqh"
                        mapStyle="mapbox://styles/mladenzv/ckwapbp181k1b16o7tfm7wn3a"     
            >
                {/* MARKERI */}       
                    
                        {/* <Marker>
                            <div>
                                AVION
                            </div>
                        </Marker>               
                          */}

            </ReactMapGL>
        </div>
    )
}

export default Map;

// https://www.youtube.com/watch?v=JJatzkPcmoI
