import React from 'react';
import classes from './Administrator.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Background from '../../assets/images/arbeit.jpg';
// import Requests from '../../assets/images/Request.jpg';
import Customers from '../../assets/images/crudCustomer.png';
import {Link} from 'react-router-dom';

const Administrator = () => {

    //const navigate = useNavigate();
    
    return(
        <div className={classes.container} style={{backgroundImage:"url("+Background+")"}}>
            <div className="row">
                {/* <div className="col-sm">
                    <div className="card" style={{margin:"10px", opacity:"0.75", width:"100%", padding:"15px"}}>
                        <img src={Requests} className="card-img-top" alt="arbeit-img" style={{width:"194px", height:"250px", alignSelf:"center", paddingTop:"15px"}} />
                            <div className="card-body">
                                <h5 className="card-title">C.R.U.S.D. <br/>Requests</h5>
                                <p className="card-text">Review customers requests, perhaps change them and finally reply.</p>
                                <a href="/crudrequest" className="btn btn-primary">Something to work on... more</a>
                            </div>
                    </div>
                </div> */}
                <div className="col-lg">
                    <div className={classes.card}>
                    <img src={Customers} className="card-img-top" alt="arbeit-img" style={{width:"450px", height:"250px", alignSelf:"center", paddingTop:"12px"}} />
                        <div className="card-body">
                            <h5 className="card-title">C.R.U.D. <br/>User</h5>
                            <p className="card-text">Create, Read, Update and Delete User</p>
                            {/* <a href="/user" className="btn btn-primary">START</a> */}
                            <Link to="/user" className="btn btn-primary ml-3" >START</Link>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    );
}

export default Administrator;