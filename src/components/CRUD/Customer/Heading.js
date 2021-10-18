import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container
} from 'reactstrap';

const  Heading = () => {
  return (
    <Navbar color="white" style={{marginBottom:'-45px'}}>
        <Container >
            
            <Nav >
                <NavItem style={{position:"fixed", marginLeft:"-195px"}}>
                    <Link className="btn btn-primary" to="/addUser">Add User</Link>
                </NavItem>
            </Nav>
        </Container>
    </Navbar>
  );
};

export default Heading;