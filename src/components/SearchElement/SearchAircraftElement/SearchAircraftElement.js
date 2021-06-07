import React, {useState, useSelector} from 'react';
import Input from '../../UI/Input/Input';
import ButtonBordered from '../../UI/ButtonBordered/ButtonBordered';
import classes from './SearchAircraftElement.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import InputGroup from 'react-bootstrap/InputGroup';


const  SearchAircraftElement = (props) => {

    const[airline, setAirline] = useState('');
    const[operators, setOperator] = useState('');
    const[typeCode, setTypeCode] = useState('');
    const[fullType, setFullType] = useState('');
    const[registration, setRegistration]=useState('');
    const[serialNumber, setSerialNumber]=useState('');
    const[modeS, setModeS]=useState('');    
    const[minManufactureDate, setMinManufactureDate]=useState('');
    const[maxManufactureDate, setMaxManufactureDate]=useState('');     

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
        placeholder:'Choose production date from:'        
    }
    const maxManufactureDateInputConfig = {
        type:'date',                
        placeholder:'Choose production date to:'        
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

    return (
        <div className={classes.container}> 
        
            <div className="row">           
                <div className="col-sm">                        
                    <div className={classes.card} >
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={airline}
                                changed={(e)=>setAirline(e.target.value)}                                                                             
                                elementType='input' 
                                elementConfig= {airlineInputConfig}                                                                                                                      
                            />
                        </InputGroup>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={operators}
                                changed={(e)=>setOperator(e.target.value)}
                                elementType='input'
                                elementConfig={operatorInputConfig}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input 
                                value={typeCode}
                                changed={(e)=>setTypeCode(e.target.value)}          
                                elementType='input' 
                                elementConfig= {typeCodeInputConfig}                     
                            />
                        </InputGroup>
                                                                         
                    </div>
                </div>
                <div className="col-sm">                        
                <div className={classes.card} >                        
                <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input 
                                value={fullType}
                                changed={(e)=>setFullType(e.target.value)}          
                                elementType='input' 
                                elementConfig= {fullTypeInputConfig}                     
                            />
                        </InputGroup>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input 
                                value={registration}
                                changed={(e)=>setRegistration(e.target.value)}          
                                elementType='input' 
                                elementConfig= {registrationInputConfig}                     
                            />
                        </InputGroup>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={serialNumber}
                                changed={(e)=>setSerialNumber(e.target.value)}
                                elementType='input' 
                                elementConfig= {serialNumberInputConfig}                                               
                            />
                        </InputGroup>                                                 
                    </div>
                </div>    
                <div className="col-sm">                
                    <div className={classes.card}>
                         
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={modeS}
                                changed={(e)=>setModeS(e.target.value)}
                                elementType='input' 
                                elementConfig= {modeSInputConfig}                                               
                            />
                        </InputGroup>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={minManufactureDate}
                                changed={(e)=>setMinManufactureDate(e.target.value)}
                                elementType='input' 
                                elementConfig= {minManufactureDateInputConfig}                                               
                            />
                        </InputGroup>
                        <InputGroup className="mb-3 input-group-sm">
                            <InputGroup.Prepend className={classes.inputPrepend}>
                                <InputGroup.Text className={classes.span}>
                                    <FontAwesomeIcon icon={faSearch} className={classes.icon} />                                                                        
                                </InputGroup.Text>                                
                            </InputGroup.Prepend>                   
                            <Input
                                value={maxManufactureDate}
                                changed={(e)=>setMaxManufactureDate(e.target.value)}
                                elementType='input' 
                                elementConfig= {maxManufactureDateInputConfig}                                               
                            />
                        </InputGroup>
                                                                     
                    </div>
                    <div className={classes.buttonBox}>
                    <ButtonBordered 
                        clicked={() => (props.clickedSearch(airline, operators, typeCode, fullType, registration, serialNumber, modeS, maxManufactureDate, minManufactureDate))}
                        btnType="Success"                            
                    >SEARCH</ButtonBordered>
                    <ButtonBordered
                        clicked={resetSearchHandler}
                        btnType="Secondary"    
                    >RESET</ButtonBordered>
                    {/* <ReactToExcel
                        table={props.id}
                        filename="Aircraft Report"
                        sheet="sheet 1"
                        buttonText="Export to Excel"
                        className="btn"
                    /> */} 
                    </div>
                </div>
            </div>           
        
        </div> 
    );
};

export default SearchAircraftElement;