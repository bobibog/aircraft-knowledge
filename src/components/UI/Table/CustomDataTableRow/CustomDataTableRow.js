import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import StyledTableRow from '../StyledTableRow/StyledTableRow';
import StyledTableCell from '../StyledTableRow/StyledTableCell/StyledTableCell';
import classesCss from './CustomDataTableRow.module.css';

const CustomDataTableRow = (props) => {
    //console.log(props);
    const [open, setOpen] = useState(false);

    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        tableRow: {
            '& *': {
              borderBottom: 'unset',
            },
        },
        rootCard: {
            maxWidth: 300,
            height: 40,
            display: 'flex',
            // flexGrow: 1,
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
            fontSize: 16,
        },
    });

    const classes = useStyles();

    const {rowArrowCloseReset} = props; //we had to destructure rowArrowCloseReset from props to avoid that useEffect depends on all props!
    useEffect(() => {
        if ((props.colTot - 1) <= props.colIndVisible || props.rowArrowClose) {
            setOpen(false);
            rowArrowCloseReset();
        }
    }, [props.colTot, props.colIndVisible, props.rowArrowClose, rowArrowCloseReset]);

    const setParameterRoute = (rowData, paramsRoute) => {
        let route = paramsRoute.baseRoute + "/";
        const params = [];
        for (const param of paramsRoute.params) {
            if (rowData[param]) {
                params.push(rowData[param]);
            }
        }
        route += params.join(paramsRoute.delimiter);
        return route
    };

    const getApiModelPropValue = (rowData, apiModelHeaderColumn) => {
        const propList = apiModelHeaderColumn.prop.trim().split('.');
        let apiModelPropValue = rowData;
        for (const modelProp of propList) {
            apiModelPropValue = apiModelPropValue[modelProp];
        }
        if (apiModelPropValue) {
            if (apiModelHeaderColumn.type === "datetime") {
                let d = new Date(apiModelPropValue);
                const monthNames = ["jan", "feb", "mar", "apr", "may", "jun",
                    "jul", "aug", "sep", "oct", "nov", "dec"
                ];
                apiModelPropValue = d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear();
            } else if (apiModelHeaderColumn.type === "timespan") {
                let minutes = apiModelPropValue.value.minutes !== 0 ? apiModelPropValue.value.minutes : "00";
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                apiModelPropValue = apiModelPropValue.value.hours + ":" + minutes;
            }            
        }

        return apiModelPropValue;
    };

    return (
        <React.Fragment key={`frag-${props.rowIndex}`}>
            <StyledTableRow key={`tr-${props.rowIndex}`} className={classes.tableRow}>
                {(props.colTot - 1) > props.colIndVisible
                    ? <StyledTableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </StyledTableCell>
                    : null
                }

                {props.header
                    .filter((headerColumn, ind) => ind <= props.colIndVisible)
                    .map((headerColumnVisible, index) => {
                        if (headerColumnVisible.type) {
                            
                        }
                        // let dataTableCell = props.rowData[headerColumnVisible.prop]; 
                        let dataTableCell = getApiModelPropValue(props.rowData, headerColumnVisible);
                        if (props.parametersRoute && index === 0) {
                            dataTableCell = (
                                <Link to={setParameterRoute(props.rowData, props.parametersRoute)} className={classesCss.a}>
                                    {props.rowData[headerColumnVisible.prop]}
                                </Link>
                            );
                        }
                        return (
                        <StyledTableCell key={`trc-${index}`}>
                            {dataTableCell}
                        </StyledTableCell>
                        )
                    })
                }                    
            </StyledTableRow>
            
            <StyledTableRow>
                <StyledTableCell 
                    style={{ 
                        paddingBottom: 0, 
                        paddingTop: 0, 
                        paddingLeft: 0, 
                        paddingRight: 0 
                    }} 
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
    rowArrowClose: PropTypes.bool.isRequired,
    rowArrowCloseReset: PropTypes.func.isRequired
};

export default withRouter(CustomDataTableRow);