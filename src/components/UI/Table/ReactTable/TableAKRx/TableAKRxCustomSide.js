import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { COLUMNS } from './columns';
import './TableAKRx.css';
import {RiArrowLeftSLine} from 'react-icons/ri';
import {RiArrowRightSLine} from 'react-icons/ri';
import {FiSkipForward} from 'react-icons/fi';
import {FiSkipBack} from 'react-icons/fi';
import {CheckBox} from '../../../CheckBox/CheckBox';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const TableAKRx = (props) => {
    
    //To avoid refreshing data with each rerender -> useMemo()
    const columns = useMemo(()=> COLUMNS, []);
    const data = useMemo(()=> props.data, []);    
    
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
        state, 
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps} = useTable({
        columns: columns,
        data: data,
        //pageSize: props.rowsPerPageDef,
        //changeOffsetOrLimit={changeOffsetOrLimitHandler}
        // totalDataCount={acarsMessagesCount}
        // setPageStore={setAkrxPageHandler}
        // currPage={page}
        initialState: { pageIndex: 0}        
    }, useSortBy, usePagination);
    
    const { pageIndex, pageSize} = state;
    
    

    return (
        <div>
          <DropdownButton title="SHOW" id="drop" drop="up">
            <div id='boxCheck'>
                    
                <div>
                    <CheckBox {...getToggleHideAllColumnsProps()} /> Toggle All
                </div>
                {
                    allColumns.map(column => (
                        <div key={column.id}>
                            <label>
                                <input type='checkbox' {...column.getToggleHiddenProps()}/>
                                {column.Header}
                            </label>
                        </div>
                    ))
                }
                
            </div>
          </DropdownButton>
        {(props.data && props.data.length !== 0)
            
       ? 
       
       <table {...getTableProps()} >
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
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }                                
                            </tr>
                        )
                    })
                }                
            </tbody>
        </table>
        
        : <div style={{ marginTop:"95px" }}><p style={{ color:"red", fontSize:"26px" }}>No more data. Please back to previous page or enter new search term in the Filter.</p></div>}
        <div id="pagginationBox">
            <span>
                Page{'  '}
                <strong>
                    {pageIndex+1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <span>
                | Go to page: {' '}
                <input type="number" defaultValue={pageIndex +1} onChange={e => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(pageNumber)
                }}/> |
            </span>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {
                    [10, 25, 50, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize} rows
                        </option>
                    ))
                }
            </select>
            <button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}><FiSkipBack/></button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage} ><RiArrowLeftSLine /></button>
            <button onClick={() => nextPage()} disabled={!canNextPage}><RiArrowRightSLine/></button>
            <button onClick={()=> gotoPage(pageCount-1)} disabled={!canNextPage}><FiSkipForward/></button>
        </div>
        </div>
    )
};

export default TableAKRx;
