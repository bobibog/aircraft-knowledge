import React from 'react';
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
    <Navbar color="dark" >
        <Container>
            <NavbarBrand href="/crudrequest">List of Requests</NavbarBrand>
            <Nav>
                <NavItem>
                    <Link className="btn btn-primary" to="/addrequest">Add unposted Request</Link>
                </NavItem>
            </Nav>
        </Container>
    </Navbar>
  );
};

export default Heading;