import { withStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const StyledTableCell = withStyles((theme) => ({
    head: {
    //   backgroundColor: theme.palette.common.black,
        backgroundColor: '#007bff',
        color: theme.palette.common.white,
        fontSize: 16, 
        height: '58px'       
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default StyledTableCell;