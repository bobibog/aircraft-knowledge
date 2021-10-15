import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
//import Collapse from '@material-ui/core/Collapse';
//import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
//import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
//import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {getApiModelPropValue} from '../../../shared/utility'
import { AutoSizer } from 'react-virtualized';
import zIndex from '@material-ui/core/styles/zIndex';

const CardsInBox = (props) => {
    const useStyles = makeStyles({
        // root: {
        //     width: '100%',
        // },
        // tableRow: {
        //     '& *': {
        //       borderBottom: 'unset',
        //     },
        // },
        rootCard: {
            
            borderBottom: 'none',            
            border: 'none',
            boxShadow: 'none',
            backgroundColor: props.backColor,
                        
        },
        rootCardContent: {
            padding: 2,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',            
            // alignItems: 'center',
            //color: 'white',
        },
        titleCard: {
            fontSize: 14,
            //color: 'white',            
        },
        rootBox: {
            display: 'flex',
            flexWrap: 'wrap',            
            width: '100%' ,           
            backgroundColor: props.backColor,
            border: 'none',
            //position: "-webkit-sticky",
            //position:"sticky",
            //boxShadow: '1px 1px 1px black',
            //color: 'white',
            position: 'fixed',
            zIndex:'6',
            // marginTop:'-5px'            
        },
        rootTypography: {
            display: 'block',
            textAlign: 'left',
            width: '100%',
            margin: 2,
            fontSize: 16,
            // fontWeight: 'bold',
        },
    });

    const classes = useStyles();

    let headerBox = null;
    if (props.headerColumnName || props.headerText) {
        headerBox = 
            <Box className={classes.rootBox} style={{paddingBottom: 10}}>
                {props.headerText
                    ? <Typography style={{marginLeft: 15, paddingTop: 5, fontWeight: 'bold'}} variant="h5" component="h2">
                        {props.headerText} 
                    </Typography>
                    : null
                }
                {props.headerTextDelimiter
                    ? <Typography style={{marginLeft: 5, paddingTop: 5}} variant="h5" component="h2">
                        {props.headerTextDelimiter}
                    </Typography>
                    : null
                }
                {(props.headerColumnName && props.data)
                    ? <Typography style={{marginLeft: 7, paddingTop: 5, fontWeight: 'bold'}} variant="h5" component="h2">
                        {props.data[props.headerColumnName]}
                    </Typography>
                    : null
                }
            </Box>
    }

    let dataBox = null;
    if (props.data) {
        dataBox = 
            <Box margin={0} className={classes.rootBox}>
                {props.header
                    .filter((headerColumn) => headerColumn.prop !== props.headerColumnName)
                    .map((headerColumnFiltered, index) =>
                        <Card className={classes.rootCard} key={`trch-${index}`}>
                            <CardContent style={{padding: 2}} className={classes.rootCardContent}>
                                <Typography className={[classes.titleCard, classes.rootTypography].join(' ')} color="textSecondary" gutterBottom>
                                    {headerColumnFiltered.name}
                                </Typography>
                                {/* <Typography variant="h5" component="h2">
                                            be{bull}nev{bull}o{bull}lent
                                            </Typography>
                                            <Typography className={classes.pos} color="textSecondary">
                                            adjective
                                            </Typography> */}
                                <Typography variant="body2" component="p" className={classes.rootTypography}>
                                    {/* {props.data[headerColumnFiltered.prop] ? props.data[headerColumnFiltered.prop] : "-"} */}
                                    {getApiModelPropValue(props.data, headerColumnFiltered)}
                                </Typography>
                            </CardContent>
                        </Card>
                    )                    
                }
            </Box>
    } 
    
    return (
        <React.Fragment>
            <Box margin={0} style={{border: '1px solid #ccc', boxShadow: '1px 1px 1px black'}}>
                {headerBox}
                {dataBox}
            </Box>
        </React.Fragment>
    );
};

export default CardsInBox;