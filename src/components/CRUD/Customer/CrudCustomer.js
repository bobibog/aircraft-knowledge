import React, { useState, useEffect } from 'react';
import Heading  from './Heading';
import  CustomerList  from './CustomerList';

const  CrudCustomer = () => {
  return (
    <>
        <Heading />
        <CustomerList />
    </>
  );
};

export default CrudCustomer;