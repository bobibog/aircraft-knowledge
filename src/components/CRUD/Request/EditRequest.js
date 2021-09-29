import React, { useContext, useState, useEffect } from 'react';
import {RequestContext} from '../../../context/RequestState';
import {Link, useHistory} from 'react-router-dom';

import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';


const  EditRequest = (props) => {
  

  let [selectedRequest, setSelectedRequest] = useState({
    idRequest: '',    
    title: '',
    data: '',
    stadium: '',
    response: ''
  });
  
  const {requests, updateRequest} = useContext(RequestContext);
  const history = useHistory();
  const currentRequestId = props.match.params.idRequest;

  useEffect(()=>{
    const requestId = currentRequestId;
    const selectedRequest = requests.find(request => request.idRequest === requestId);

    setSelectedRequest(selectedRequest);
  
  }, [currentRequestId, requests])

  const onSubmit = () =>{
    updateRequest(selectedRequest);
    history.push('/crudrequest');
  };

  const onChange = (e) => {
    setSelectedRequest({...selectedRequest, [e.target.name]: e.target.value,
                                            [e.target.name]: e.target.value,
                                            [e.target.name]: e.target.value,
                                            [e.target.name]: e.target.value})
  };
  
  return (
    <Form style={{width:"520px", marginLeft:"15px", marginTop:"75px" }} onSubmit={onSubmit} >
        <FormGroup >
            
            <Label>Request Title</Label>
            <Input type="text" name="title" value={selectedRequest.title} onChange={onChange}></Input>
            <Label>Wanted Data</Label><br/>
            <textarea rows="7" cols="69" name="data" value={selectedRequest.data} onChange={onChange} />
            <Label>Stadium</Label><br/>
            <select name="stadium" onChange={onChange} style={{width:"520px", marginLeft:"5px" }} className="form-select" aria-label="Default select example">
              <option   selected  value={selectedRequest.stadium} >{selectedRequest.stadium}</option>
              <option  value="Unread" >Unread</option>
              <option  value="Processing">Processing</option>
              <option  value="Answered">Answered</option>
            </select><br/>
            <Label>Response</Label><br/>
            <textarea cols="69" rows="7" type="text" placeholder="Add Response." name="response" value={selectedRequest.response} onChange={onChange}/>
        </FormGroup>
        <Button type="submit" className="btn btn-info" >Update</Button>
        <Button  className="btn btn-warning ml-3" >Send</Button>
        <Link to="/crudrequest" className="btn btn-danger ml-3" >Cancel</Link>
    </Form>
  );
};

export default EditRequest;