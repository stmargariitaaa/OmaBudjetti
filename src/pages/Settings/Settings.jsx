import Button from '../../shared/ui/buttons'
import styles from './Settings.module.scss'


function Settings(props) {

  const handleTypeSubmit = (event) => {
    event.preventDefault()
    const newtype = event.target.elements.type.value
    props.onTypeSubmit(newtype)
    event.target.elements.type.value = ''
  }

  // Kirjaa käyttäjän ulos Firebase Authenticationista.
  const logout = () => {
    signOut(props.auth)
  }

  return (
    <div className={styles.settings}>
      <h2>Asetukset</h2>
      
      <h3>Kulutyypit</h3>
      <div className={styles.settings_types}>
        { props.typelist.map(
            type => <div key={type}>{type}</div>
        )}

        <form onSubmit={handleTypeSubmit}>
          <div className={styles.settings_form}>
            <input type='text' name='type' />
            <Button type='submit' primary>Lisää</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Settings

/**
 * Sovelluksen asetussivu kulutyyppien hallintaan.
 *
 * Komponentti:
 * - näyttää listan olemassa olevista kulutyypeistä
 * - tarjoaa lomakkeen uuden kulutyypin lisäämiseen
 *
 * @param {Object} props
 * @param {string[]} props.typelist - Lista olemassa olevista kulutyypeistä
 * @param {Function} props.onTypeSubmit - Funktio, jota kutsutaan kun uusi kulutyyppi lisätään
 * @returns {JSX.Element} Näkymä, joka sisältää kulutyyppien listan ja lisäyslomakkeen
 *
 * @example
 * <Settings
 *   typelist={['Ruoka', 'Asuminen', 'Liikenne']}
 *   onTypeSubmit={handleTypeSubmit}
 * />
 */
