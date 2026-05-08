import styles from './Content.module.scss'

/**
 * Sovelluksen pääsisältöalue.
 *
 * Content-komponentti sijoittuu Header- ja Menu-komponentin väliin
 * ja vastaa näkymän varsinaisen sisällön esittämisestä.
 * Komponentti renderöi sille annetut lapset (children) sellaisenaan.
 *
 * @example
 * <Content>
 *   <div>Sisältöä..</div>
 * </Content>
 *
 * @param {object} props
 * @param {React.ReactNode} props.children Sivun sisältö
 * @returns {JSX.Element}
 */
function Content(props) {

  return (
    <div className={styles.content}>
      { props.children }
    </div>
  )

}

export default Content
