import { useEffect, useState } from "react"

/**
 * Muuntaa annetun arvon JSON-merkkijonoksi.
 *
 * @param {*} value - Tallennettava arvo.
 * @returns {string} JSON-muotoinen merkkijono.
 */
const decode = (value) => {  
  return JSON.stringify(value)
}

/**
 * Purkaa JSON-merkkijonon JavaScript-arvoksi.
 *
 * @param {string} value - Purettava JSON-merkkijono.
 * @returns {*} JSON-merkkijonosta purettu JavaScript-arvo.
 */
const encode = (value) => {
  return JSON.parse(value)
}

/**
 * Reactin custom hook, joka sitoo tilamuuttujan localStorageen.
 *
 * Hook lukee alkuarvon localStoragesta annetulla avaimella. Jos arvoa ei löydy,
 * käytetään parametrina annettua oletusarvoa. Kun tilan arvo muuttuu, uusi arvo
 * tallennetaan automaattisesti localStorageen.
 *
 * Lisäksi hook palauttaa erillisen reset-funktion, jolla tila voidaan palauttaa
 * oletusarvoonsa.
 *
 * @param {string} key - localStorage-avain, jonka alle arvo tallennetaan.
 * @param {*} defaultState - Oletusarvo, jota käytetään jos localStoragesta ei löydy tallennettua arvoa.
 * @returns {[*, Function, Function]} Taulukko, joka sisältää nykyisen arvon, tilan päivitysfunktion ja reset-funktion.
 */
const useLocalStorage = (key, defaultState) => {

  // Tilamuuttujan määrittely, arvoksi haetaan joko
  // localStorage-muuttujan arvo tai alkuarvo.
  const [value, setValue] = useState(
    encode(localStorage.getItem(key) || null) || defaultState
  );

  // Tallennetaan tilamuuttuja localStorageen aina,
  // kun arvo muuttuu.
  useEffect(() => {
    localStorage.setItem(key, decode(value));
  },  [value])

  /**
   * Palauttaa tilamuuttujan arvon oletusarvoon.
   *
   * @returns {void}
   */
  const resetValue = () => {
    setValue(defaultState)
  }

  // Palautetaan nykyinen arvo, setter-funktio sekä reset-funktio.
  return [value, setValue, resetValue]
}

export default useLocalStorage
