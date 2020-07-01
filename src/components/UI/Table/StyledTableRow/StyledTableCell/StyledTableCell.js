import { withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const StyledTableCell = withStyles((theme) => ({
    head: {
    //   backgroundColor: theme.palette.common.black,
        backgroundColor: 'rgb(0, 112, 192)',
        color: theme.palette.common.white,
        fontSize: 16,        
    },
    body: {
        fontSize: 16,
    },
}))(TableCell);

export default StyledTableCell;