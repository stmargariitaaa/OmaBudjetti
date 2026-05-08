import cx from './cx'
import styles from './buttons.module.css'
import Button from './Button'

/**
 * Kelluva painike (Floating Action Button), joka pohjautuu yleiseen Button‑komponenttiin.
 *
 * Komponentti lisää Buttonille kelluvan sijainnin (esim. näkymän alakulmaan)
 * CSS Modules ‑tyylien avulla. Varsinainen toiminnallisuus ja ulkoasu
 * periytyvät Button‑komponentilta.
 *
 * Käytetään tyypillisesti ensisijaiseen, nopeasti saavutettavaan toimintoon,
 * kuten “Lisää”, “Uusi” tai “Avaa”.
 *
 * Mahdollinen `className` yhdistetään komponentin omiin kelluviin tyyleihin.
 * Kaikki muut propsit välitetään suoraan Button‑komponentille
 * (esim. `onClick`, `primary`, `aria-label`).
 *
 * @param {Object} props
 *   Komponentin props-objekti.
 *
 * @param {string} [props.className]
 *   Mahdollinen lisäluokkanimi, joka yhdistetään kelluvan painikkeen tyyleihin.
 *
 * @returns {JSX.Element}
 *   Renderöitävä Floating Button.
 *
 * @example
 * <FloatingButton
 *   primary
 *   aria-label="Lisää uusi"
 *   onClick={handleAdd}
 * >
 *   +
 * </FloatingButton>
 */
function FloatingButton({className, ...props}) {
  return (
    <Button className={cx(
              styles.button_floating,
              className
            )}
            {...props} />
  )
}

export { FloatingButton as default, FloatingButton }
