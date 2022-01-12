import React, {useEffect, useState} from 'react'
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-azure';

const ConfirmEmail = props => {
    const query = new URLSearchParams(props.location.search);
    const email = query.get('email');
    const activationToken = query.get('activationToken');

    const[emailConfirmed, setEmailConfirmed] = useState(null);
    const[errorMessage, setErrorMessage] = useState(null);


    const onConfirmEmail = () => {
        let url = `/Account/ConfirmEmail?email=${email}&activationToken=${activationToken}`;
            
        axios.get(url)
            .then(response => {                
                setEmailConfirmed(true);
            })
            .catch(error => {
                setEmailConfirmed(false);

                let err = "";
                if (error.response){
                    err = error.response.data.message
                } else{
                    err = "Service not available";
                }
                setErrorMessage(err);
            }    
        );
    }

    useEffect(() => { 
        onConfirmEmail();
        
    }, []);
    

    if (emailConfirmed === true)
    {
        return (<div><h1>Your email has been successfully confirmed.</h1><h3>You can now <a href='/'>Login</a> with your credentials.</h3></div>)
    }

    if (emailConfirmed === false)
    {
        return (<div><h1>Error</h1><h3>{errorMessage}</h3></div>)
    }

    return (<Spinner />)
}

export default ConfirmEmail;