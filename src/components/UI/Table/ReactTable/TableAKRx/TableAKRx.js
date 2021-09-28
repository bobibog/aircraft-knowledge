import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { COLUMNS } from './columns';
// import './TableAKRx.css';
import classes from './TableAKRx.module.css';
import {RiArrowLeftSLine} from 'react-icons/ri';
import {RiArrowRightSLine} from 'react-icons/ri';
import {FiSkipForward} from 'react-icons/fi';
import {FiSkipBack} from 'react-icons/fi';
import {CheckBox} from '../../../CheckBox/CheckBox';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const TableAKRx = (props) => {
    
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
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps,
        state: { pageIndex, pageSize }
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
    }, useSortBy, usePagination);
    
        
    // Changing Dropdown Button title according to event   
    const[title, setFilter] = useState('SHOW COLS.');
    function changeTitle () {
        if(title == "SHOW COLS."){
            setFilter("HIDE MENU")
        }
        else{
            setFilter("SHOW COLS.")
        }       
    };

    
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    
        const fileExtension = '.xlsx';   
    
        const exportToCSV = (csvData, fileName) => {
    
            const ws = XLSX.utils.json_to_sheet(csvData);
    
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    
            const data = new Blob([excelBuffer], {type: fileType});
    
            FileSaver.saveAs(data, fileName + fileExtension);
        }
    

    return (
        <div>
            <div className={classes.func2} >
                <div className={classes.excelBtn}>
                    <ReactHTMLTableToExcel 
                        className="btn btn-info"
                        table="emp-table"
                        filename="AKRx Messages"
                        sheet="Sheet"
                        buttonText="Export to Excel"                                            
                    />                
                    {/* <button className="btn btn-info"  onClick={(e) => exportToCSV(data,"AKRxMesages")}>Export to Excel</button> */}
                </div>
                <div>
                    <DropdownButton title={title} className={classes.drop} drop="down" onToggle={(e) => changeTitle()}>
                        <div className={classes.boxCheck}>                    
                            <div>
                                <CheckBox {...getToggleHideAllColumnsProps()} /><strong> TOGGLE ALL</strong>
                            </div>
                            {
                                allColumns.map(column => (
                                    <div key={column.id}>
                                        <label>
                                            <input type='checkbox' {...column.getToggleHiddenProps()} id="input"/>
                                            {column.Header}
                                        </label>
                                    </div>
                                ))
                            }                        
                        </div>
                    </DropdownButton>
                </div>
            </div>
        {(props.data && props.data.length !== 0)            
       ?        
        <table {...getTableProps()} className={classes.table} id="emp-table">
            <thead>
                {
                    headerGroups.map(headerGroup => (                    
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            // Gives us access to each column
                            headerGroup.headers.map( column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                                    </span>                                          
                                </th>
                            ))
                        }                        
                    </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    page.map(row => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map( cell=> {
                                        return <td {...cell.getCellProps()} data-label={cell.render('Header')}>{cell.render('Cell')}</td>
                                    })
                                }                                
                            </tr>
                        )
                    })
                }                
            </tbody>
        </table>
        
        : <div style={{ marginTop:"95px" }}><p style={{ color:"red", fontSize:"26px" }}>There are no results for your search. Please reset Your search or enter new search term.</p></div>}
        <div className={classes.pagginationBox}>
            
            {/* <span>
                | Go to page: {' '}
                <input type="number" defaultValue={pageIndex +1} onChange={e => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(pageNumber)
                }}/> |
            </span> */}
            Rows per page:{'  '}
            <select className={classes.select} value={pageSize} onChange={e => setPageSize(Number(e.target.value), handleChangeRowsPerPage(e))}>
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
            <button className={classes.button} onClick={(e)=> gotoPage(handleChangePage(e, 0))} disabled={!canPreviousPage}><FiSkipBack/></button>
            <button className={classes.button} onClick={(e) => previousPage(handleChangePage(e, pageIndex-1))} disabled={!canPreviousPage} ><RiArrowLeftSLine /></button>
            <button className={classes.button} onClick={(e) => nextPage(handleChangePage(e, pageIndex+1))} disabled={!canNextPage}><RiArrowRightSLine/></button>
            <button className={classes.button} onClick={(e)=> gotoPage(handleChangePage(e, pageCount-1))} disabled={!canNextPage}><FiSkipForward/></button>
        </div>
        </div>
    )
};

export default TableAKRx;
