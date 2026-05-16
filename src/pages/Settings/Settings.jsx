import Button from '../../shared/ui/buttons'
import styles from './Settings.module.scss'
import { signOut } from 'firebase/auth'



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
      <h3>Profiili</h3>
      <div className={styles.settings_profile}>
        <div className={styles.settings_user}>
          <div><img src={props.user.photoURL} /></div>
          <div>{props.user.displayName}<br />
               {props.user.email}</div>
        </div>
        <div>
          <Button primary onClick={logout}>Kirjaudu ulos</Button>
        </div>
      </div>
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
