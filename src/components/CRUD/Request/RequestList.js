import React, { useContext, useState, useEffect } from 'react';
import {RequestContext} from '../../../context/RequestState';
import { Link } from 'react-router-dom';
import {
    ListGroup,
    ListGroupItem,
    Button    
} from 'reactstrap';
import classes from './Request.module.css';

const  RequestList = () => {

    const { requests, deleteRequest } = useContext(RequestContext);
    console.log(requests);
  return (    
    <ListGroup className={classes.listGroup} >

    {requests.length > 0 ? (
        <>
        {requests.map(request => (
        <ListGroupItem className={classes.listGroupItem} key={request.idRequest}>
            <strong>{request.title}</strong><div>&nbsp;</div> 
            <strong>{request.data}</strong>
            
            <div className={classes.commands} >
                <Link to={`/editrequest/${request.idRequest}`} className="btn btn-info mr-2">Update</Link>
                <Button onClick={()=> deleteRequest(request.idRequest)} color="danger">Delete</Button>
            </div>
        </ListGroupItem>
        ))}
        </>
    ) : (<h1 className="text-center">There are no more requests in data base!</h1>)}           
             
    </ListGroup>
     
    
  );
};

export default RequestList;