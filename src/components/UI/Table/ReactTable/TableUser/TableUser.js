import React, { useMemo, useState, useCallback, useContext, useEffect } from 'react';
import { useTable, useSortBy, usePagination, useResizeColumns, useFlexLayout, useRowSelect, } from 'react-table';
import {useDispatch, useSelector} from 'react-redux';
import {AuthContext} from '../../../../../context/auth-context';
import * as actions from '../../../../../store/actions/index';
import './TableUser.css';
import {RiArrowLeftSLine} from 'react-icons/ri';
import {RiArrowRightSLine} from 'react-icons/ri';
import {FiSkipForward} from 'react-icons/fi';
import {FiSkipBack} from 'react-icons/fi';
import Button from '../../../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPenAlt } from '@fortawesome/free-solid-svg-icons'
import { Redirect, Link } from 'react-router-dom';


const headerProps = (props, { column }) => getStyles(props, column.align)

const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',      
    },
  },
]

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
  );

const TableAKRx = (props) => {
    
    const authContext = useContext(AuthContext);
    const dispatch = useDispatch();
    
    let isAuthenticated = authContext.user.token;    
    
    

    const COLUMNS = [
        {
            Header: "Id",
            accessor: "id"
        },
        {
            Header: "Name",
            accessor: "name",             
        },
        {
            Header: "Surname",
            accessor: "surname"
        },
        {
            Header: "Username",
            accessor: "username"
        },
        {
            Header: "Password",
            accessor: "password",
            
        },
        {
            Header: "Company",
            accessor: "company"
        },
        {
            Header: "Email",
            accessor: "email"
        },
        {
            Header: "Role",
            accessor: "role"
        },
        {
            Header: "Terms",
            accessor: "terms"
        },    
        {
            Header: "DELETE",
            Cell: ( props ) => {return (
                <Button className='buttonDelete' clicked={useCallback(
                         () => dispatch(actions.deleteUser(props.row.original.id, isAuthenticated))
                         , [dispatch, props.row.original.id, isAuthenticated])}                           
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="trashCan"  
                   />
                </Button>
              );}
        },
        {
            Header: "UPDATE",            
            Cell: ( props ) => {return (
                <Link to={`/updateUser/${props.row.original.id}`} className='buttonUpdate' onClick={
                    useCallback(() => dispatch(actions.getUser(props.row.original.id))
                      , [dispatch, props.row.original.id])}>
                    <FontAwesomeIcon icon={faPenAlt} className="update" />
                </Link>
            )}
            
        }
    ];
    
    //To avoid refreshing data with each rerender -> useMemo()
    const columns = useMemo(()=> COLUMNS, []);    
    
    const data = useMemo(()=> props.data, []);    
    const [pageInd, setPage] = useState(props.currPage);
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPageDef);
    const [rowClose, setRowClose] = useState(false);
    const rowCloseResetHandler = () => {
        setRowClose(false);
    }

    
    
    const handleChangePage = (event, newPage) => {
        props.setPageStore(newPage);
        setPage(newPage);
        setRowClose(true);
        let newOffset = newPage * rowsPerPage;
        props.changeOffsetOrLimit(newOffset, rowsPerPage);
    };
    const handleChangeRowsPerPage = (event) => {
        let changedRowsPerPage = parseInt(event.target.value, 10)
        setRowsPerPage(changedRowsPerPage);
        props.setPageStore(0);
        setPage(0);        
        props.changeOffsetOrLimit(0, event.target.value);        
    };    
        
    //Destructuring properties and methods from tableInstance to enable easy table creation
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page, 
        nextPage, 
        previousPage, 
        canNextPage, 
        canPreviousPage, 
        pageOptions, 
        gotoPage, 
        pageCount, 
        setPageSize, 
        row,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps,
        state: { pageIndex, pageSize },
        
    } = useTable({
        columns: columns,        
        data: data,           
        initialState: {
            pageIndex: pageInd,
            pageSize: rowsPerPage,            
          },
          manualPagination: true, // Tell the usePagination
          // hook that we'll handle our own data fetching
          // This means we'll also have to provide our own
          // pageCount.
          pageCount: Math.ceil(props.totalDataCount / props.rowsPerPageDef),
           
    }, useSortBy, usePagination,
    useResizeColumns,
    useFlexLayout,
    useRowSelect,    
    );      
    

    return (
    <>           
            
        {(props.data && props.data.length !== 0)            
       ?   
       
       
        <table {...getTableProps()} className="table" id="emp-table">
            <thead className="thead" style={{textAlign:'center'}}>
                {
                    headerGroups.map(headerGroup => (                    
                    <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                        {
                            // Gives us access to each column
                            headerGroup.headers.map( column => (
                                <th {...column.getHeaderProps(headerProps)} className="th" >
                                
                                    {column.render('Header')}
                                    
                                    <span >
                                        {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                                    </span> 
                                    {column.canResize && (
                                        <div
                                            {...column.getResizerProps()}
                                            className={`resizer ${
                                            column.isResizing ? 'isResizing' : ''
                                            }`}
                                        />
                                    )}
                                </th>
                            ))
                        }                        
                    </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()} className="tbody" >
                {
                    page.map(row => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()} className="tr">
                                {
                                    row.cells.map( cell=> {
                                        return <td {...cell.getCellProps(cellProps)} data-label={cell.render('Header')} className="td">{cell.render('Cell')}</td>
                                    })
                                }                                
                            </tr>
                        )
                    })
                }                
            </tbody>
        </table>
        
        
        : <div style={{ marginTop:"95px" }}><p style={{ color:"red", fontSize:"26px" }}>There are no results for your search. Please reset Your search or enter new search term.</p></div>}
        <div className="pagginationBox">
            
            
            Rows per page:{'  '}
            <select className="select" value={pageSize} onChange={e => setPageSize(Number(e.target.value), handleChangeRowsPerPage(e))}>
                {
                    [10, 25, 50, 100, 1000].map(pageSize => (                       
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>            
                    ))                                 
                }
                {
                    [props.totalDataCount].map(pageSize => (                       
                            <option toggle="tooltip" title='Active Only After SEARCH Button Click !' key={pageSize} value={pageSize} label={'All'} disabled={props.allOption==0}>
                                {pageSize}
                            </option>            
                    ))
                }
            </select>{'  '}
            <span>
                Page{' '}               
                {pageIndex+1} of {pageOptions.length}
                {' '}
            </span>
            <button className="button" onClick={(e)=> gotoPage(handleChangePage(e, 0))} disabled={!canPreviousPage}><FiSkipBack/></button>
            <button className="button" onClick={(e) => previousPage(handleChangePage(e, pageIndex-1))} disabled={!canPreviousPage} ><RiArrowLeftSLine /></button>
            <button className="button" onClick={(e) => nextPage(handleChangePage(e, pageIndex+1))} disabled={!canNextPage}><RiArrowRightSLine/></button>
            <button className="button" onClick={(e)=> gotoPage(handleChangePage(e, pageCount-1))} disabled={!canNextPage}><FiSkipForward/></button>
        </div>
        
    </>
    )
};

export default TableAKRx;

// https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/full-width-resizable-table?file=/src/App.js:4242-4247
// 331 col - <th {...column.getHeaderProps(column.getSortByToggleProps(), headerProps)} className='th'>