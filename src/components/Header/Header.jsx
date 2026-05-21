import styles from './Header.module.scss'

/**
 * Sovelluksen yläosan otsakekomponentti.
 *
 * Header sisältää sovelluksen nimen ja sijoittuu näkymän yläosaan.
 *
 * @example
 * <Header />
 *
 * @returns {JSX.Element}
 */
function Header() {

  return (
    <div className={styles.header}>
      <h1>
        <span>Oma</span>
        Budjetti
      </h1>
    </div>
  )

}

export default Header
