import React, {useMemo, useEffect, useState} from 'react'
import {useTable} from 'react-table'
import { deleteCard, getCards } from '../../actions/cardActions'
import { Link } from 'react-router-dom'

export const CardsTable = () => {
  const [cards, setCards] = useState([])

  const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleString()
  }

  useEffect(() => {
    getCards().then((res) => {
      let data = (res.data.cards)
      data = data.map(card => ({...card, date: formatDate(card.date)}))
      setCards(data)
    }).catch((error) => {
      console.error(error.message)
    }
    )
  }, [])

  const handleDeleteCard = (_id) => {
    if (window.confirm("Delete this card?")) {
      const data = {card_id: _id}
      deleteCard(data).then((res) => {
        console.log(res.data)
        window.location.reload(false);
      }).catch((error) => {
        console.error(error.message)
      })
    }
  }

  const columns = useMemo(()=>
  [
    {
      Header: 'Front',
      accessor: 'front'
    },
    {
      Header: 'Back',
      accessor: 'back'
    },
    {
      Header: 'Tags',
      accessor: 'tags',
      Cell: ({row}) => 
      <ul className="table-list">
        {row.original.tags.map((tag, index) => (<li key={index}>{tag}</li>))}
      </ul>
    },
    {
      Header: 'Last Modified',
      accessor: 'date'
    },
    {
      Header: 'Actions',
      accessor: 'edit',
      Cell: ({data, row}) => <Link className="btn btn-secondary" to={`${window.location.pathname}/edit/${data[row.id]._id}`}>Edit</Link>
    },
    {
      accessor: 'delete',
      Cell: ({data, row}) => <button className="btn btn-secondary" onClick={() => {handleDeleteCard(data[row.id]._id)}}>Delete</button>
    }
  ], [])

  const data = useMemo(()=>cards, [cards])

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
    <div>
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