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
            width: 350,
            height: 40,
            display: 'flex',
            // flexGrow: 1,
            borderBottom: 'none',
            boxShadow: 'none',
            backgroundColor: props.backColor,
            //color: 'white',
        },
        rootCardContent: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            //color: 'white',
        },
        titleCard: {
            fontSize: 14,
            //color: 'white',            
        },
        rootBox: {
            display: 'flex',
            flexWrap: 'wrap',
            backgroundColor: props.backColor,
            //color: 'white',
        },
        rootTypography: {
            display: 'ínline-block',
            margin: 2,
            fontSize: 16,
            // fontWeight: 'bold',
        },
    });

    const classes = useStyles();

    let headerBox = null;
    if (props.data && (props.headerColumnName || props.headerText)) {
        headerBox = 
            <Box className={classes.rootBox} style={{paddingBottom: 10}}>
                {props.headerText
                    ? <Typography style={{marginLeft: 5, paddingTop: 5, fontWeight: 'bold'}} variant="h5" component="h2">
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
                {props.headerColumnName
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
                            <CardContent className={classes.rootCardContent}>
                                <Typography className={[classes.titleCard, classes.rootTypography].join(' ')} color="textSecondary" gutterBottom>
                                    {headerColumnFiltered.name} :
                                </Typography>
                                {/* <Typography variant="h5" component="h2">
                                            be{bull}nev{bull}o{bull}lent
                                            </Typography>
                                            <Typography className={classes.pos} color="textSecondary">
                                            adjective
                                            </Typography> */}
                                <Typography variant="body2" component="p" className={classes.rootTypography}>
                                    {props.data[headerColumnFiltered.prop]}
                                </Typography>
                            </CardContent>
                        </Card>
                    )                    
                }
            </Box>
    } 
    
    return (
        <React.Fragment>
            {headerBox}
            {dataBox}
        </React.Fragment>
    );
};

export default CardsInBox;