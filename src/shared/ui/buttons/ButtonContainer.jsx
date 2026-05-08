import cx from './cx'
import styles from './buttons.module.css'

/**
 * Säiliökomponentti FloatingButton‑komponentin ankkurointiin
 * sovelluksen näkymän sisälle.
 *
 * ButtonContainerin ensisijainen tarkoitus on toimia
 * kiinnityskontekstina (containing block) FloatingButtonille,
 * jotta kelluva painike sijoittuu sovelluksen oikeaan alakulmaan
 * eikä koko selainikkunan oikeaan alakulmaan.
 *
 * Komponentti ei vastaa painikkeiden visuaalisesta ulkoasusta
 * eikä logiikasta, vaan ainoastaan niiden sijoittelukontekstista.
 *
 * Mahdollinen `className` yhdistetään säiliön omiin tyyleihin,
 * ja kaikki muut propsit välitetään suoraan `<div>`‑elementille
 * (esim. `aria-*`, `data-*`).
 *
 * @param {Object} props
 *   Komponentin props-objekti.
 *
 * @param {string} [props.className]
 *   Mahdollinen lisäluokkanimi, joka yhdistetään säiliön omiin tyyleihin.
 *
 * @param {React.ReactNode} props.children
 *   Säiliön sisälle renderöitävä sisältö
 *   (käytännössä FloatingButton‑komponentti).
 *
 * @returns {JSX.Element}
 *   Renderöitävä säiliö FloatingButtonin ankkurointia varten.
 *
 * @example
 * <ButtonContainer>
 *   <FloatingButton primary>
 *     +
 *   </FloatingButton>
 * </ButtonContainer>
 */
function ButtonContainer({className, children, ...props}) {
  return (
    <div className={cx(
           styles.button_container,
           className
         )}
         {...props} >
      { children }
    </div>
  )
}

export { ButtonContainer as default, ButtonContainer }
