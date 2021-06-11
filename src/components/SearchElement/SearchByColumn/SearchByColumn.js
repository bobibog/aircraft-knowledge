import React, {useState, useEffect} from 'react';
import Input from '../../UI/Input/Input';
import classes from './SearchByColumn.module.css';
import {FcSearch} from 'react-icons/fc';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';

const  SearchByColumn = (props) => {

    const[column, setColumn] = useState('');    
    
    const columnInputConfig = {
        type:'text',
        placeholder:'Search'
    }
    

    const resetSearchHandler = () => {
        setColumn("");        
        props.clickedReset();       
    };     

    return (
        <div>
            <InputGroup className="mb-3 input-group-sm">
                <InputGroup.Prepend className={classes.inputPrepend}>
                    <InputGroup.Text className={classes.span}>
                        <FcSearch/>                                                                        
                    </InputGroup.Text>                                
                </InputGroup.Prepend>                   
                <Input
                    value={column}
                    changed={(e)=>setColumn(e.target.value)}
                    elementType='input'
                    elementConfig= {columnInputConfig}
                />
                
            </InputGroup>
            <ButtonBordered 
                clicked={() => (props.clickedSearch(column))}
                btnType="Success"                            
                >SEARCH
            </ButtonBordered>
            <ButtonBordered
                clicked={resetSearchHandler}
                btnType="Secondary"    
                >RESET
            </ButtonBordered> 
        </div>
        
    ); 
};

export default SearchByColumn;