import firebase from './firebase.js'
import { collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc  } from 'firebase/firestore'
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
  // sisältö muuttuu. Noudettavat tiedot lajitellaan maksupäivän mukaan
  // laskevasti.
  useEffect( () => {
    const unsubscribe = onSnapshot(query(collection(firestore,'item'),
                                         orderBy('paymentDate', 'desc')),
                                   snapshot => {
      const newData = []
      snapshot.forEach( doc => {
        newData.push({ ...doc.data(), id: doc.id })
      })
      setData(newData)
    })
    return unsubscribe
  }, [])

  // Poistaa olemassa olevan tuotteen Firestore-tietokannasta
  // item-kokoelmasta annetun dokumentin id-tunnisteen perusteella.
  const handleItemDelete = async (id) => {
    await deleteDoc(doc(firestore, 'item', id))
  }


  // Tallentaa uuden tai päivitetyn tuotteen Firestore-tietokannan
  // item-kokoelmaan. Dokumentin tunnisteena käytetään newitem-olion
  // id-arvoa.
  const handleItemSubmit = async (newitem) => {
    await setDoc(doc(firestore, 'item', newitem.id), newitem)
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