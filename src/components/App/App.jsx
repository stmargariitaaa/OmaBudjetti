import firebase from './firebase.js'
import { collection, getFirestore, onSnapshot  } from 'firebase/firestore'
import { useEffect } from 'react'
import AppRouter from '../../router/AppRouter/AppRouter'
import { useState } from 'react'
import useLocalStorage from '../../shared/hooks/uselocalstorage'


function App() {
  const [data, setData] = useState([])

  // Sovelluksen kulutyypit, jotka välitetään eteenpäin reitittäjälle.
  const [typelist, setTypelist] = useLocalStorage('omabudjetti-typelist',[])

  // Alustetaan Firestore-tietokantayhteys annetulla Firebase-sovelluksella.
  const firestore = getFirestore(firebase)

  // useEffect-kuuntelija, joka hakee Firestoresta item-kokoelman tiedot
  // reaaliaikaisesti ja päivittää ne data-muuttujaan aina, kun kokoelman
  // sisältö muuttuu.
  useEffect( () => {
    const unsubscribe = onSnapshot(collection(firestore,'item'), snapshot => {
      const newData = []
      snapshot.forEach( doc => {
        newData.push({ ...doc.data(), id: doc.id })
      })
      setData(newData)
    })
    return unsubscribe
  }, [])

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

  // Käsittelee uuden tyypin lisäyksen, lisää annetun
  // type-arvon typelist-taulukkoon, järjestää listan
  // ja päivittää staten.
  const handleTypeSubmit = (type) => {
    let copy = typelist.slice()
    copy.push(type)
    copy.sort()
    setTypelist(copy)
  }

  return (
    <AppRouter data={data}
                  typelist={typelist}
                 onItemSubmit={handleItemSubmit}
                 onItemDelete={handleItemDelete}
                 onTypeSubmit={handleTypeSubmit} />
  )
}

export default App