import styles from './Items.module.scss'
import { FloatingButton } from '../../shared/ui/buttons'
import Item from '../../components/Item'
import { Link, useLoaderData } from 'react-router'


/**
 * Items-näkymäkomponentti.
 *
 * Hakee item-datan React Routerin loaderin kautta ja
 * renderöi sen Item-komponentteina listaksi.
 * Näkymä sisältää myös kelluvan toimintopainikkeen.
 *
 * @returns {JSX.Element}
 */


function Items() {
  const data = useLoaderData() || []

  const items = data.map(item => <Item key={item.id} data={item} />)

  return (
    <div className={styles.items}>
      {items}
      <Link to="/add" viewTransition><FloatingButton secondary>+</FloatingButton></Link>
    </div>
  )
}

export default Items