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
//import Hidden from '@material-ui/core/Hidden';
//import Box from '@material-ui/core/Box';
//import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
//import CardContent from '@material-ui/core/CardContent';
//import useMediaQuery from '@material-ui/core/useMediaQuery';
//import withWidth from '@material-ui/core/withWidth';
//import throttle from 'lodash/throttle';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import useBreakpoint from '../../../hooks/useBreakpoint';
//import useBreakpoints from '../../../hooks/useBreakpoints';
import CustomHeaderTableRow from './CustomHeaderTableRow/CustomHeaderTableRow';
import CustomDataTableRow from './CustomDataTableRow/CustomDataTableRow';

const TableCustom = (props) => { 
    const breakpoints = useBreakpoint();
  
    // const matchingList = Object.keys(breakpoints).map(media => (
    //     <li key={media}>{media} ---- {breakpoints[media] ? 'Yes' : 'No'}</li>
    // ))  

    //const point = useBreakpoints();    


    const useStyles = makeStyles({
        table: {
            minWidth: 300,
        },
        root: {
            width: '100%',
        },
        // container: {
        //     maxHeight: 540,
        // },
        tableRow: {
            '& *': {
              borderBottom: 'unset',
            },
        },
        rootCard: {
            minWidth: 300,
            height: 40,
            display: 'flex',
            flexGrow: 1,
            borderBottom: 'none',
            boxShadow: 'none',
        },
        rootCardContent: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        titleCard: {
            fontSize: 14,
        },
        rootBox: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        rootTypography: {
            display: 'ínline-block',
            margin: 2,
        },
        // rootTablePagination: {            
        //     width: '100%',                        
        // },
        // posCard: {
        //     marginBottom: 12,
        // },
        // tableContainer: {
        //     overflowX: 'auto'
        // }
    });

    const useStyles1 = makeStyles((theme) => ({
        root: {
          flexShrink: 0,
          marginLeft: theme.spacing(2.5),
        },
      }));

    // const StyledTableCell = withStyles((theme) => ({
    //     head: {
    //     //   backgroundColor: theme.palette.common.black,
    //         backgroundColor: 'rgb(0, 112, 192)',
    //         color: theme.palette.common.white,        
    //     },
    //     body: {
    //     fontSize: 14,
    //     },
    // }))(TableCell);
    
    // const StyledTableRow = withStyles((theme) => ({
    //     root: {
    //         // '&:nth-of-type(4n+1)': {
    //         //     backgroundColor: theme.palette.action.hover,
    //         // },
    //         '&:nth-of-type(odd):hover': {
    //             backgroundColor: 'rgb(252, 242, 34)',
    //             //color: theme.palette.common.white,
    //             color: 'rgb(0, 112, 192)',
    //         },
    //         // '&:nth-of-type(odd):hover + tr *': {
    //         //     backgroundColor: 'rgb(252, 242, 34)',
    //         //     //color: theme.palette.common.white,
    //         //     color: 'rgb(0, 112, 192)',
    //         // },
    //         // '&:nth-of-type(even):hover': {
    //         //     backgroundColor: 'rgb(252, 242, 34)',
    //         //     //color: theme.palette.common.white,
    //         //     color: 'rgb(0, 112, 192)',
    //         // },            
    //         '&:not(:first-of-type):hover *': {
    //             color: 'rgb(0, 112, 192)',
    //         }
    //     },
    // }))(TableRow);

    // const breakpointXl = 11;
    // const breakpointLg = 5;
    // const breakpointMd = 3;
    // const breakpointSm = 1;
    // let breakpointArrow = '';

    // const hideCell = (index, type=null) => {
    //     let result = {};
    //     if (index > breakpointXl) {
    //         if (type !== 'arrow') {
    //             result = {xlDown: true};
    //         } else {
    //             result = {};
    //             breakpointArrow = '';
    //         }        
    //     } else if (index > breakpointLg && index <= breakpointXl) {        
    //         if (type !== 'arrow') {
    //             result = {lgDown: true};
    //         } else {
    //             result = {xlUp: true};
    //             breakpointArrow = 'xl';
    //         }   
    //     } else if (index > breakpointMd && index <= breakpointLg) {        
    //         if (type !== 'arrow') {
    //             result = {mdDown: true};
    //         } else {
    //             result = {lgUp: true};
    //             breakpointArrow = 'lg';
    //         } 
    //     } else if (index > breakpointSm && index <= breakpointMd) {        
    //         if (type !== 'arrow') {
    //             result = {smDown: true};
    //         } else {
    //             result = {mdUp: true};
    //             breakpointArrow = 'md';
    //         } 
    //     } else if (index === breakpointSm) {        
    //         if (type !== 'arrow') {
    //             result = {xsDown: true};
    //         } else {
    //             result = {smUp: true};
    //             breakpointArrow = 'sm';
    //         } 
    //     }
    //     return result;
    // };

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
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    
    const columnsTotal = props.header.length;
    const classes = useStyles();

    // const theme = useTheme();
    // hideCell(columnsTotal - 1, 'arrow')
    // const matches = useMediaQuery(theme.breakpoints.up(breakpointArrow));    

    // const onMouseOverHandler = (event) => {
    //     const el = event.target;
    //     const elTr = el.closest('tr');
    //     const elTrHasDiv = elTr.querySelector('div') != null        
    //     if (elTrHasDiv) {
    //         elTr.style.backgroundColor = 'rgb(252, 242, 34)';
    //         el.style.backgroundColor = 'rgb(252, 242, 34)';
    //         const prevTr = elTr.previousSibling;
    //         prevTr.style.backgroundColor = 'rgb(252, 242, 34)';
    //     }        
    // }

    // const Row = (x, i, header, breakpoints) => {
    // const Row = (props) => {
    //     const [open, setOpen] = useState(false);

    //     //let xy = breakpoints.sm;

    //     useEffect((prevProps, prevState) => {
    //         if ((props.colTot - 1) <= props.colIndVisible) {
    //             setOpen(false);
    //         }
    //     }, [props.colTot, props.colIndVisible])

    //     // throttle(()=> {if (!xy) {
    //     //     setOpen(false);
    //     // }}, 200);

    //     // if (mediaQuery) {
    //     //     setOpen(false)
    //     // }        

    //     return (
    //         <React.Fragment key={`frag-${props.rowIndex}`}>
    //             <StyledTableRow key={`tr-${props.rowIndex}`} className={classes.tableRow}>
    //                 {/* <Hidden {...hideCell(columnsTotal - 1, 'arrow')}> */}
    //                 {(props.colTot - 1) > props.colIndVisible
    //                     ? <StyledTableCell>
    //                         <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
    //                             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    //                         </IconButton>
    //                     </StyledTableCell>
    //                     : null
    //                 }
    //                 {/* </Hidden> */}
    //                 {props.header
    //                     .filter((headerColumn, ind) => ind <= props.colIndVisible)
    //                     .map((headerColumnVisible, index) =>
    //                     // <Hidden {...hideCell(index)} key={`trc-${index}`}>
    //                         <StyledTableCell key={`trc-${index}`}>
    //                             {props.rowData[headerColumnVisible.prop]}
    //                         </StyledTableCell>
    //                     // </Hidden>
    //                     )
    //                 }                    
    //             </StyledTableRow>
                
    //             {/* <StyledTableRow onMouseEnter={onMouseOverHandler}>                     */}
    //             <StyledTableRow>
    //                 {/* <Hidden {...hideCell(columnsTotal - 1, 'arrow')}> */}
                    
    //                             <StyledTableCell style={{ 
    //                                 paddingBottom: 0, 
    //                                 paddingTop: 0, 
    //                                 paddingLeft: 0, 
    //                                 paddingRight: 0 }} 
    //                                 colSpan={
    //                                     (props.colTot - 1) > props.colIndVisible
    //                                     ? props.colIndVisible + 2
    //                                     : props.colIndVisible + 1
    //                                 }
    //                             >
    //                                 <Collapse in={open} timeout="auto" unmountOnExit >
    //                                         <Box margin={0} className={classes.rootBox}>
    //                                             {(props.colTot - 1) > props.colIndVisible
    //                                                 ? props.header
    //                                                     .filter((headerColumn, ind) => ind > props.colIndVisible)
    //                                                     .map((headerColumnHidden, index) =>
    //                                                         <Card className={classes.rootCard} key={`trch-${index}`}>
    //                                                             <CardContent className={classes.rootCardContent}>
    //                                                                 <Typography className={[classes.titleCard, classes.rootTypography].join(' ')} color="textSecondary" gutterBottom>
    //                                                                     {headerColumnHidden.name} :
    //                                                                 </Typography>
    //                                                                 {/* <Typography variant="h5" component="h2">
    //                                                                 be{bull}nev{bull}o{bull}lent
    //                                                                 </Typography>
    //                                                                 <Typography className={classes.pos} color="textSecondary">
    //                                                                 adjective
    //                                                                 </Typography> */}
    //                                                                 <Typography variant="body2" component="p" className={classes.rootTypography}>
    //                                                                     {props.rowData[headerColumnHidden.prop]}
    //                                                                 </Typography>
    //                                                             </CardContent>
    //                                                         </Card>
    //                                                     )
    //                                                 : null 
    //                                             }                       
    //                                         </Box>
    //                                 </Collapse>    
    //                             </StyledTableCell>
                            
    //                 {/* </Hidden>                                                   */}
    //             </StyledTableRow>                  
    //         </React.Fragment>
    //     );
    // };

    // Row.propTypes = {
    //     rowData: PropTypes.object.isRequired,
    //     rowIndex: PropTypes.number.isRequired,
    //     header: PropTypes.array.isRequired,
    //     colTot: PropTypes.number.isRequired,
    //     colIndVisible: PropTypes.number.isRequired,
    // };
    // aria-label="simple table"

    let emptyRowHeight = (columnsTotal - 1) > columnIndexVisible ? 62 : 52;
    let colSpanPagination = (columnsTotal - 1) > columnIndexVisible ? columnsTotal : (columnIndexVisible + 1);

    return (
        <React.Fragment>
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
                                {/* <StyledTableRow>
                                    {(columnsTotal - 1) > columnIndexVisible
                                        // <Hidden {...hideCell(columnsTotal - 1, 'arrow')}>
                                            ? <StyledTableCell>
                                                
                                            </StyledTableCell>
                                            : null
                                        // </Hidden>
                                    }
                                    
                                    {props.header
                                        .filter((headerColumn, ind) => ind <= columnIndexVisible)
                                        .map((headerColumnVisible, index) =>
                                            // <Hidden {...hideCell(index)} key={`thc-${index}`}>
                                                <StyledTableCell key={`thc-${index}`}>                                            
                                                    {headerColumnVisible.name}
                                                </StyledTableCell>                                        
                                            // </Hidden>
                                        )                                        
                                    }
                                </StyledTableRow> */}
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : props.data
                                ).map((x, i) => 
                                    // Row(x, i, props.header, breakpoints))}
                                    <CustomDataTableRow
                                        key={`dr-${i}`} 
                                        rowData={x}
                                        rowIndex={i}
                                        header={props.header}
                                        colTot={columnsTotal}
                                        colIndVisible={columnIndexVisible} 
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
                                        // className={classes.rootTablePagination}
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

            {/* <ol>
            {matchingList}
            </ol> */}

            {/* <div>
                <h2> Current Device Type {point} </h2>
            </div> */}
        </React.Fragment>
    );
};

export default TableCustom;