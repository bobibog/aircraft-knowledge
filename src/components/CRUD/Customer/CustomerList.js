import React, { useContext, useState, useEffect } from 'react';
import {CustomerContext} from '../../../context/CustomerState';
import { Link } from 'react-router-dom';
import {
    ListGroup,
    ListGroupItem,
    Button,
    Table,
    Row
} from 'reactstrap';

const  CustomerList = () => {

    const { customers, deleteCustomer } = useContext(CustomerContext);
    console.log(customers);
  return (    
    <ListGroup className="mt-5" style={{width:"1120px", marginLeft:"150px"}}>

    {customers.length > 0 ? (
        <>
        {customers.map(customer => (
        <ListGroupItem className="d-flex" key={customer.idCustomer}>
            <strong>{customer.name}</strong><div>&nbsp;</div> 
            <strong>{customer.surname}</strong>
            
            <div className="ml-auto">
                <Link to={`/editCustomer/${customer.idCustomer}`} className="btn btn-info mr-2">Update</Link>
                <Button onClick={()=> deleteCustomer(customer.idCustomer)} color="danger">Delete</Button>
            </div>
        </ListGroupItem>
        ))}
        </>
    ) : (<h1 className="text-center">There are no customers in data base!</h1>)}           
             
    </ListGroup>
    
  );
};

export default CustomerList;