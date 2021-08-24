import React, {useState, useSelector} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAircraftElement2.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {FcAlphabeticalSortingAz} from 'react-icons/fc';
import {FcAlphabeticalSortingZa} from 'react-icons/fc';
import {FcNumericalSorting12} from 'react-icons/fc';
import {FcNumericalSorting21} from 'react-icons/fc';
import SearchByColumn from '../SearchByColumn/SearchByColumn';
import {FcSearch} from 'react-icons/fc';


const  SearchAircraftElement2 = (props) => {

    const[airline, setAirline] = useState('');
    const[operators, setOperator] = useState('');
    const[typeCode, setTypeCode] = useState('');
    const[fullType, setFullType] = useState('');
    const[registration, setRegistration]=useState('');
    const[serialNumber, setSerialNumber]=useState('');
    const[modeS, setModeS]=useState('');    
    const[minManufactureDate, setMinManufactureDate]=useState('');
    const[maxManufactureDate, setMaxManufactureDate]=useState('');     

    const columnInputConfig = {
        type:'text',
        placeholder:'Search'
    }

    const airlineInputConfig = {
        type:'text',
        placeholder:'Enter airline name'
    }
    const operatorInputConfig = {
        type:'text',
        placeholder:'Enter operator name'
    }
    const typeCodeInputConfig = {
        type:'text',
        placeholder:'Enter type code'
    }
    const fullTypeInputConfig = {
        type:'text',
        placeholder:'Enter aircraft type'
    } 
    const registrationInputConfig = {
        type:'text',
        placeholder:'Enter aircraft registration'
    }
    const serialNumberInputConfig = {
        type:'text',
        placeholder:'Enter aircraft serial number'
    }
    const modeSInputConfig = {
        type:'text',
        placeholder:'Enter mode S'
    }  

    
    const minManufactureDateInputConfig = {
        type:'date',
        placeholder:''        
    }
    const maxManufactureDateInputConfig = {
        type:'date',                
        placeholder:''        
    }           

    
    const handleKeyPress1 = (e) =>{
            if (e.key === 'Enter') {
                props.clickedSearch5(registration); 
            }
        }
    const handleKeyPress2 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch3(typeCode); 
        }
    }

    const handleKeyPress3 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch4(fullType); 
        }
    }
    const handleKeyPress4 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch6(serialNumber); 
        }
    }
    const handleKeyPress5 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch7(modeS); 
        }
    }

    const handleKeyPress6 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch9(minManufactureDate); 
            props.clickedSearch8(maxManufactureDate);
        }
    }
    const handleKeyPress7 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch9(minManufactureDate); 
            props.clickedSearch8(maxManufactureDate);
        }
    }
    const handleKeyPress8 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch1(airline); 
        }
    }
    const handleKeyPress9 = (e) =>{
        if (e.key === 'Enter') {
            props.clickedSearch2(operators); 
        }
    }

    const resetSearchHandler = () => {
        setAirline("");
        setOperator("");
        setTypeCode("");
        setFullType("");
        setRegistration("");
        setSerialNumber("");
        setModeS("");
        setMaxManufactureDate("");
        setMinManufactureDate("");
        props.clickedReset();       
    };     

    
    return(
        <div className={classes.grid_container}>

<div className={classes.grid_item}>
                <DropdownButton id="dropdown-item-button"  title="Registration">                            
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByRegistrationAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByRegistrationDsc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                    <div className={classes.label}><small><label>Contains:</label></small></div>
                    <div>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FcSearch/>                                                                        
                                </InputGroup.Text>                                
                                </InputGroup.Prepend>                   
                            <Input
                                value={registration}
                                changed={(e)=>setRegistration(e.target.value)}
                                elementType='input'
                                elementConfig= {columnInputConfig}
                                onKeyUp = {handleKeyPress1}
                            />
                                
                        </InputGroup>
                        <ButtonBordered 
                            clicked={() => (props.clickedSearch5(registration))}
                            btnType="Success"                            
                            >SEARCH
                        </ButtonBordered>
                        <ButtonBordered
                            clicked={resetSearchHandler}
                            btnType="Secondary"
                            toggle="tooltip"
                            placement="right"
                            title="Reset all columns"     
                            >RESET
                        </ButtonBordered> 
                    </div>                                
                </DropdownButton>
            </div>            

            <div className={classes.grid_item}>
                <DropdownButton id="dropdown-item-button" title="Type Code">                            
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByTypeCodeAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByTypeCodeDsc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                    <div className={classes.label}><small><label>Contains:</label></small></div>
                    <div>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FcSearch/>                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={typeCode}
                                changed={(e)=>setTypeCode(e.target.value)}
                                elementType='input'
                                elementConfig= {columnInputConfig}
                                onKeyUp = {handleKeyPress2}
                            />
                                
                        </InputGroup>
                        <ButtonBordered 
                            clicked={() => (props.clickedSearch3(typeCode))}
                            btnType="Success"                            
                            >SEARCH
                        </ButtonBordered>
                        <ButtonBordered
                            clicked={resetSearchHandler}
                            btnType="Secondary"
                            toggle="tooltip"
                            placement="right"
                            title="Reset all columns"     
                            >RESET
                        </ButtonBordered> 
                    </div>                                
                </DropdownButton>
            </div>

            <div className={classes.grid_item}>
                <DropdownButton id="dropdown-item-button" className={classes.dropButton} title="Full Type">                            
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByFullTypeAsc("asc"))}><FcNumericalSorting12/> <small>Sort Min to Max</small></Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByFullTypeDsc("dsc"))}><FcNumericalSorting21/> <small>Sort Max to Min</small></Dropdown.Item>
                    <div className={classes.label}><small><label>Contains:</label></small></div>
                    <div>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FcSearch/>                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={fullType}
                                changed={(e)=>setFullType(e.target.value)}
                                elementType='input'
                                elementConfig= {columnInputConfig}
                                onKeyUp = {handleKeyPress3}
                            />                                
                            </InputGroup>                        
                        <ButtonBordered 
                            clicked={() => (props.clickedSearch4(fullType))}
                            btnType="Success"                            
                            >SEARCH
                        </ButtonBordered>
                        <ButtonBordered
                            clicked={resetSearchHandler}
                            btnType="Secondary"
                            toggle="tooltip"
                            placement="right"
                            title="Reset all columns"     
                            >RESET
                        </ButtonBordered> 
                    </div>                                
                </DropdownButton>
            </div>

            
                
            <div className={classes.grid_item}>
                <DropdownButton id="dropdown-item-button" className={classes.dropBtn} title="Serial No.">                            
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftBySerialNumberAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftBySerialNumberDsc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                    <div className={classes.label}><small><label>Contains:</label></small></div>
                    <div>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FcSearch/>                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={serialNumber}
                                changed={(e)=>setSerialNumber(e.target.value)}
                                elementType='input'
                                elementConfig= {columnInputConfig}
                                onKeyUp = {handleKeyPress4}
                            />
                                
                        </InputGroup>
                        <ButtonBordered 
                            clicked={() => (props.clickedSearch6(serialNumber))}
                            btnType="Success"                            
                            >SEARCH
                        </ButtonBordered>
                        <ButtonBordered
                            clicked={resetSearchHandler}
                            btnType="Secondary"
                            toggle="tooltip"
                            placement="right"
                            title="Reset all columns"     
                            >RESET
                        </ButtonBordered> 
                    </div>                                
                </DropdownButton>
            </div>

            <div className={classes.grid_item}>
                <DropdownButton id="dropdown-item-button" title="Mode S">                            
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByModeSAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByModeSDsc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                    <div className={classes.label}><small><label>Contains:</label></small></div>
                    <div>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FcSearch/>                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={modeS}
                                changed={(e)=>setModeS(e.target.value)}
                                elementType='input'
                                elementConfig= {columnInputConfig}
                                onKeyUp = {handleKeyPress5}
                            />
                                
                        </InputGroup>
                        <ButtonBordered 
                            clicked={() => (props.clickedSearch7(modeS))}
                            btnType="Success"                            
                            >SEARCH
                        </ButtonBordered>
                        <ButtonBordered
                            clicked={resetSearchHandler}
                            btnType="Secondary"
                            toggle="tooltip"
                            placement="right"
                            title="Reset all columns"     
                            >RESET
                        </ButtonBordered> 
                    </div>                                
                </DropdownButton>
            </div>

            <div className={classes.grid_item}>
                <DropdownButton id="dropdown-item-button" className={classes.dropButtonDate} title="Manufacture Date">                            
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByManufactureDateAsc("asc"))}><FcNumericalSorting12/> <small>Sort Min to Max</small></Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByManufactureDateDsc("dsc"))}><FcNumericalSorting21/> <small>Sort Max to Min</small></Dropdown.Item>
                    
                    <div>
                        <div className={classes.label}><small><label>Manufactured from:</label></small></div>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend1}>
                                <InputGroup.Text className={classes.span1}>
                                    <FcSearch className={classes.fa}/>                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={minManufactureDate}
                                changed={(e)=>setMinManufactureDate(e.target.value)}
                                elementType='input'
                                elementConfig= {minManufactureDateInputConfig}
                                
                                onKeyUp = {handleKeyPress7}
                            />                                
                            </InputGroup>
                        <div className={classes.label}><small><label>Manufactured to:</label></small></div>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend1}>
                                <InputGroup.Text className={classes.span1}>
                                    <FcSearch/>                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                             
                            <Input
                                value={maxManufactureDate}
                                changed={(e)=>setMaxManufactureDate(e.target.value)}
                                elementType='input'
                                elementConfig= {maxManufactureDateInputConfig}
                                onKeyUp = {handleKeyPress6}
                            />
                                
                        </InputGroup>
                        <ButtonBordered 
                            clicked={() => (props.clickedSearch8(maxManufactureDate), props.clickedSearch9(minManufactureDate))}
                            btnType="Success"                            
                            >SEARCH
                        </ButtonBordered>
                        <ButtonBordered
                            clicked={resetSearchHandler}
                            btnType="Secondary" 
                            toggle="tooltip"
                            placement="right"
                            title="Reset all columns"    
                            >RESET
                        </ButtonBordered> 
                    </div>                                
                </DropdownButton>
            </div>

            <div className={classes.grid_item}>
                <DropdownButton id="dropdown-item-button" title="Airline Name" >                            
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByAirlineAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByAirlineDsc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                    <div className={classes.label}><small><label>Contains:</label></small></div>
                    <div>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FcSearch/>                                                                        
                                </InputGroup.Text>                                
                                </InputGroup.Prepend>                   
                            <Input
                                value={airline}
                                changed={(e)=>setAirline(e.target.value)}
                                elementType='input'
                                elementConfig= {columnInputConfig}
                                onKeyUp = {handleKeyPress8}
                            />
                                
                        </InputGroup>
                        <ButtonBordered 
                            clicked={() => (props.clickedSearch1(airline))}
                            btnType="Success"                            
                            >SEARCH
                        </ButtonBordered>
                        <ButtonBordered
                            clicked={resetSearchHandler}
                            btnType="Secondary"
                            toggle="tooltip"
                            placement="right"
                            title="Reset all columns"     
                            >RESET
                        </ButtonBordered> 
                    </div>                                
                </DropdownButton>
            </div>
                
            <div className={classes.grid_item}>
                <DropdownButton id="dropdown-item-button" className={classes.dropBtn} title="Operator" >                            
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByOperatorAsc("asc"))}><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                    <Dropdown.Item as="button" onClick={()=>(props.orderAircraftByOperatorDsc("dsc"))}><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                    <div className={classes.label}><small><label>Contains:</label></small></div>
                    <div>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FcSearch/>                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={operators}
                                changed={(e)=>setOperator(e.target.value)}
                                elementType='input'
                                elementConfig= {columnInputConfig}
                                onKeyUp = {handleKeyPress9}
                            />
                                
                        </InputGroup>
                        <ButtonBordered 
                            clicked={() => (props.clickedSearch2(operators))}
                            btnType="Success"                            
                            >SEARCH
                        </ButtonBordered>
                        <ButtonBordered
                            clicked={resetSearchHandler}
                            btnType="Secondary"
                            toggle="tooltip"
                            placement="right"
                            title="Reset all columns"     
                            >RESET
                        </ButtonBordered> 
                    </div>                                
                </DropdownButton>
            </div>

        </div>       
    
    );
};

export default SearchAircraftElement2;