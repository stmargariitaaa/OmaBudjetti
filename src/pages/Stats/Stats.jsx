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

  // Muodostaa props.data-taulukosta uuden taulukon kaaviota varten,
  // paymentDate muunnetaan aikaleimaksi ja amount otetaan mukaan
  // sellaisenaan.
  const linedata = props.data.map(
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
