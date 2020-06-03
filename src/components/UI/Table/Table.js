import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
//import withWidth from '@material-ui/core/withWidth';

const TableCustom = (props) => {

const useStyles = makeStyles({
    table: {
      minWidth: 400,
    },
    // tableContainer: {
    //     overflowX: 'auto'
    // }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
    //   backgroundColor: theme.palette.common.black,
        backgroundColor: 'rgb(0, 112, 192)',
        color: theme.palette.common.white,        
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:hover': {
        backgroundColor: 'rgb(252, 242, 34)',
        color: theme.palette.common.white,
      },
      '&:hover td': {
        color: 'rgb(0, 112, 192)',
      }
    },
  }))(TableRow);

const hideCell = (index) => {
    let result = {};
    if (index > 11) {
        result = {xlDown: true};
    } else if (index > 5 && index <= 11) {
        result = {lgDown: true};
    } else if (index > 3 && index <= 5) {
        result = {mdDown: true};
    } else if (index > 1 && index <= 3) {
        result = {smDown: true};
    } else if (index === 1) {
        result = {xsDown: true};
    }
    return result;
};

const row = (x, i, header) =>
    <StyledTableRow key={`tr-${i}`}>
        {/* <Grid container spacing={0}> */}
            {header.map((y, k) =>
                <Hidden {...hideCell(k)} key={`trc-${k}`}>
                    <StyledTableCell >
                        {/* <Grid item xs={12} sm={6} md={3} lg={2} xl={1}>
                            <div> */}
                                {x[y.prop]}
                            {/* </div>                            
                        </Grid> */}
                    </StyledTableCell>
                </Hidden>
            )}
        {/* </Grid> */}
    </StyledTableRow>;


    const classes = useStyles();

    // aria-label="simple table"

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <StyledTableRow>
                            {/* <Grid container spacing={0}> */}
                                {props.header.map((x, i) =>
                                    <Hidden {...hideCell(i)} key={`thc-${i}`}>
                                        <StyledTableCell >
                                            {/* <Grid item xs={12} sm={6} md={3} lg={2} xl={1}> 
                                                <div> */}
                                                    {x.name}
                                                {/* </div>                                                
                                            </Grid> */}
                                        </StyledTableCell>                                        
                                    </Hidden>
                                )}
                            {/* </Grid> */}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.map((x, i) => row(x, i, props.header))}
                    </TableBody>
                </Table>
            </TableContainer>
            </Grid>
        </Grid>
    )
};

export default TableCustom;