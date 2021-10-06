import React,{useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SearchAKRxElement from '../../components/SearchElement/SearchAKRxElement/SearchAKRxElement';

//Closing/Opening DropdownButton
const[showDropdown, setShowDropdown] = useState(false);

const open=()=>{
    setShowDropdown(true);
};

const toggleDropdown = () => {        
        setShowDropdown(false);        
};

const Tool = () => {
    return (
        <div>
            <DropdownButton >
                <SearchAKRxElement/>
            </DropdownButton>
        </div>
    )
}

export default Tool
