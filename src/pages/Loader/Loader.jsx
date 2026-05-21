import styles from './Loader.module.scss'

/**
 * Latausnäkymä, joka näytetään sovelluksen tietojen lataamisen aikana.
 *
 * Tätä komponenttia voidaan käyttää esimerkiksi silloin,
 * kun dataa haetaan palvelimelta eikä varsinainen sisältö
 * ole vielä valmis näytettäväksi.
 *
 * @returns {JSX.Element} Latausnäkymän sisältävä käyttöliittymäelementti.
 */
function Loader() {
  return (
    <div className={styles.loader}>
      <h1><span>Oma</span>Budjetti</h1>
      <span className={styles.loader_spinner}></span>
      <div>Sovelluksen tietoja ladataan.</div>
    </div>  
  )
}

export default Loader
