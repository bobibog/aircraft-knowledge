import React,{useState} from 'react';
import Button from '../UI/Button/Button';


const Greetings = (props)=> {
    
    const[terms, setTerms] = useState(true);
    const termsHandler = (e)=>{
        setTerms(false);
    };
    return (
        <>
            <h3>WELCOME BACK!</h3>            
            <div>
                <Button btnType="Success" clicked={props.clickedTerms}>CONTINUE</Button>
            </div>           
            
        </>
       
    )
}

export default Greetings;
