import styles from './ErrorPage.module.scss'
import { useRouteError } from 'react-router'

function ErrorPage() {

  const error = useRouteError();
  return (
    <div className={styles.errorpage}>
      <h2>Hupsis!</h2>
      <p>Valitettavasti tapahtui odottamaton virhe.</p>
      <p>{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorPage

/**
 * Virhesivu sovelluksen reititykseen liittyville virhetilanteille.
 *
 * Komponentti:
 * - hakee virheen tiedot React Routerin `useRouteError`-hookilla
 * - näyttää käyttäjälle geneerisen virheilmoituksen
 * - tulostaa tarkemman virhekuvauksen (statusText tai message)
 *
 * @returns {JSX.Element} Virhenäkymä, joka sisältää otsikon ja virheen kuvauksen
 */

