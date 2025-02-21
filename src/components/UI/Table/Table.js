import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {withRouter} from 'react-router-dom';

import useBreakpoint from '../../../hooks/useBreakpoint';
import CustomHeaderTableRow from './CustomHeaderTableRow/CustomHeaderTableRow';
import CustomDataTableRow from './CustomDataTableRow/CustomDataTableRow';
import { fontSize } from '@material-ui/system';
import { auto } from '@popperjs/core';
import { withStyles } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme, ThemeProvider } from '@material-ui/core';


const TableCustom = (props) => {
    //console.log(props); 
    const breakpoints = useBreakpoint();


    const useStyles = makeStyles({
        table: {            
            tableLayout: 'fixed',
            width: '100%', 
            marginTop:'90px'
            
        }, 
        cell:{
            root:{
              width: '100%',
              textAlign: 'center'  
            }            
        },             
        root: {
            width: '100%'            
        },
        tablePagination: {
            minWidth: 300,
        },
        spacer: {
            maxWidth: 20,
        },
        toolbar: {
            paddingLeft: 6,
        },
        body:{            
            textAlign: 'center',            
                      
        }
            
        // container: {
        //     maxHeight: 540,
        // },
    });   

    const useStylesTablePagination = makeStyles({
        // root: {
        //     width: '100%',
        // },
        // tablePagination: {
        //     minWidth: 300,
        // },
        // spacer: {
        //     width: 20,
        // },
        toolbar: {
            paddingLeft: 6,
        },        
        selectRoot: {
            marginRight: 20,
        },
        // container: {
        //     maxHeight: 540,
        // },
    });   


    let columnIndexVisible = 0;

    if (breakpoints.lg && !breakpoints.md) {
        columnIndexVisible = 6;
    } else if (breakpoints.md && !breakpoints.sm) {
        columnIndexVisible = 4;
    } else if (breakpoints.sm && !breakpoints.xs) {
        columnIndexVisible = 2;
    } else if (breakpoints.xs) {
        columnIndexVisible = 0;
    } else {
        columnIndexVisible = 8;
    }


    const useStyles1 = makeStyles((theme) => ({
        root: {
            flexShrink: 0,
            //   marginLeft: theme.spacing(2.5),
            marginLeft: theme.spacing(1.5),
            '& button': {
                paddingLeft: 8,
                paddingRight: 8,
            },
        },
    }));
    
    function TablePaginationActions(props) {
        const classes = useStyles1();
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange, notUseTotalCount } = props;
      
        const handleFirstPageButtonClick = (event) => {
          onPageChange(event, 0);
        };
      
        const handleBackButtonClick = (event) => {
          onPageChange(event, page - 1);
        };
      
        const handleNextButtonClick = (event) => {
          onPageChange(event, page + 1);
        };
      
        const handleLastPageButtonClick = (event) => {
          onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };
      
        return (
          <div className={classes.root}>
            <IconButton
              onClick={handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label="first page"
            >
              {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={notUseTotalCount ? (count - page * rowsPerPage <= rowsPerPage) : (page >= Math.ceil(count / rowsPerPage) - 1)}
              aria-label="next page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={notUseTotalCount ? true : (page >= Math.ceil(count / rowsPerPage) - 1)}
              aria-label="last page"
            >
              {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
          </div>
        );
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
        notUseTotalCount: PropTypes.bool
    };


    // const [page, setPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(props.currPage);
    // const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPageDef);
    
    const [rowClose, setRowClose] = useState(false);

    const rowCloseResetHandler = () => {
        setRowClose(false);
    }

    let emptyRows;
    if (props.notUseTotalCount) {
        emptyRows = rowsPerPage - Math.min(rowsPerPage, props.totalDataCount);
    }
    else {
        // const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);
        emptyRows = rowsPerPage - Math.min(rowsPerPage, props.totalDataCount - currentPage * rowsPerPage);
    }
    
    const handleChangePage = (event, newPage) => {
        props.setPageStore(newPage);
        setCurrentPage(newPage);
        setRowClose(true);
        let newOffset = newPage * rowsPerPage;
        props.changeOffsetOrLimit(newOffset, rowsPerPage);
    };

    const handleChangeRowsPerPage = (event) => {
        let changedRowsPerPage = parseInt(event.target.value, 10)
        setRowsPerPage(changedRowsPerPage);
        props.setPageStore(0);
        setCurrentPage(0);
        // props.changeOffsetOrLimit(0, rowsPerPage);
        // if (changedRowsPerPage !== -1) {
        //     props.changeOffsetOrLimit(0, event.target.value);
        // } else {
        //     props.changeOffsetOrLimit(0, 0);
        // }
        props.changeOffsetOrLimit(0, event.target.value);
        
    };
    
    const columnsTotal = props.header.length;    
    
    let emptyRowHeight = (columnsTotal - 1) > columnIndexVisible ? 62 : 52;
    let colSpanPagination = (columnsTotal - 1) > columnIndexVisible ? columnsTotal : (columnIndexVisible + 1);


    const classes = useStyles();
    const classesTablePagination = useStylesTablePagination();

    // let tableOrInfo = null;
    // if (props.data && props.data.length !== 0) {
        
    // }

   
    const theme1 = createMuiTheme({
        overrides: {
          // Style sheet name 
          MuiTableCell: {
            // Name of the rule
            root: {              
              textAlign:'center',
              width: '100%'
            },
          },
        },
      });

    //   const CustomPaginationActions = (props) => {
    //     const { count, page, rowsPerPage, onPageChange } = props;
      
    //     const handleBackButtonClick = (event) => {
    //       onPageChange(event, page - 1);
    //     };
      
    //     const handleNextButtonClick = (event) => {
    //       onPageChange(event, page + 1);
    //     };
      
    //     return (
    //       <div style={{ flexShrink: 0, marginLeft: '2.5em' }}>
    //         <IconButton
    //           onClick={handleBackButtonClick}
    //           disabled={page === 0}
    //           aria-label="previous page"
    //         >
    //           <KeyboardArrowLeft />
    //         </IconButton>
    //         <IconButton
    //           onClick={handleNextButtonClick}
    //           disabled={page >= Math.ceil(count / rowsPerPage) - 1}
    //           aria-label="next page"
    //         >
    //           <KeyboardArrowRight />
    //         </IconButton>
    //         {/* Last Page button is intentionally omitted */}
    //       </div>
    //     );
    //   };
      
    // Custom formatter using rowsPerPage
    const customLabelDisplayedRows = ({ from, to, count, page, rowsPerPage }) => {
        // if (count > rowsPerPage) {
        if (count - page * rowsPerPage > rowsPerPage) {
            return `${page * rowsPerPage + 1}-${page * rowsPerPage + +rowsPerPage} of more than ${page * rowsPerPage + +rowsPerPage}`;
        }
        else {
            // return `${page * rowsPerPage + 1}-${page * rowsPerPage + count} of ${page * rowsPerPage + count}`;
            return `${page * rowsPerPage + 1}-${count} of ${count}`;
        }
    };
        

    return (  
            
        <Grid container spacing={0} >
        
            <Grid item xs={12} >
                <Paper >
                    <TableContainer component={Paper} className={classes.container} >
                        {(props.data && props.data.length !== 0)
                            ? <Table  stickyHeader className={classes.table}>
                                <TableHead>
                                    <CustomHeaderTableRow
                                        header={props.header}
                                        colTot={columnsTotal}
                                        colIndVisible={columnIndexVisible} 
                                    />
                                </TableHead>
                               <ThemeProvider theme={theme1}>
                                <TableBody className={classes.body}>
                                
                                    {
                                    // (rowsPerPage > 0
                                    //     ? props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    //     : props.data
                                    // )
                                    props.data
                                    .map((x, i) =>
                                        <CustomDataTableRow
                                            key={`dr-${i}`} 
                                            rowData={x}
                                            rowIndex={i}
                                            header={props.header}
                                            colTot={columnsTotal}
                                            colIndVisible={columnIndexVisible}
                                            rowArrowClose={rowClose}
                                            rowArrowCloseReset={rowCloseResetHandler}
                                            parametersRoute={props.paramsRoute} 
                                            
                                        />
                                    )}
                                    
                                    {emptyRows > 0 && (                                        
                                        <TableRow style={{ height: emptyRowHeight * emptyRows}}   >
                                           
                                            <TableCell 
                                                
                                                colSpan={
                                                    (columnsTotal - 1) > columnIndexVisible
                                                    ? columnIndexVisible + 2
                                                    : columnIndexVisible + 1                                                    
                                                }
                                            />
                                        </TableRow>
                                    )}

                                    
                                   
                                </TableBody>
                                </ThemeProvider>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            classes={{
                                                toolbar: classesTablePagination.toolbar,
                                                selectRoot: classesTablePagination.selectRoot,
                                            }}
                                            labelRowsPerPage={breakpoints.xs ? null : 'Rows per page:'}
                                            rowsPerPageOptions={[10, 25, 50, 100, { label: 'All', value: -1 }]}
                                            //rowsPerPageOptions={[5, 10, 25, { label: 'All', value: props.totalDataCount }]}
                                            labelDisplayedRows={
                                                props.notUseTotalCount
                                                ? (paginationInfo) => customLabelDisplayedRows({ ...paginationInfo, rowsPerPage })
                                                : undefined // Fallback to default formatting
                                            }
                                            colSpan={colSpanPagination}
                                            // count={props.data.length}
                                            //must transfer next as count because MUI displays console warning when page number exceeds the number 
                                            // which MUI deduces from count!!! so we must always send count which is at least by one greater than page*rowsPerPage !!!
                                            count={
                                                props.notUseTotalCount
                                                ? (currentPage * (+rowsPerPage) + props.totalDataCount)
                                                : props.totalDataCount
                                            }
                                            rowsPerPage={+rowsPerPage}
                                            // page={!props.totalDataCount || props.totalDataCount <= 0 ? 0 : currentPage}
                                            page={currentPage}
                                            SelectProps={{
                                                inputProps: { 'aria-label': 'rows per page' },
                                                native: true,
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={(subProps) => (
                                                <TablePaginationActions
                                                    {...subProps}
                                                    notUseTotalCount={props.notUseTotalCount}
                                                />
                                            )}
                                            
                                        />
                                    </TableRow>
                                </TableFooter>                       
                                
                            </Table>
                            : <div style={{ marginTop:"95px" }}><p style={{ color:"red", fontSize:"26px" }}>There are no results for your search. Please reset Your search or enter new search term.</p></div>
                        }
                    </TableContainer>
                </Paper>
            </Grid>
            
        </Grid>
        
    );
};

export default (withRouter(TableCustom));