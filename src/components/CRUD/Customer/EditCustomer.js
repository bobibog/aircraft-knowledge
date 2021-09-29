import React, { useContext, useState, useEffect } from 'react';
import {CustomerContext} from '../../../context/CustomerState';
import {Link, useHistory} from 'react-router-dom';

import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';


const  EditCustomer = (props) => {

  

  let [selectedCustomer, setSelectedCustomer] = useState({
    idCustomer: '',
    name: '',
    surname: '',
    email: '',
    password: ''
  });
  
  const {customers, updateCustomer} = useContext(CustomerContext);
  const history = useHistory();
  const currentCustomerId = props.match.params.idCustomer;

  useEffect(()=>{
    const customerId = currentCustomerId;
    const selectedCustomer = customers.find(customer => customer.idCustomer === customerId);

    setSelectedCustomer(selectedCustomer);
  
  }, [currentCustomerId, customers])

  const onSubmit = () =>{
    updateCustomer(selectedCustomer);
    history.push('/crudcustomer');
  };

  const onChange = (e) => {
    setSelectedCustomer({...selectedCustomer, [e.target.name]: e.target.value, 
                                              [e.target.surname]: e.target.value,
                                              [e.target.email]: e.target.value,
                                              [e.target.password]: e.target.value})
  };

  
  return (
    <Form style={{width:"520px", marginLeft:"15px", marginTop:"75px" }} onSubmit={onSubmit}>
        <FormGroup >
            <Label>Name</Label>
            <Input type="text" placeholder="Enter Customer's name." name="name" value={selectedCustomer.name} onChange={onChange}></Input>
            <Label>Surname</Label>
            <Input type="text" placeholder="Enter Customer's surname." name="surname" value={selectedCustomer.surname} onChange={onChange}></Input>
            <Label>Email Address</Label>
            <Input type="email" placeholder="Enter Customer's email." name="email" value={selectedCustomer.email} onChange={onChange}></Input>
            <Label>Password</Label>
            <Input type="text" placeholder="Enter Customer's password." name="password" value={selectedCustomer.password} onChange={onChange}></Input>
        </FormGroup>
        <Button type="submit" className="btn btn-info" >Update</Button>
        <Link to="/crudcustomer" className="btn btn-danger ml-3" >Cancel</Link>
    </Form>
  );
};

export default EditCustomer;