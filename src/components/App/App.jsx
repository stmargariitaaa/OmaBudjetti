import AppRouter from '../../router/AppRouter/AppRouter'
import { useState } from 'react'
import testdata from './testdata.js'

function App() {
  const [data, setData] = useState(testdata)

  // Sovelluksen kulutyypit, jotka välitetään eteenpäin reitittäjälle.
  const [typelist, setTypelist] = useState(["Auto", "Puhelin", "Sähkö", "Vero", "Vesi"])

  // Poistaa rivin sovelluksen datasta id:n perusteella.
  const handleItemDelete = (id) => {

    // Tehdään kopio nykyisestä datasta.
    let copy = data.slice()

    // Suodatetaan pois se rivi, jonka id vastaa poistettavaa id:tä.
    copy = copy.filter(item => item.id !== id)

    // Päivitetään state suodatetulla datalla.
    setData(copy)

  }

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
    <AppRouter data={data}
                  typelist={typelist}
                 onItemSubmit={handleItemSubmit}
                 onItemDelete={handleItemDelete} />
  )
}

export default App