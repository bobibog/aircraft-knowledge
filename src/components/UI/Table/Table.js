import React, {useState, useContext} from 'react';
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
import useBreakpoint from '../../../context/breakpoint-context';

const TableCustom = (props) => { 
    const breakpoints = useBreakpoint();
  
    const matchingList = Object.keys(breakpoints).map(media => (
        <li key={media}>{media} ---- {breakpoints[media] ? 'Yes' : 'No'}</li>
    ))  

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
            '& > *': {
              borderBottom: 'unset',
            },
        },
        rootCard: {
            minWidth: 300,
        },
        titleCard: {
            fontSize: 14,
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
            '&:hover *': {
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

    const Row = (x, i, header) => {
        const [open, setOpen] = useState(false);

        // if (mediaQuery) {
        //     setOpen(false)
        // }        

        return (
            <React.Fragment key={`frag-${i}`}>
                <StyledTableRow key={`tr-${i}`} className={classes.tableRow}>
                    <Hidden {...hideCell(columnsTotal - 1, 'arrow')}>
                        <StyledTableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </StyledTableCell>
                    </Hidden>
                    {header.map((y, k) =>
                        <Hidden {...hideCell(k)} key={`trc-${k}`}>
                            <StyledTableCell>
                                {x[y.prop]}
                            </StyledTableCell>
                        </Hidden>
                    )}                    
                </StyledTableRow>
                
                {/* <StyledTableRow onMouseEnter={onMouseOverHandler}>                     */}
                <StyledTableRow>
                    <Hidden {...hideCell(columnsTotal - 1, 'arrow')}>
                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 0, paddingRight: 0 }} colSpan={3}>
                            <Collapse in={open} timeout="auto" unmountOnExit >
                                    <Box margin={0}>
                                        <Card className={classes.rootCard}>
                                            <CardContent>
                                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                    Fleet
                                                </Typography>
                                                {/* <Typography variant="h5" component="h2">
                                                be{bull}nev{bull}o{bull}lent
                                                </Typography>
                                                <Typography className={classes.pos} color="textSecondary">
                                                adjective
                                                </Typography> */}
                                                <Typography variant="body2" component="p">
                                                    38
                                                </Typography>
                                            </CardContent>
                                        </Card>                        
                                    </Box>
                            </Collapse>    
                        </StyledTableCell>
                    </Hidden>                                                  
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
                                {props.data.map((x, i) => Row(x, i, props.header))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Paper>
                </Grid>
            </Grid>

            <ol>
            {matchingList}
            </ol>
        </React.Fragment>
    );
};

export default TableCustom;