import firebase, { auth } from './firebase.js'
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc  } from 'firebase/firestore'
import { useEffect } from 'react'
import AppRouter from '../../router/AppRouter/AppRouter'
import { useState } from 'react'
import useLocalStorage from '../../shared/hooks/uselocalstorage'
import { onAuthStateChanged } from 'firebase/auth'
import Startup from '../../pages/Startup'


function App() {
  const [data, setData] = useState([])

  // Sovellukseen kirjautuneen käyttäjän tiedot.
  const [user, setUser] = useState()

  // Sovelluksen kulutyypit, jotka välitetään eteenpäin reitittäjälle.
  const [typelist, setTypelist] = useState([])

  // Alustetaan Firestore-tietokantayhteys annetulla Firebase-sovelluksella.
  const firestore = getFirestore(firebase)

  // useEffect-kuuntelija, joka hakee Firestoresta item-kokoelman tiedot
  // reaaliaikaisesti ja päivittää ne data-muuttujaan aina, kun kokoelman
  // sisältö muuttuu. Noudettavat tiedot lajitellaan maksupäivän mukaan
  // laskevasti.
  useEffect( () => {
   if (user) {
      const unsubscribe = onSnapshot(query(collection(firestore,`user/${user.uid}/item`),
                                           orderBy('paymentDate', 'desc')),
                                     snapshot => {
        const newData = []
        snapshot.forEach( doc => {
          newData.push({ ...doc.data(), id: doc.id })
        })
        setData(newData)
      })
      return unsubscribe
    } else {
      setData([])
    }
  }, [user])


  // useEffect-kuuntelija, joka seuraa Firebase Authenticationin
  // kirjautumistilan muutoksia ja tallentaa kirjautuneen käyttäjän
  // tiedot user-muuttujaan.
  useEffect( () => {
    onAuthStateChanged(auth, user => {
      setUser(user)
    })
  }, [])

  // useEffect-kuuntelija, joka hakee Firestoresta type-kokoelman
  // type-kentät aakkosjärjestyksessä ja päivittää ne typelist-tilaan
  // reaaliaikaisesti.
  useEffect( () => {
    if (user) {
      const unsubscribe = onSnapshot(query(collection(firestore,`user/${user.uid}/type`),
                                           orderBy('type')),
                                     snapshot => {
        const newTypelist = []
        snapshot.forEach( doc => {
          newTypelist.push(doc.data().type)
        })
        setTypelist(newTypelist)
    })
    return unsubscribe
    } else {
      setTypelist([])
    }
  }, [user])


  // Poistaa olemassa olevan tuotteen Firestore-tietokannasta
  // item-kokoelmasta annetun dokumentin id-tunnisteen perusteella.
  const handleItemDelete = async (id) => {
    await deleteDoc(doc(firestore, `user/${user.uid}/item`, id))
  }


  // Tallentaa uuden tai päivitetyn tuotteen Firestore-tietokannan
  // item-kokoelmaan. Dokumentin tunnisteena käytetään newitem-olion
  // id-arvoa.
  const handleItemSubmit = async (newitem) => {
    await setDoc(doc(firestore, `user/${user.uid}/item`, newitem.id), newitem)

  }


 // Tallentaa uuden tyypin Firestore-tietokannan type-kokoelmaan.
  const handleTypeSubmit = async (type) => {
    await addDoc(collection(firestore,`user/${user.uid}/type`),{type: type})
  }

  return (
    <>
    { user ?
          <AppRouter data={data}
                     typelist={typelist}
                     onItemSubmit={handleItemSubmit}
                     onItemDelete={handleItemDelete}
                     onTypeSubmit={handleTypeSubmit}
                     auth={auth}
                     user={user} />
        : <Startup auth={auth} />
      }
      </>
  )
}

export default App

/**
 * Sovelluksen juurikomponentti.
 *
 * Komponentti hallitsee budjettisovelluksen keskeistä tilaa ja
 * välittää datan sekä käsittelijäfunktiot `AppRouter`-komponentille.
 *
 * Tallennettavat tiedot:
 * - `data`: sovelluksen budjettimerkinnät
 * - `typelist`: sovelluksen kulutyypit
 *
 * Komponentin vastuulla on:
 * - hakea ja tallentaa merkintädata
 * - hakea ja tallentaa kulutyypit
 * - lisätä uusia merkintöjä tai päivittää olemassa olevia
 * - poistaa merkintöjä id:n perusteella
 * - lisätä uusia kulutyyppejä ja järjestää ne aakkosjärjestykseen
 * - järjestää merkinnät maksupäivän mukaan siten, että uusin näkyy ensin
 *
 * @returns {JSX.Element} Sovelluksen reitityksestä vastaava `AppRouter`-komponentti,
 * jolle välitetään data, kulutyypit sekä käsittelijäfunktiot propsien kautta.
 */
