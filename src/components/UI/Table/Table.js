import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

const TableCustom = (props) => {
    //console.log(props); 
    const breakpoints = useBreakpoint();


    const useStyles = makeStyles({
        table: {
            minWidth: 300,
        },
        root: {
            width: '100%',
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
        columnIndexVisible = 5;
    } else if (breakpoints.md && !breakpoints.sm) {
        columnIndexVisible = 3;
    } else if (breakpoints.sm && !breakpoints.xs) {
        columnIndexVisible = 1;
    } else if (breakpoints.xs) {
        columnIndexVisible = 0;
    } else {
        columnIndexVisible = 7;
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
        const { count, page, rowsPerPage, onChangePage } = props;
      
        const handleFirstPageButtonClick = (event) => {
          onChangePage(event, 0);
        };
      
        const handleBackButtonClick = (event) => {
          onChangePage(event, page - 1);
        };
      
        const handleNextButtonClick = (event) => {
          onChangePage(event, page + 1);
        };
      
        const handleLastPageButtonClick = (event) => {
          onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
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
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="next page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="last page"
            >
              {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
          </div>
        );
    }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onChangePage: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rowClose, setRowClose] = useState(false);

    const rowCloseResetHandler = () => {
        setRowClose(false);
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        setRowClose(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    
    const columnsTotal = props.header.length;    
    
    let emptyRowHeight = (columnsTotal - 1) > columnIndexVisible ? 62 : 52;
    let colSpanPagination = (columnsTotal - 1) > columnIndexVisible ? columnsTotal : (columnIndexVisible + 1);


    const classes = useStyles();
    const classesTablePagination = useStylesTablePagination();

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Paper>
                <TableContainer component={Paper} className={classes.container}>
                    <Table className={classes.table} stickyHeader>
                        <TableHead>
                            <CustomHeaderTableRow
                                header={props.header}
                                colTot={columnsTotal}
                                colIndVisible={columnIndexVisible} 
                            />
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : props.data
                            ).map((x, i) =>
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
                                <TableRow style={{ height: emptyRowHeight * emptyRows }}>
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
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    classes={{
                                        toolbar: classesTablePagination.toolbar,
                                        selectRoot: classesTablePagination.selectRoot,
                                    }}
                                    labelRowsPerPage={breakpoints.xs ? null : 'Rows per page:'}
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={colSpanPagination}
                                    count={props.data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default withRouter(TableCustom);