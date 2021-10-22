import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination, useResizeColumns, useFlexLayout, useRowSelect, } from 'react-table';
import { COLUMNS } from './columns';
//import './TableAKRx.css';
// import classes from './TableAKRx.module.css';
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
  display: block;
  ${'' /* These styles are required for a horizontaly scrollable table overflow */}
  overflow: auto;

    

  .table {
    border-spacing: 0; 
    ${'' /* font-family: monospace;
    white-space: pre;    */}
    ${'' /* font-family: Arial Unicode MS, Arial, verdana; */}
    font-family: monospace;
    border-collapse: collapse;
    width: auto;
    font-size: 14px;
    margin-top: -78px;
    ${'' /* z-index: 12;      */}
    position: relative;
    
    .thead {
      ${'' /* These styles are required for a scrollable body to align with the header properly */}
      overflow-y: scroll;
      overflow-x: auto; 
          
    }

    .tbody {
      ${'' /* These styles are required for a scrollable table body */}
      overflow-y: scroll;
      overflow-x: auto;
      height: 740px;
      display: block;
      text-align: left;
      background-color: white;            
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
        :last-child {
            margin-right: 17px;
            border-radius: 0px 5px 0 0;
        } 
    }    

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-right: 1px solid black;
      border: 1px solid #ddd;
      padding: 12px;
      width: 180px;      
      display: inline-block;
      word-wrap: break-word;
      
      ${'' /* word-wrap: break-word; */}
      ${'' /* overflow-wrap: break-word; */}

      ${'' /* -webkit-hyphens: auto;
      -moz-hyphens: auto;
      -ms-hyphens: auto;
      hyphens: auto;      */}
      ${'' /* position: relative; */}

      :last-child {
        border-right: 0;        
      }   

      :nth-child(2){          
        width:100px !important;
        word-break: break-word;             
      }
      :nth-child(3){          
        width:80px !important;
        word-break: break-word;             
      }
      :nth-child(4){          
        width:420px !important;
        word-break: break-word !important; 
        font-family: monospace;          
        white-space: pre-wrap;               
      }
      :nth-child(5){          
        width:120px !important;
        word-break: break-word;             
      }
      :nth-child(6){          
        width:160px !important;
        word-break: break-word;             
      }
      :nth-child(7){          
        width:90px !important;
        word-break: break-word;                     
      }
      :nth-child(8){          
        width:90px !important;
        word-break: break-word;                     
      }
      :nth-child(9){          
        width:60px !important;
        word-break: break-word;                     
      }
      :nth-child(10){          
        width:60px !important;
        word-break: break-word;                     
      }
      :nth-child(11){          
        width:80px !important;
        word-break: break-word;                     
      }
      :nth-child(12){          
        width:80px !important;
        word-break: break-word;                     
      }
      :nth-child(13){          
        width:100px !important;
        word-break: break-word;                     
      }
      :nth-child(14){          
        width:50px !important;
        word-break: break-word;                     
      }
      :nth-child(15){          
        width:120px !important;
        word-break: break-word;                     
      }
      :nth-child(16){          
        width:50px !important;
        word-break: break-word;                     
      }
      :nth-child(17){          
        width:100px !important;
        word-break: break-word;                     
      }
      :nth-child(19){          
        width:100px !important;
        word-break: break-word;                     
      }
      :nth-child(20){          
        width:120px !important;
        word-break: break-word;                     
      }
      :nth-child(21){          
        width:120px !important;
        word-break: break-word;                     
      }
      :nth-child(22){          
        width:160px !important;
        word-break: break-word;                     
      }
      :nth-child(23){          
        width:160px !important;
        word-break: break-word;                     
      }
      :nth-child(24){          
        width:80px !important;
        word-break: break-word;                     
      }
      :nth-child(25){          
        width:120px !important;
        word-break: break-word;                     
      }
      

      .resizer {
        right: 0;
        background: #80dfff;
        width: 1px;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action :none;

        &.isResizing {
          background: white;
        }
      }
    }

    @media only screen and (max-height: 1180px) {
        .tbody {
            height: 900px;
        }
    }

    @media only screen and (max-height: 1080px) {
        .tbody {
            height: 800px;
        }
    }

    @media only screen and (max-height: 1000px) {
        .tbody {
            height: 700px;
        }
    }

    @media only screen and (max-height: 900px) {
        .tbody {
            height: 505px;            
        }
    }

    
  }

.select {
    border: none;
    margin-left: 10px;
}

.pagginationBox {
    width: 450px;
    position: absolute;
    right: 2px;
    height: 55px;
}

.button {
    margin-top: 15px;
    border: none;
}

.input {
    width: 50px;
    margin-right: 5px;
}

.select {
    margin-right: 5px;
    margin-left: 5px;
}

.boxCheck {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 350px;
    /* flex-wrap: wrap; */
    background-color: cornflowerblue;
    margin-top: -8px;
    margin-bottom: -8px;
    border-radius: 2px;
}

.boxCheck>* {
    /* flex: 1 1 5%; */
    border: 1px solid #007bff;
    padding: 5px;
    text-align: left;
    color: white;
    z-index: 3;
}

.func2 {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 8px;
    margin-bottom: 45px;
    z-index:4;    
}

.func2>* {
    flex: 1 1 5rem;
    
}

.excelBtn {
    position: absolute;
    left: 340px;
    z-index: 9;
    margin-top: 0px;
}

.drop {
    position: absolute;
    left: 170px;
    z-index: 9;
    margin-top: 0px;
}

@media(max-width:550px) {
        
        *{
	        box-sizing: border-box;
            overflow: hidden;
        }
    
        .func2 {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            margin-top: 8px;
            margin-bottom: 45px;
            z-index:7;
            width:220px;                      
            align-content: left;  
            height:1540px;                          
        } 
        .func2>* {
            flex: 1 1 5rem;            
        }       
        
        .thead{
            display: none;
            overflow-y: hidden;
            overflow-x: hidden;
        }
        .table
          {
            ${'' /* display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            width: 100%; */}
            display: block;
            padding-bottom: 15px;
            z-index: 1;            
            border: 0;
            position: relative; 
            margin-top: -1410px;
            border-top: 1px solid black;

            .tr, .td{
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                flex: 1 1 50%;
                width: 100%;
                
            }
            .tbody,           
            {
                display: block;                
                padding-bottom: 15px;
                z-index: 1;            
                border: 1px solid blue;
                position: relative;                
                text-align: right;               
                align-self: auto;                 
                align-items: flex-end;
                overflow-y: hidden;
                overflow-x: hidden;
                height:100%;
               
            } 

            .td{
                width: 100% !important;                
                border: 1 solid blue;
                padding-left: 8%;
                content-align: center;
                :nth-child(2){          
                    width:550px !important;
                    word-break: break-word;             
                }
                :nth-child(3){          
                    width:550px !important;
                    word-break: break-word;             
                }
                :nth-child(4){          
                    width:550px !important;
                    word-break: break-word;                  
                }
                :nth-child(5){          
                    width:550px !important;
                    word-break: break-word;             
                }
                :nth-child(6){          
                    width:550px !important;
                    word-break: break-word;             
                }
                :nth-child(7){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(8){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(9){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(10){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(11){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(12){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(13){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(14){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(15){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(16){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(17){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(19){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(20){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(21){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(22){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(23){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(24){          
                    width:550px !important;
                    word-break: break-word;                     
                }
                :nth-child(25){          
                    width:550px !important;
                    word-break: break-word;                     
                }
            }

            
            .tr {
                margin-bottom: 15px;
                border: 0;
            }
            .tr:nth-child(even) {
                background-color: lightblue;
            }           
            
            .td::before {
                content: attr(data-label);
                position: absolute;
                left: 0;
                width: 25%;
                padding-left: 5px;
                font-weight: bold;
                text-align: left;
                font-size: 12px;
                background: #007bff;
                color: white;
                border-radius: 2px;
                z-index: 1;
                height: 18px;
                
            }

            
            .td,
            .th {            
                max-width: 550px;
                z-index: 1;
                position: relative;
                border: 0;
                width:350px;                
            }           
        }
        

        .excelBtn {
            position: relative;                   
            left: 2%;
            margin-top:55px;
            margin-bottom:-1365px;
            z-index:7;
        } 
        .drop{
            position: relative;  
            left: 2%;
            z-index:7;
            height: 1400px; 
            margin-bottom:-470px;                 
        }
        .boxCheck {
            display: grid;
            grid-template-columns: 100%;
            width: 162px;
            border-radius: 5px;    
            z-index:7; 
            height:1400px;             
        }
        .dropContainer{
            height: 150%;
            z-index:7;
        }
        
}

@media only screen and (max-width: 440px) {
    .pagginationBox {
        width: auto;
        position: absolute;
        left: 2px;
        height: 55px;
    }
}


@media only screen and (max-width: 320px) {
    .boxCheck {
        display: grid;
        grid-template-columns: 100%;
        width: 162px;
        border-radius: 5px;
        
    }
    .excelBtn {
        position: relative;        
        padding-left: 1%;        
       
    } 
    .drop{
        position: relative;        
        left: 1%;        
    }
}

@media only screen and (max-width: 305px) {
    .excelBtn {
        position: relative;                   
        left: 1%;       
    } 
    .drop{
        position: relative;       
        left:1%;
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
    
    //+RESIZE
    const defaultColumn = React.useMemo(
        () => ({
          // When using the useFlexLayout:
          minWidth: 100, // minWidth is only used as a limit for resizing
          width: 180, // width is used for both the flex-basis and flex-grow
          maxWidth: 1120, // maxWidth is only used as a limit for resizing
          wordBreak: 'break-word',
          whiteSpace: 'normal',          
        } ),
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
              
            <div className="func2" >
                <div className= "excelBtn">
                    {/* <ReactHTMLTableToExcel 
                        className="btn btn-info"
                        table="emp-table"
                        filename="AKRx Messages"
                        sheet="Sheet"
                        buttonText="Export to Excel"                                            
                    />                 */}
                    <button className="btn btn-info"  onClick={(e) => exportToCSV(data,"AKRxMesages")}>Export to Excel</button>
                </div>
                <div >
                    <DropdownButton title={title} className="drop" drop="down" onToggle={(e) => changeTitle()}>
                        <div className="boxCheck">                    
                            <div>
                                <CheckBox {...getToggleHideAllColumnsProps()} /><strong> TOGGLE ALL</strong>
                            </div>
                            {
                                allColumns.map(column => (
                                    <div key={column.id}>
                                        <label>
                                            <input type='checkbox' {...column.getToggleHiddenProps()} id="input" className="input"/>
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
            <thead className="thead">
                {
                    headerGroups.map(headerGroup => (                    
                    <tr {...headerGroup.getHeaderGroupProps()} className="tr">
                        {
                            // Gives us access to each column
                            headerGroup.headers.map( column => (
                                <th {...column.getHeaderProps(headerProps)} className="th">
                                
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
            <tbody {...getTableBodyProps()} className="tbody">
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
        
        </>
        : <div style={{ marginTop:"95px" }}><p style={{ color:"red", fontSize:"26px" }}>There are no results for your search. Please reset Your search or enter new search term.</p></div>}
        <div className="pagginationBox">
            
            {/* <span>
                | Go to page: {' '}
                <input type="number" defaultValue={pageIndex +1} onChange={e => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(pageNumber)
                }}/> |
            </span> */}
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
        
    </Styles>
    )
};

export default TableAKRx;

// https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/full-width-resizable-table?file=/src/App.js:4242-4247
// 331 col - <th {...column.getHeaderProps(column.getSortByToggleProps(), headerProps)} className='th'>