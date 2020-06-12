import React from 'react';
import PropTypes from 'prop-types';

import StyledTableRow from '../StyledTableRow/StyledTableRow';
import StyledTableCell from '../StyledTableRow/StyledTableCell/StyledTableCell';

const CustomHeaderTableRow = props => {
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
                    <StyledTableCell key={`thc-${index}`}>                                            
                        {headerColumnVisible.name}
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