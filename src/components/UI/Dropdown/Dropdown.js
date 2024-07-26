import { getByDisplayValue } from '@testing-library/dom';
import React, {useState, useRef, useEffect} from 'react';
import { fetchAirlineNameList } from '../../../store/actions';
import './Dropdown.css';
//import classes from './Dropdown.module.css'


//funkcionise tako sto kucanjem menjamo query i prikazujemo query a ako kliknemo na neki objekat iz filtriranih onda ce on ostati u value
const Dropdown = ({
    options,    
    prompt,
    value,//selektovani objekat
    onSelect,//nije prosledjeno
    descriptor,
    characterLimit,
    onKeyDown,
    dropChanger,

    onChange,
    onDropSelected
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
        
        return options?.filter(                                //filtriramo po query kao contains samo sto vraca index umesto true ili false
            (option) => option[descriptor]!=null ? option[descriptor].toLowerCase().indexOf(query.toLowerCase()) > -1 : null
        ) 
                       
    };

    const displayValue = () => {
        if(query.length>0){//2. stalno nakon inicijalnog dok se ne selektuje objekat ili nakon selektovanja pri nastavku kucanja odnosno sluzi samo za prikaz kucanog
            return query;
        }
        if(value){//3. samo nakon sto se selektuje objekat(samo se menja objekat pri sledecem selektovanju) a ako se nastavi sa kucanjem onda query odnosno 2. ali se idalje pamti selektovano u Search sve dok se ne uradi reset Search
            return value[descriptor];
        }
        else{//1. inicijalno se aktivira jer je inicijalno query=="" i prosledjen value objekat==null
            return "";
        }
    };

            //kada budemo selektovali objekat iz DropDown
    const selectOption =(option)=>{
        setQuery("");//samo zbog displayValue da se izbegne prvi uslov
        //onChange(option);
        onDropSelected(option)//postavljamo u Search full naziv kliknutog objekta i postavljamo object value za DropDown
        setOpen(false);
    };

    
        
    return (
        <div className='dropdown'>
            <div className='control'>
                <div className={`selectedValue ${open ? "open" : null} `}>
                    
                    <input type="text" 
                        ref={ref}
                        placeholder={value ? value[descriptor] : prompt}
                        
                        //value string za prikaz u input
                        value={displayValue()}//inicijalno ce biti "" pa query->UI dok ne selektujemo filtrirani onda ce biti value->UI pa ako nastavimo da kucamo bice query->UI
                        
                        onChange={(e)=> {//
                      
                            //////////////
                            //bilo
                            setQuery(e.target.value)//trenutni string iz input setujemo u query odnosno UI->query
                            //onChange(null)//bilo zakomentarisano odnosno prethodno zapamceni selektovan ostaje selektovan dok se ne selektuje sledeci iako se menja input string
                            //////////////  //ako se odkomentarise onda iako selektujemo prethodno objekat i krenemo ponovo da kucamo onda necemo imati selektovani u Search niti njegov full naziv search polja
                            onChange(e.target.value);
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

                

                {/*filtriramo po query pa ovde prikazujemo opcije*/}
                {filter(options)?.map((option, i) => 
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


