import React, {useMemo} from 'react'
import {useTable} from 'react-table'

function Table({c, d}){
  const columns = useMemo(()=>c, [c])
  const data = useMemo(()=>d, [d])
  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow} = useTable({
      columns,
      data
  })


  return (
      <div className="table-responsive">
          <table {...getTableProps()} className="table">
              <thead>
                {
                  headerGroups.map((headerGroup)=> (
                    <tr {...headerGroup.getHeaderGroupProps()}> 
                      {
                        headerGroup.headers.map( column => (
                          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))
                      }
                    </tr>
                  ))
                }
                
              </thead>
              <tbody {...getTableBodyProps()}>
                {
                  rows.map(row => {
                    prepareRow(row)
                    return(
                      <tr {...row.getRowProps()}>
                        {
                          row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          })
                        }
                        
                      </tr>
                    )
                  })
                }
                
              </tbody>
          </table>

      </div>
  )
}

export default Table