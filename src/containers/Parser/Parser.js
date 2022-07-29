import React from 'react';
import classes from './Parser.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import Background from '../../assets/images/arbeit.jpg';
import Decoding from '../../assets/images/Decoding.jpg';
import Customers from '../../assets/images/crudCustomer.png';
import ParserBackground from '../../assets/images/ParserBackground.jpg';

const Parser = ()=>{
    
    return(
        <div className={classes.container} style={{backgroundImage:"url("+ParserBackground+")"}}>
            <div className="row">
                <div className="col-lg">
                    <div className={classes.card}>
                        <img src={Decoding} className="card-img-top" alt="decoding" style={{width:"224px", height:"250px", alignSelf:"center", paddingTop:"15px"}} />
                            <div className="card-body">
                                <h5 className="card-title">ACARS messages decoder <br/></h5>
                                <p className="card-text">Insert message label and text to decode.</p>
                                <a href="/decoding" className="btn btn-primary">START</a>
                            </div>
                    </div>
                </div>
                {/* <div className="col-lg">
                    <div className={classes.card}>
                    <img src={Customers} className="card-img-top" alt="arbeit-img" style={{width:"450px", height:"250px", alignSelf:"center", paddingTop:"12px"}} />
                        <div className="card-body">
                            <h5 className="card-title">C.R.U.D. <br/>User</h5>
                            <p className="card-text">Create, Read, Update and Delete User</p>
                            <a href="/user" className="btn btn-primary">START</a>
                        </div>
                    </div>
                </div>                 */}
            </div>
        </div>
    );
}

export default Parser;