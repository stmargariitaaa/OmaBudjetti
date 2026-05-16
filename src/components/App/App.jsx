import AppRouter from '../../router/AppRouter/AppRouter'
import { useState } from 'react'
import testdata from './testdata.js'

function App() {
  const [data, setData] = useState(testdata)

  const handleItemSubmit = (newitem) => {

    // Luodaan kopio nykyisestä datasta, jotta statea ei muuteta suoraan.
    let copy = data.slice()
    // Etsitään merkintää, jolla on sama id kuin tallennettavalla merkinnällä.
    const index = copy.findIndex(item => item.id === newitem.id)
    if (index >= 0) {
      // Jos rivi löytyi taulukosta, kyseessä on muokkaus →
      // korvataan vanha uudella
      copy[index] = newitem
    } else {
      // Jos riviä ei löytynyt, kyseessä on lisäys.
      copy.push(newitem)
    }

    // Järjestetään rivit maksupäivän mukaan (uusin ensin)
    copy.sort((a, b) => {
      const aDate = new Date(a.paymentDate)
      const bDate = new Date(b.paymentDate)
      return bDate - aDate
    })
    // Päivitetään sovelluksen state uudella, käsitellyllä datalla.
    setData(copy)
  }

  return (
    <AppRouter data={data} onItemSubmit={handleItemSubmit} />
  )
}

export default App