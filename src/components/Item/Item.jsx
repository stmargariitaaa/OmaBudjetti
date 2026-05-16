import { MdNavigateNext } from 'react-icons/md'
import styles from "./Item.module.scss";

/**
 * Item‑komponentti vastaa yksittäisen tapahtuman näyttämisestä.
 *
 * Komponentti saa datan propsien kautta ja:
 * - muotoilee päivämäärät käyttäjän lokaalin (fi-FI) mukaisesti
 * - muotoilee rahasummat euromuotoon Intl.NumberFormat‑API:n avulla
 * - laskee tarvittaessa keskimääräisen kuukausisummaa ajanjakson perusteella
 *
 * @param {Object} props - Komponentin propsit
 * @param {Object} props.data - Yksittäisen itemin data
 * @returns {JSX.Element} Renderöity item‑näkymä
 */
function Item({data, ...props}) {
  if (!data) return null

  const locale = "fi-FI"

  const paymentDate = new Date(data.paymentDate).toLocaleDateString(locale)

  const numberFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR'
  })

  const amount = numberFormat.format(data.amount)

  let average
  let period

  if (data.periodStart && data.periodEnd) {
    const periodStart = new Date(data.periodStart)
    const periodEnd = new Date(data.periodEnd)

    period = periodStart.toLocaleDateString(locale) + " - " +
             periodEnd.toLocaleDateString(locale)

    const days = (periodEnd - periodStart) / (24*60*60*1000)

    average = numberFormat.format(data.amount / days * 30)
  }

  return (
    <div className={styles.item}>
      <div className={styles.item_data}>
        <div className={styles.item_type}>{data.type}</div>
        <div className={styles.item_amount}>{amount}</div>
        <div className={styles.item_date}>{paymentDate}</div>
        <div className={styles.item_timespan}>{period}</div>
        <div className={styles.item_receiver}>{data.receiver}</div>
        <div className={styles.item_average}>{average ? average + " /kk" : ""}</div>
      </div>
      <div className={styles.item_edit}>
        <MdNavigateNext />
      </div>
    </div>
  )
}

export default Item