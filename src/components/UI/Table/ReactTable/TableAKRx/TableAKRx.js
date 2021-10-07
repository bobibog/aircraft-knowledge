import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination, useResizeColumns, useFlexLayout, useRowSelect, } from 'react-table';
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
import styled from 'styled-components';
import { wrap } from 'lodash';


// +RESIZE style for resizable columns by dragging functionality
const Styles = styled.div`
  
  ${'' /* These styles are suggested for the table fill all available space in its containing element */}
  ${'' /* display: block; */}
  ${'' /* These styles are required for a horizontaly scrollable table overflow */}
  overflow: auto;

  .table {
    border-spacing: 0;    
    font-family: 'custom-font', Arial Unicode MS, Arial, verdana;
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
    margin-top: 18px;
    ${'' /* z-index: 12;      */}
    position: relative;
    

    .thead {
      ${'' /* These styles are required for a scrollable body to align with the header properly */}
      overflow-y: auto;
      overflow-x: auto;      
    }

    .tbody {
      ${'' /* These styles are required for a scrollable table body */}
      overflow-y: scroll;
      overflow-x: auto;
      height: 740px;
      display: block;
      text-align: left;
      background: white;      
    }

    .tr {
      :last-child {
        .td {
          border-bottom: 1px solid grey;
        }
      }
      border-bottom: 1px solid grey;
    }

    .th{
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        background-color: #007bff;
        color: white;
        position: sticky;                
        font-size:14px; 
        top:0;     
    }    

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-right: 1px solid black;
      border: 1px solid #ddd;
      padding: 12px;
      width: 180px;
      ${'' /* word-wrap: break-word; */}
      overflow-wrap: break-word;

      ${'' /* -webkit-hyphens: auto;
      -moz-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;      */}
      position: relative;

      :last-child {
        border-right: 0;
      }   

      .resizer {
        right: 0;
        background: #80dfff;
        width: 3px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;

        &.isResizing {
          background: yellow;
        }
      }
    }

    @media only screen and (max-height: 900px) {
    .tbody {
        height: 520px;
    }
}
  }
`

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
    
    // +RESIZE
    const defaultColumn = React.useMemo(
        () => ({
          // When using the useFlexLayout:
          minWidth: 50, // minWidth is only used as a limit for resizing
          width: 180, // width is used for both the flex-basis and flex-grow
          maxWidth: 1120, // maxWidth is only used as a limit for resizing
          wordWrap: 'break-all'  ,
          whiteSpace: 'normal'      
        }),
        []
    );

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
        defaultColumn,      
        initialState: {
            pageIndex: pageInd,
            pageSize: rowsPerPage,            
          },
          manualPagination: true, // Tell the usePagination
          // hook that we'll handle our own data fetching
          // This means we'll also have to provide our own
          // pageCount.
          pageCount: Math.ceil(props.totalDataCount / props.rowsPerPageDef),
        //   defaultColumn,   
    }, useSortBy, usePagination,
    useResizeColumns,
    useFlexLayout,
    useRowSelect,
    // hooks => {
    //   hooks.allColumns.push(columns => [
    //     // Let's make a column for selection
    //     {
    //       id: 'selection',
    //       disableResizing: true,
    //       minWidth: 35,
    //       width: 35,
    //       maxWidth: 35,
    //       //The header can use the table's getToggleAllRowsSelectedProps method
    //       //to render a checkbox
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ])
    //   hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
    //     // fix the parent group of the selection button to not be resizable
    //     const selectionGroupHeader = headerGroups[0].headers[0]
    //     selectionGroupHeader.canResize = false
    //   })
    // }
    );
    
        
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
        <Styles>
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
       <>
       {/* <button onClick={resetResizing}>Reset Resizing</button>      */}
        {/* <table {...getTableProps()} className={classes.table} id="emp-table"> */}
        <table {...getTableProps()} className="table" id="emp-table">
            <thead>
                {
                    headerGroups.map(headerGroup => (                    
                    <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                        {
                            // Gives us access to each column
                            headerGroup.headers.map( column => (
                                <th {...column.getHeaderProps(headerProps)} className='th'>
                                
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
            <tbody {...getTableBodyProps()} className='tbody'>
                {
                    page.map(row => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()} className='tr'>
                                {
                                    row.cells.map( cell=> {
                                        return <td {...cell.getCellProps(cellProps)} data-label={cell.render('Header')} className='td'>{cell.render('Cell')}</td>
                                    })
                                }                                
                            </tr>
                        )
                    })
                }                
            </tbody>
        </table>
        
        </>
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
                    [10, 25, 50, 100].map(pageSize => (                       
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
        </Styles>
    )
};

export default TableAKRx;

// https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/full-width-resizable-table?file=/src/App.js:4242-4247
// 331 col - <th {...column.getHeaderProps(column.getSortByToggleProps(), headerProps)} className='th'>