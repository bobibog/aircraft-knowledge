import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import StyledTableRow from '../StyledTableRow/StyledTableRow';
import StyledTableCell from '../StyledTableRow/StyledTableCell/StyledTableCell';

const CustomDataTableRow = (props) => {
    const [open, setOpen] = useState(false);

    const useStyles = makeStyles({
        // table: {
        //     minWidth: 300,
        // },
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
    });

    const classes = useStyles();

    //let xy = breakpoints.sm;

    useEffect((prevProps, prevState) => {
        if ((props.colTot - 1) <= props.colIndVisible) {
            setOpen(false);
        }
    }, [props.colTot, props.colIndVisible]);

    return (
        <React.Fragment key={`frag-${props.rowIndex}`}>
            <StyledTableRow key={`tr-${props.rowIndex}`} className={classes.tableRow}>
                {/* <Hidden {...hideCell(columnsTotal - 1, 'arrow')}> */}
                {(props.colTot - 1) > props.colIndVisible
                    ? <StyledTableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </StyledTableCell>
                    : null
                }
                {/* </Hidden> */}
                {props.header
                    .filter((headerColumn, ind) => ind <= props.colIndVisible)
                    .map((headerColumnVisible, index) =>
                    // <Hidden {...hideCell(index)} key={`trc-${index}`}>
                        <StyledTableCell key={`trc-${index}`}>
                            {props.rowData[headerColumnVisible.prop]}
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
                                    (props.colTot - 1) > props.colIndVisible
                                    ? props.colIndVisible + 2
                                    : props.colIndVisible + 1
                                }
                            >
                                <Collapse in={open} timeout="auto" unmountOnExit >
                                        <Box margin={0} className={classes.rootBox}>
                                            {(props.colTot - 1) > props.colIndVisible
                                                ? props.header
                                                    .filter((headerColumn, ind) => ind > props.colIndVisible)
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
                                                                    {props.rowData[headerColumnHidden.prop]}
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

CustomDataTableRow.propTypes = {
    rowData: PropTypes.object.isRequired,
    rowIndex: PropTypes.number.isRequired,
    header: PropTypes.array.isRequired,
    colTot: PropTypes.number.isRequired,
    colIndVisible: PropTypes.number.isRequired,
};

export default CustomDataTableRow;