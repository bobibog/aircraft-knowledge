import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import useMediaQuery from '@material-ui/core/useMediaQuery';
//import withWidth from '@material-ui/core/withWidth';
import useBreakpoint from '../../../hooks/useBreakpoint';
//import useBreakpoints from '../../../hooks/useBreakpoints';
//import throttle from 'lodash/throttle';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

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
        // posCard: {
        //     marginBottom: 12,
        // },
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
            // '&:nth-of-type(4n+1)': {
            //     backgroundColor: theme.palette.action.hover,
            // },
            '&:nth-of-type(odd):hover': {
                backgroundColor: 'rgb(252, 242, 34)',
                //color: theme.palette.common.white,
                color: 'rgb(0, 112, 192)',
            },
            // '&:nth-of-type(odd):hover + tr *': {
            //     backgroundColor: 'rgb(252, 242, 34)',
            //     //color: theme.palette.common.white,
            //     color: 'rgb(0, 112, 192)',
            // },
            // '&:nth-of-type(even):hover': {
            //     backgroundColor: 'rgb(252, 242, 34)',
            //     //color: theme.palette.common.white,
            //     color: 'rgb(0, 112, 192)',
            // },            
            '&:not(:first-of-type):hover *': {
                color: 'rgb(0, 112, 192)',
            }
        },
    }))(TableRow);

    const breakpointXl = 11;
    const breakpointLg = 5;
    const breakpointMd = 3;
    const breakpointSm = 1;
    let breakpointArrow = '';

    const hideCell = (index, type=null) => {
        let result = {};
        if (index > breakpointXl) {
            if (type !== 'arrow') {
                result = {xlDown: true};
            } else {
                result = {};
                breakpointArrow = '';
            }        
        } else if (index > breakpointLg && index <= breakpointXl) {        
            if (type !== 'arrow') {
                result = {lgDown: true};
            } else {
                result = {xlUp: true};
                breakpointArrow = 'xl';
            }   
        } else if (index > breakpointMd && index <= breakpointLg) {        
            if (type !== 'arrow') {
                result = {mdDown: true};
            } else {
                result = {lgUp: true};
                breakpointArrow = 'lg';
            } 
        } else if (index > breakpointSm && index <= breakpointMd) {        
            if (type !== 'arrow') {
                result = {smDown: true};
            } else {
                result = {mdUp: true};
                breakpointArrow = 'md';
            } 
        } else if (index === breakpointSm) {        
            if (type !== 'arrow') {
                result = {xsDown: true};
            } else {
                result = {smUp: true};
                breakpointArrow = 'sm';
            } 
        }
        return result;
    };

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

    // let arrowTableCell = null;
    const columnsTotal = props.header.length;
    // if (columnsTotal )
    // arrowTableCell

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

    const Row = (x, i, header, breakpoints) => {
        const [open, setOpen] = useState(false);

        let xy = breakpoints.sm;

        useEffect(() => {
            if (!xy) {
                setOpen(false);
            }
        }, [xy])

        // throttle(()=> {if (!xy) {
        //     setOpen(false);
        // }}, 200);

        // if (mediaQuery) {
        //     setOpen(false)
        // }        

        return (
            <React.Fragment key={`frag-${i}`}>
                <StyledTableRow key={`tr-${i}`} className={classes.tableRow}>
                    {/* <Hidden {...hideCell(columnsTotal - 1, 'arrow')}> */}
                    {(columnsTotal - 1) > columnIndexVisible
                        ? <StyledTableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                        : null
                    }
                    {/* </Hidden> */}
                    {header
                        .filter((headerColumn, ind) => ind <= columnIndexVisible)
                        .map((headerColumnVisible, index) =>
                        // <Hidden {...hideCell(index)} key={`trc-${index}`}>
                            <StyledTableCell key={`trc-${index}`}>
                                {x[headerColumnVisible.prop]}
                            </StyledTableCell>
                        // </Hidden>
                        )
                    }                    
                </StyledTableRow>
                
                {/* <StyledTableRow onMouseEnter={onMouseOverHandler}>                     */}
                <StyledTableRow>
                    {/* <Hidden {...hideCell(columnsTotal - 1, 'arrow')}> */}
                    
                                <StyledTableCell style={{ 
                                    paddingBottom: 0, 
                                    paddingTop: 0, 
                                    paddingLeft: 0, 
                                    paddingRight: 0 }} 
                                    colSpan={
                                        (columnsTotal - 1) > columnIndexVisible
                                        ? columnIndexVisible + 2
                                        : columnIndexVisible + 1
                                    }
                                >
                                    <Collapse in={open} timeout="auto" unmountOnExit >
                                            <Box margin={0} className={classes.rootBox}>
                                                {(columnsTotal - 1) > columnIndexVisible
                                                    ? header
                                                        .filter((headerColumn, ind) => ind > columnIndexVisible)
                                                        .map((headerColumnHidden, index) =>
                                                            <Card className={classes.rootCard} key={`trch-${index}`}>
                                                                <CardContent className={classes.rootCardContent}>
                                                                    <Typography className={[classes.titleCard, classes.rootTypography].join(' ')} color="textSecondary" gutterBottom>
                                                                        {headerColumnHidden.name} :
                                                                    </Typography>
                                                                    {/* <Typography variant="h5" component="h2">
                                                                    be{bull}nev{bull}o{bull}lent
                                                                    </Typography>
                                                                    <Typography className={classes.pos} color="textSecondary">
                                                                    adjective
                                                                    </Typography> */}
                                                                    <Typography variant="body2" component="p" className={classes.rootTypography}>
                                                                        {x[headerColumnHidden.prop]}
                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>
                                                        )
                                                    : null 
                                                }                       
                                            </Box>
                                    </Collapse>    
                                </StyledTableCell>
                            
                    {/* </Hidden>                                                   */}
                </StyledTableRow>                  
            </React.Fragment>
        );
    };
    // aria-label="simple table"

    return (
        <React.Fragment>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper>
                    <TableContainer component={Paper} className={classes.container}>
                        <Table className={classes.table} stickyHeader>
                            <TableHead>
                                <StyledTableRow>
                                    <Hidden {...hideCell(columnsTotal - 1, 'arrow')}>
                                        <StyledTableCell>
                                            
                                        </StyledTableCell>
                                    </Hidden>
                                    {props.header.map((x, i) =>
                                        <Hidden {...hideCell(i)} key={`thc-${i}`}>
                                            <StyledTableCell>                                            
                                                {x.name}
                                            </StyledTableCell>                                        
                                        </Hidden>
                                    )}
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {props.data.map((x, i) => Row(x, i, props.header, breakpoints))}
                            </TableBody>
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