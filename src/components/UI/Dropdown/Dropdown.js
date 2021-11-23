import { getByDisplayValue } from '@testing-library/dom';
import React, {useState, useRef, useEffect} from 'react';
import { fetchAirlineNameList } from '../../../store/actions';
import './Dropdown.css';
//import classes from './Dropdown.module.css'

const Dropdown = ({
    options,
    id,
    label,
    prompt,
    value,
    onChange,
    onSelect,
    descriptor 
}) => {

    const[open, setOpen]=useState(false);
    const[query, setQuery] = useState('');
    const ref = useRef(null);
    const[unwrap, setUnwrap]= useState(false);
    
    useEffect(()=>{         
        
            ["click", "touchend"].forEach(e=>{                
                    document.addEventListener(e, toggle);
                                
            })
            
            return () => ["click", "touchend"].forEach(e=>{
                document.removeEventListener(e , toggle);
            }) 
                                       
         
    }, []);

    const toggle =(e)=>{   
        
        setOpen(e && e.target === ref.current);
                                                         
    };

    const filter = (options) => {
        
           return options.filter(
             (option) => option[descriptor].toLowerCase().indexOf(query.toLowerCase()) > -1
         ) 
                 
    };

    const displayValue = () => {
        if(query.length>0){
            return query;
        }
        if(value){
            return value[descriptor];
        }
        else{
            return "";
        }
    };

    const selectOption =(option)=>{
        setQuery("")                                    
        onChange(option);
        setOpen(false);
    };
    
    
    return (
        <div className='dropdown'>
            <div className='control'>
                <div className={`selectedValue ${open ? "open" : null} `}>
                    <input type="text" 
                        ref={ref}
                        placeholder={value ? value[descriptor] : prompt}
                        value={displayValue()}
                        onChange={e=> {
                            setQuery(e.target.value)
                            //onChange(null)
                        }}
                        onClick={toggle}
                        onTouchEnd={toggle}                          
                        onSelect={onSelect}
                    />
                </div>
                <div className={`arrow ${open ? "open" : null}` } />
            </div>
            <div className={ `options ${query.length>3 ? "open" : null}` }>
                {filter(options).map((option, i) => 
                <div 
                    key={`dr-${i}`} 
                    className={`option ${value === option ? "selected" : null}` }
                
                    onClick={()=> selectOption(option)}
                    onTouchEnd={()=> selectOption(option)}
                    
                >
                    {option[descriptor]}
                </div>)}                
            </div>
        </div>
    )
}

export default Dropdown;


