import React, {useState, useEffect, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import StyledTableRow from '../StyledTableRow/StyledTableRow';
import StyledTableCell from '../StyledTableRow/StyledTableCell/StyledTableCell';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {FcAlphabeticalSortingAz} from 'react-icons/fc';
import {FcAlphabeticalSortingZa} from 'react-icons/fc';
import SearchByColumn from '../../../SearchElement/SearchByColumn/SearchByColumn';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../../store/actions/index';


const CustomHeaderTableRow = props => {

       
           
    const[column, setColumn] = useState('');    
    
    

    const submitSearchHandler = (column) => {  
        
        setColumn(column);        
    };  
    
    const resetSearchHandler = () => {
        setColumn("");     
                       
    };    

    return (
        
        <StyledTableRow>
            {(props.colTot - 1) > props.colIndVisible
                ? <StyledTableCell>
                    
                </StyledTableCell>
                : null
            }
            {props.header
                .filter((headerColumn, ind) => ind <= props.colIndVisible)
                .map((headerColumnVisible, index) =>
                
                    <StyledTableCell key={`thc-${index}`} >                                            
                        {/* {headerColumnVisible.name} */}
                        {/* <DropdownButton id="dropdown-item-button" >
                            
                            <Dropdown.Item as="button"><FcAlphabeticalSortingAz/> <small>Sort A to Z</small></Dropdown.Item>
                            <Dropdown.Item as="button"><FcAlphabeticalSortingZa/> <small>Sort Z to A</small></Dropdown.Item>
                            <SearchByColumn 
                                column={headerColumnVisible.prop}                                
                                clickedSearch={submitSearchHandler}
                                clickedReset={resetSearchHandler}
                            />
                            
                        </DropdownButton> */}
                    </StyledTableCell>
                )             
            } 
        </StyledTableRow>
        
        
    ); 
};

CustomHeaderTableRow.propTypes = {
    header: PropTypes.array.isRequired,
    colTot: PropTypes.number.isRequired,
    colIndVisible: PropTypes.number.isRequired,    
};

export default CustomHeaderTableRow;