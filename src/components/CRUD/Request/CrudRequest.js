import React, { useState, useEffect } from 'react';
import Heading  from './Heading';
import  RequestList  from './RequestList';

const  CrudRequest = () => {
  return (
    <>
        <Heading />
        <RequestList />
    </>
  );
};

export default CrudRequest;