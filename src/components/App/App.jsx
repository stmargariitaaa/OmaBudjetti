import AppRouter from '../../router/AppRouter/AppRouter'
import { useState } from 'react'
import testdata from './testdata.js'

function App() {
  const [data, setData] = useState(testdata)

  const handleItemSubmit = (newitem) => {
    let copy = data.slice()
    newitem.id = crypto.randomUUID()
    copy.push(newitem)
    copy.sort((a, b) => {
      const aDate = new Date(a.paymentDate)
      const bDate = new Date(b.paymentDate)
      return bDate - aDate
    })
    setData(copy)
  }

  return (
    <AppRouter data={data} onItemSubmit={handleItemSubmit} />
  )
}

export default App