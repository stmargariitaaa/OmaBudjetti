import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import styles from './Stats.module.scss'

function Stats(props) {

  // Käytettävä lokaaliasetus päivämäärän muotoiluun.
  const locale = "fi-FI"

  // Luodaan NumberFormat-olio euromääräisten summien esittämiseen.
  const numberFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR'
  })

// Yleiskäyttöinen reducer-funktio reduce()-metodia varten.
  // Funktio käy läpi yhden item-olion kerrallaan ja kerää
  // tulokset resultData-taulukkoon. Jos samalla key-arvolla
  // oleva alkio löytyy jo resultData-taulukosta, sen amount-arvoon
  // lisätään item.amount. Muussa tapauksessa resultData-taulukkoon
  // lisätään uusi alkio.
  const reducer = (resultData, item, key) => {
    // Etsitään, löytyykö resultData-taulukosta jo alkio,
    // jolla on sama key-kentän arvo kuin käsiteltävällä item-oliolla.
    const index = resultData.findIndex(arrayItem => arrayItem[key] === item[key])
    // Jos saman key-arvon sisältävä alkio löytyi, ...
    if (index >= 0) {
      // niin lisätään nykyisen itemin amount olemassa olevan alkion amount-arvoon.
      resultData[index].amount = resultData[index].amount + item.amount
    } else {
      // Jos vastaavaa alkiota ei vielä ole, lisätään resultData-taulukkoon
      // uusi alkio.
      resultData.push({[key]: item[key], amount: item.amount})
    }
    // Palautetaan päivitetty kertymä seuraavaa reduce()-kierrosta varten.
    return resultData
  }

  // Reducer-funktio, joka ryhmittelee ja yhdistää tiedot
  // paymentDate-kentän perusteella. Tämä toimii apufunktiona
  // reduce()-metodissa ja hyödyntää yleiskäyttöistä reducer-funktiota.
  const reduceByPaymentDate = (resultData, item) => {
     // Kutsutaan yleistä reducer-funktiota ja annetaan ryhmittelyn
     // avaimeksi paymentDate.
    return reducer(resultData, item, 'paymentDate')
  }

  // Muodostaa kaaviota varten uuden taulukon kahdessa vaiheessa.
  // Ensin yhdistetään saman paymentDate-arvon rivit reduce()-metodilla,
  // sitten muunnetaan tulos muotoon, jossa päivämäärä on aikaleimana ja
  // amount on mukana sellaisenaan
  const linedata = props.data.reduce(reduceByPaymentDate, [])
                             .map(
                               (item) => ({
                                 date: new Date(item.paymentDate).getTime(),
                                 amount: item.amount
                               })
                             )

  return (
    <div className={styles.stats}>
      <h2>Tilastot</h2>
      <h3>Kulut aikajanalla</h3>
      <ResponsiveContainer height={350}>
        <LineChart data={linedata} type='monotone'>
          <Line dataKey='amount' />
          <XAxis type='number'
                 dataKey='date'
                 domain={['auto','auto']}
                 scale='time'
                 minTickGap={32}
                 tickFormatter={
                   value => new Date(value).toLocaleDateString(locale)
                 } />
          <YAxis />
          <Tooltip labelFormatter={
                     value => new Date(value).toLocaleDateString(locale)
                   }
                   formatter={
                     value => [numberFormat.format(value),"maksettu"]
                   } />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Stats
