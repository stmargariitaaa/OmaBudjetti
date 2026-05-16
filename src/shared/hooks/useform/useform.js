import { useState } from 'react'

const useForm = (callback, initialState={}, resetOnSubmit=true) => {

    // Esitellään useState-hooks, johon käyttäjän lomakkeelle
  // syöttämä tieto tallennetaan. Lähtökohtaisesti kenttien 
  // sisällöksi tulee alkuarvot.
  const [values, setValues] = useState(initialState)

    // Syötekäsittelijä, joka tallentaa kentän tiedot
  // sen nimellä state-muuttujaan.
  const handleChange = (event) => {
    // Tallennetaan kenttään syötetty arvo ja kentän 
    // nimi välimuuttujiin.
    const value = event.target.value
    const key = event.target.name
    // Tallennetaan uusi arvo state-muuttujaan.
    // Avaimeksi määritetään key-muuttujan arvo eli 
    // sen lomakekentän name-arvo, jota muokattiin. 
    setValues(prevValues => ({...prevValues, [key]: value}))
  }
  
    // Submit-käsittelijä, joka estää oletustoiminnan ja 
  // kutsuu määriteltyä callback-funktiota. 
  // Alustaa tarvittaessa lomaketiedot alkutilanteeseen.
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    callback()
    if (resetOnSubmit) resetValues()
  }
  
   // Funktio, joka palauttaa lomakkeen tiedot alkutilanteeseen.
  const resetValues = () => {
    setValues(initialState)
  }
  
    // Palautetaan luonnin yhteydessä sekä käsittelijät että
  // tilamuuttuja.
  return {
    handleChange,
    handleSubmit,
    resetValues,
    setValues,
    values
  }

}

export default useForm
