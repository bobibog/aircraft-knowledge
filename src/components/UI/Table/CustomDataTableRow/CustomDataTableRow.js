import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

const styles = {
    cardContent: {
        padding: 8,
    },
};

const CustomDataTableRow = (props) => {
    //console.log(props);
    const {classes} = props
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
            width: 150,
            //height: 60,
            //display: 'flex',
            // flexGrow: 1,
            borderBottom: 'none',
            boxShadow: 'none'
        },
        rootCardContent: {
            padding: 2,
            // display: 'flex',
            // justifyContent: 'flex-start',
            // alignItems: 'center',
        },
        titleCard: {
            fontSize: 14,
        },
        rootBox: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        rootTypography: {
            //display: 'ínline-block',
            margin: 2,
            fontSize: 14,
        },
    });

    const classesMake = useStyles();

    const {rowArrowCloseReset} = props; //we had to destructure rowArrowCloseReset from props to avoid that useEffect depends on all props!
    useEffect(() => {
        if ((props.colTot - 1) <= props.colIndVisible || props.rowArrowClose) {
            setOpen(false);
            rowArrowCloseReset();
        }
    }, [props.colTot, props.colIndVisible, props.rowArrowClose, rowArrowCloseReset]);

    // const setParameterRoute = (rowData, paramsRoute) => {
    //     let route = paramsRoute.baseRoute + "/";
    //     const params = [];
    //     for (const param of paramsRoute.params) {
    //         if (rowData[param]) {
    //             params.push(rowData[param]);
    //         }
    //     }
    //     route += params.join(paramsRoute.delimiter);
    //     return route
    // };

    const getApiModelPropValue = (rowData, apiModelHeaderColumn) => {
        //const propList = apiModelHeaderColumn.prop.trim().split('.');
        // let apiModelPropValue = rowData;
        // for (const modelProp of propList) {
        //     apiModelPropValue = apiModelPropValue[modelProp];
        // }
        let dataCellContent = "-";
        let toLinkRoute = null;
        let toLinkRouteBase = null;
        let toLinkRouteParam = null;

        if (rowData[apiModelHeaderColumn.prop]) {
            if (apiModelHeaderColumn.linkRoute) {
                toLinkRouteBase = apiModelHeaderColumn.linkRoute[0];
                toLinkRouteParam = rowData[apiModelHeaderColumn.linkRoute[1]];
                toLinkRoute = toLinkRouteBase + "/" + toLinkRouteParam;
            }          
            
            if (apiModelHeaderColumn.type) {
                if (apiModelHeaderColumn.type.indexOf("Header") !== -1) {
                    //const nameOfType = apiModelHeaderColumn.type.trim().split("Header")[0];            
                    let dataCellContentFirstPart = '';
                    let dataCellContentSecondPart = '';
                    let dataCellContentThirdPart = '';
                    let dataCellContentFourthPart = '';
                    let dataCellContentFifthPart = '';
                    let dataCellContentSixthPart = '';
                    if (apiModelHeaderColumn.dataCellCreator) {
                        if (apiModelHeaderColumn.dataCellCreator[0]) {
                            dataCellContentFirstPart = rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[0]]
                            ? rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[0]]
                            : '—';
                        }
                        if (apiModelHeaderColumn.dataCellCreator[1]) {
                            dataCellContentSecondPart = apiModelHeaderColumn.dataCellCreator[1];
                        }
                        if (apiModelHeaderColumn.dataCellCreator[2]) {
                            dataCellContentThirdPart = rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[2]]
                            ? rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[2]]
                            : '—';
                        }
                        if (apiModelHeaderColumn.dataCellCreator[3]) {
                            dataCellContentFourthPart = apiModelHeaderColumn.dataCellCreator[3];
                        }
                        if (apiModelHeaderColumn.dataCellCreator[4]) {
                            dataCellContentFifthPart = rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[4]]
                            ? rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.dataCellCreator[4]]
                            : '—';
                        }
                        if (apiModelHeaderColumn.dataCellCreator[5]) {
                            dataCellContentSixthPart = apiModelHeaderColumn.dataCellCreator[5];
                        }
                        
                        dataCellContent = dataCellContentFirstPart + dataCellContentSecondPart
                            + dataCellContentThirdPart + dataCellContentFourthPart
                            + dataCellContentFifthPart + dataCellContentSixthPart;                                        
                    }
                    if(apiModelHeaderColumn.linkRoute) {
                        toLinkRouteBase = apiModelHeaderColumn.linkRoute[0];
                        toLinkRouteParam = rowData[apiModelHeaderColumn.prop][apiModelHeaderColumn.linkRoute[1]];
                        toLinkRoute = toLinkRouteBase + "/" + toLinkRouteParam;           
                    }
                } else {
                    let apiModelPropValue = rowData[apiModelHeaderColumn.prop];
                    if (apiModelPropValue) {
                        if (apiModelHeaderColumn.type === "datetime") {
                            let d = new Date(apiModelPropValue);
                            const monthNames = ["jan", "feb", "mar", "apr", "may", "jun",
                                "jul", "aug", "sep", "oct", "nov", "dec"
                            ];
                            apiModelPropValue = d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear()+" / "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
                        } 
                        else if (apiModelHeaderColumn.type === "timespan") {
                            if (apiModelPropValue.value) {
                                let minutes = apiModelPropValue.value.minutes;
                                if (minutes < 10) {
                                    if (minutes !== 0) {
                                        minutes = "0" + minutes;
                                    } else {
                                        minutes = "00";
                                    }                                    
                                }
                                apiModelPropValue = apiModelPropValue.value.hours + ":" + minutes;                                
                        }
                        // else if (apiModelHeaderColumn.type === "button") {
                        //     if (apiModelPropValue.value) {
                        //         let minutes = apiModelPropValue.value.minutes;
                        //         if (minutes < 10) {
                        //             if (minutes !== 0) {
                        //                 minutes = "0" + minutes;
                        //             } else {
                        //                 minutes = "00";
                        //             }                                    
                        //         }
                        //         apiModelPropValue = apiModelPropValue.value.hours + ":" + minutes;                                
                        // }
                        else {
                                apiModelPropValue = "-"    
                            }
                        }            
                    } else {
                        apiModelPropValue = "-"
                    }
                    dataCellContent = apiModelPropValue;
                }
            } else {
                dataCellContent = rowData[apiModelHeaderColumn.prop];
            }
            
            if(apiModelHeaderColumn.linkRoute) {
                dataCellContent = 
                    <Link to={toLinkRoute} className={classesCss.a}>
                        {dataCellContent}
                    </Link>            
            }
        }

        return dataCellContent;
    };

    return (
        <React.Fragment key={`frag-${props.rowIndex}`}>
            <StyledTableRow key={`tr-${props.rowIndex}`} className={classesMake.tableRow}>
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
                        // let dataTableCell = props.rowData[headerColumnVisible.prop]; 
                        // let dataTableCell = getApiModelPropValue(props.rowData, headerColumnVisible);
                        // if (props.parametersRoute && index === 0) {
                        //     if (props.rowData[headerColumnVisible.prop]) {
                        //         dataTableCell = 
                        //             <Link to={setParameterRoute(props.rowData, props.parametersRoute)} className={classesCss.a}>
                        //                 {props.rowData[headerColumnVisible.prop]}
                        //             </Link>
                        //     } else {
                        //         dataTableCell = "-"; 
                        //     }                        
                        // }
                        // let dataTableCell = "-";
                        // if (props.rowData[headerColumnVisible.prop]) {
                            const dataTableCell = getApiModelPropValue(props.rowData, headerColumnVisible);
                        // }

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
                            <Box margin={0} className={classesMake.rootBox}>
                                {(props.colTot - 1) > props.colIndVisible
                                    ? props.header
                                        .filter((headerColumn, ind) => ind > props.colIndVisible)
                                        .map((headerColumnHidden, index) => {
                                            let dataCollapsCard = getApiModelPropValue(props.rowData, headerColumnHidden);
                                            return (
                                                <Card className={classesMake.rootCard} key={`trch-${index}`}>
                                                    <CardContent style={{padding: 2}} className={classes.cardContent}>
                                                        <Typography className={[classesMake.titleCard, classesMake.rootTypography].join(' ')} color="textSecondary" gutterBottom>
                                                            {headerColumnHidden.name} :
                                                        </Typography>
                                                        {/* <Typography variant="h5" component="h2">
                                                        be{bull}nev{bull}o{bull}lent
                                                        </Typography>
                                                        <Typography className={classesMake.pos} color="textSecondary">
                                                        adjective
                                                        </Typography> */}
                                                        <Typography variant="body2" component="p" className={classesMake.rootTypography}>
                                                            {dataCollapsCard}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            );
                                        })
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

export default withRouter(withStyles(styles)(CustomDataTableRow));