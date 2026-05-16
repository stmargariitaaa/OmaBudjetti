import styles from './Startup.module.scss'
import Button from '../../shared/ui/buttons'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

/**
 * Aloitusnäkymä, jossa käyttäjä voi kirjautua sovellukseen
 * Google-tunnuksilla Firebase Authenticationin popup-kirjautumisen avulla.
 *
 * Komponentti luo Google-kirjautumisen providerin, määrittää käyttäjän
 * valitsemaan kirjautumistilin ja käynnistää kirjautumisen napin
 * painalluksesta.
 *
 * @param {Object} props Komponentille välitettävät ominaisuudet.
 * jota käytetään kirjautumisen suorittamiseen.
 * @returns {JSX.Element} Aloitusnäkymän käyttöliittymä.
 */
function Startup (props) {

  // Luodaan yhteys Googlen kirjautumiseen.
  const google = new GoogleAuthProvider()

  // Käyttäjä valitsee kirjautumisessa tilin, jolla kirjautuu.
  google.setCustomParameters({
    prompt : 'select_account'
  })

  // Kytketään Google-kirjautuminen popup-kirjautumiseen.
  const signInWithGooglePopup = () => signInWithPopup(props.auth, google)

  // Kirjautumisnapin käsitelijä, jossa kutsutaan auth-palvelun
  // popup-kirjautumiskäsittelijää, joka on kytketty Googlen
  // kirjautumiseen.
  const signInGoogle = async () => {
    await signInWithGooglePopup()
  }

  return (
    <div className={styles.startup}>
      <h1><span>Oma</span>Budjetti</h1>
      <div>Tervetuloa käyttämään taloudenhallintasovellusta,
           jolla voi seurata omia menoja.</div>
      <Button onClick={signInGoogle}>Kirjaudu Google-tunnuksilla</Button>
    </div>
  )
}

export default Startup
