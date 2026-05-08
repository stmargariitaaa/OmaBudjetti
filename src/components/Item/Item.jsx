import styles from './Item.module.scss'

function Item() {
    return (
    <div className={styles.item}>
      <div className={styles.item_data}>
        <div className={styles.item_type}>Sähkö</div>
        <div className={styles.item_amount}>437,50 €</div>
        <div className={styles.item_date}>7.4.2026</div>
        <div className={styles.item_timespan}>1.1.2026 - 31.3.2026</div>
        <div className={styles.item_receiver}>Caruna Oy</div>
        <div className={styles.item_average}>147,47 €/kk</div>
      </div>
    </div>
  )
}

export default Item
