import { getByDisplayValue } from '@testing-library/dom';
import React, {useState, useRef, useEffect} from 'react';
import { fetchAirlineNameList } from '../../../store/actions';
import './Dropdown.css';
//import classes from './Dropdown.module.css'



const Dropdown = ({
    options,    
    prompt,
    value,
    onChange,
    onSelect,
    descriptor,
    characterLimit,
    onKeyDown,
    dropChanger
}) => {

    const[open, setOpen]=useState(false);
    const[query, setQuery] = useState('');
    const ref = useRef(null);

    
    
                
    useEffect(()=>{         
        const timer = setTimeout(() => {
            //console.log("DROP="+dropChanger);
            if(dropChanger==1){
                setQuery("");                
            }
            ["click", "touchend"].forEach(e=>{                
                    document.addEventListener(e, toggle);
                                
            })
            
            return () => ["click", "touchend"].forEach(e=>{
                document.removeEventListener(e , toggle);
            }) 
          }, 80);
          return () => clearTimeout(timer);             
         
    }, [dropChanger]);

    const toggle =(e)=>{   
        
        setOpen(e && e.target === ref.current);
                                                         
    };

    const filter = (options) => {
        
        return options.filter(
            (option) => option[descriptor]!=null ? option[descriptor].toLowerCase().indexOf(query.toLowerCase()) > -1 : null
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
        setQuery("");                                    
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
                        onKeyDown={onKeyDown} 
                                     
                    />
                </div>
                <div className={`arrow ${open ? "open" : null}` } />
            </div>
            <div className={ `options ${query.length>characterLimit ? "open" : null}` }>               

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


