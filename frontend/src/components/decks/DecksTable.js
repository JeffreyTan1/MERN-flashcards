import React, {useMemo, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {useTable} from 'react-table'
import { getDecks, deleteDeck } from '../../actions/deckActions'

function DecksTable(){
  const [decks, setDecks] = useState([])

  const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleString()
  }

  useEffect(() => {
      getDecks().then((res) => {
        let data = (res.data.decks)
        data = data.map(deck => ({...deck, date: formatDate(deck.date)}))
        data = data.map(deck => ({...deck, card_count: deck.cards.length}))
        setDecks(data)
      }).catch((error) => {
        console.error(error.message)
      }
      )
  }, [])

  const handleDeleteDeck = (_id) => {
    if (window.confirm("Delete this deck?")) {
      const data = {deck_id: _id}
      deleteDeck(data).then((res) => {
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
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: '# cards',
      accessor: 'card_count'
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
      accessor: 'play',
      Cell: ({data, row}) => <Link className="btn btn-primary" to={`${window.location.pathname}/play/${data[row.id]._id}`}>Play</Link>
    },
    {
      accessor: 'edit',
      Cell: ({data, row}) => <Link className="btn btn-secondary" to={`${window.location.pathname}/edit/${data[row.id]._id}`}>Edit</Link>
    },
    {
      accessor: 'delete',
      Cell: ({data, row}) => <button className="btn btn-secondary" onClick={() => {handleDeleteDeck(data[row.id]._id)}}>Delete</button>
    }
  ], [])

  const data = useMemo(()=>decks, [decks])

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

export default DecksTable