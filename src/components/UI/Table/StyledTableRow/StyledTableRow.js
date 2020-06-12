import { withStyles} from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

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

export default StyledTableRow;