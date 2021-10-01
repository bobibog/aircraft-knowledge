import React, { useContext, useState, useEffect } from 'react';
import {RequestContext} from '../../../context/RequestState';
import {Link, useHistory} from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button    
} from 'reactstrap';

const  AddRequest = () => {

  let [title, setTitle] = useState('');
  let [data, setData] = useState('');
  let [stadium, setStadium] = useState('');
  let [response, setResponse] = useState('');  

  const {addRequest} = useContext(RequestContext);
  const history = useHistory();

  const onSubmit = () =>{
    const newRequest = {
      idRequest: uuid(),
      title: title,
      data: data,
      stadium: stadium,
      response: response
    }
    addRequest(newRequest);
    history.push('/crudrequest');
  };

  const onTitle = (e) => {
    setTitle(e.target.value);
  };

  const onData = (e) => {
    setData(e.target.value);
  };

  const onStadium = (e) =>{
    setStadium(e.target.value);
  };

  const onResponse = (e) => {
    setResponse(e.target.value);
  };
  

  return (
    <Form style={{width:"520px", marginLeft:"15px", marginTop:"75px" }} onSubmit={onSubmit}>
        <FormGroup>
            <Label>Title</Label>
            <Input type="text" placeholder="Enter Request title" name="title" value={title} onChange={onTitle}></Input>
            <Label>Wanted Data</Label><br/>
            <textarea cols="69" rows="7" type="text" placeholder="Add Data in Request." name="data" value={data} onChange={onData}/>
            <Label>Stadium</Label><br/>
            <select name="stadium" onChange={onStadium} style={{width:"520px", marginLeft:"5px" }} className="form-select" aria-label="Default select example">
              <option selected>Choose request stadium</option>
              <option value="Unread"  >Unread</option>
              <option value="Processing" >Processing</option>
              <option value="Answered" >Answered</option>
            </select><br/>
            <Label>Response</Label><br/>
            <textarea cols="69" rows="7" type="text" placeholder="Add Response." name="response" value={response} onChange={onResponse}/>
        </FormGroup>
        <Button type="submit" className="btn btn-info" >Submit</Button>
        <Link to="/crudrequest" className="btn btn-danger ml-3" >Cancel</Link>
    </Form>
  );
};

export default AddRequest;

