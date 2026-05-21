import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LabelList, Legend, Pie, PieChart } from 'recharts'
import { Cell } from 'recharts'
import randomColor from 'randomcolor'
import styles from './Stats.module.scss'


/**
 * Näyttää kulutustiedoista muodostetut tilastot kaavioina.
 *
 * Komponentti muodostaa annetusta datasta kaksi visualisointia:
 * - viivakaavion maksujen summista päivämäärittäin
 * - piirakkakaavion maksujen summista kulutyypeittäin
 *
 * Lisäksi komponentti muotoilee euromäärät ja päivämäärät
 * suomen lokaaliasetusten mukaisesti.
 *
 * @param {Object} props - Komponentille välitettävät propsit.
 * @param {Array<Object>} props.data - Tilastoitavat kulurivit.
 * @param {string} props.data[].paymentDate - Maksun päivämäärä.
 * @param {number} props.data[].amount - Maksettu summa euroina.
 * @param {string} props.data[].type - Kulun tyyppi.
 * @returns {JSX.Element} Tilastonäkymä, joka sisältää viiva- ja piirakkakaavion.
 */

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
  
                                // Toinen reducer-funktio, joka ryhmittelee ja yhdistää tiedot
  // type-kentän perusteella.
  const reduceByType = (resultData, item) => {
    return reducer(resultData, item, 'type')
  }

  // Muodostetaan piirakkakaavion data ryhmittelemällä merkinnät
  // type-kentän mukaan.
  const piedata = props.data.reduce(reduceByType, [])


  // Luodaan taulukko satunnaisia väriarvoja. Väriarvojen määrä
  // vastaa piedata-taulukon alkioiden lukumäärää, jotta jokaiselle
  // Pie-osuudelle voidaan asettaa oma fill-väri
  const piecolors = randomColor({ count: piedata.length,
                                  seed: 'siemenluku',
                                  luminosity: 'dark' })

  // Muodostetaan uusi taulukko, jossa jokaisesta piedata-taulukon
  // alkiosta tehdään kopio ja kopioon lisätään fill-kenttä.
  // fill-kentän arvo haetaan piecolors-taulukosta saman indeksin
  // kohdalta, jolloin jokainen PieChartin data-alkio saa oman
  // väriarvonsa.
  const pieWithColors = piedata.map((item, index) => ({
    ...item,
    fill: piecolors[index]
  }))

  return (
    <div className={styles.stats}>
      <h2>Tilastot</h2>
      { props.data.length ? <>
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
      

      <h3>Kulut kulutyypeittäin</h3>
      <ResponsiveContainer height={400}>
        <PieChart>
          <Pie data={pieWithColors} dataKey='amount' nameKey='type'>
            <LabelList dataKey='amount'
                       position='inside'
                       fill='white'
                       formatter={
                         value => numberFormat.format(value)
                       } />
          </Pie>
          <Legend />
          <Tooltip formatter={ value => numberFormat.format(value) } />
        </PieChart>
      </ResponsiveContainer>
      
      </> : <div className={styles.stats_empty}>Tilastotietoja ei ole saatavilla. Syötä kulutietoja.</div> }
    </div>
  )
}

export default Stats
