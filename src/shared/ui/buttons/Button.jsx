import styles from './buttons.module.css'
import cx from './cx'


/**
 * Yleiskäyttöinen painikekomponentti, joka tukee useita visuaalisia variantteja.
 *
 * Komponentti käyttää CSS Modules ‑tyylejä ja `cx`‑apufunktiota
 * yhdistääkseen luokkanimiä ehdollisesti propsien perusteella.
 *
 * Tuetut variantit:
 * - primary: ensisijainen toiminto
 * - secondary: vaihtoehtoinen toiminto
 * - warning: varoitus tai vaarallinen toiminto
 *
 * Useampi variantti voidaan teknisesti antaa yhtä aikaa,
 * mutta käytännössä suositellaan yhden variantin käyttöä kerrallaan.
 *
 * Kaikki muut propsit välitetään suoraan HTML `<button>`‑elementille,
 * esimerkiksi `onClick`, `disabled`, `aria-*` jne.
 *
 * @param {Object} props
 *   Komponentin props-objekti.
 *
 * @param {string} [props.className]
 *   Mahdollinen lisäluokkanimi, joka yhdistetään komponentin omiin tyyleihin.
 *
 * @param {boolean} [props.primary]
 *   Jos määritelty, käyttää primary‑variantin tyylejä.
 *
 * @param {boolean} [props.secondary]
 *   Jos määritelty, käyttää secondary‑variantin tyylejä.
 *
 * @param {boolean} [props.warning]
 *   Jos määritelty, käyttää warning‑variantin tyylejä.
 *
 * @returns {JSX.Element}
 *   Renderöitävä button‑elementti.
 *
 * @example
 * <Button primary onClick={handleSave}>
 *   Tallenna
 * </Button>
 *
 * @example
 * <Button secondary disabled>
 *   Peruuta
 * </Button>
 */


function Button({className, primary, secondary, warning, ...props}) {
  return (
        <button type='button'
            className={cx(
              styles.button,
              className,
              primary && styles.button_primary,
              secondary && styles.button_secondary,
              warning && styles.button_warning
            )}
            {...props} />

  )
}

export { Button as default, Button }
