import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Hidden from '@material-ui/core/Hidden';
// import Box from '@material-ui/core/Box';
// import Collapse from '@material-ui/core/Collapse';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';

import StyledTableRow from '../StyledTableRow/StyledTableRow';
import StyledTableCell from '../StyledTableRow/StyledTableCell/StyledTableCell';

const CustomHeaderTableRow = props => {
    return (
        <StyledTableRow>
            {(props.colTot - 1) > props.colIndVisible
                // <Hidden {...hideCell(columnsTotal - 1, 'arrow')}>
                    ? <StyledTableCell>
                        
                    </StyledTableCell>
                    : null
                // </Hidden>
            }
            {/* {(columnsTotal - 1) > columnIndexVisible ? */
                props.header
                    .filter((headerColumn, ind) => ind <= props.colIndVisible)
                    .map((headerColumnVisible, index) =>
                        // <Hidden {...hideCell(index)} key={`thc-${index}`}>
                            <StyledTableCell key={`thc-${index}`}>                                            
                                {headerColumnVisible.name}
                            </StyledTableCell>                                        
                        // </Hidden>
                    )
                /* : null */
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