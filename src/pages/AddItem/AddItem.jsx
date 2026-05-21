import styles from './AddItem.module.scss'
import ItemForm from '../../components/ItemForm'

function AddItem(props) {

  return (
    <div className={styles.additem}>
      <h2>Uuden merkinnän lisääminen</h2>
    <ItemForm onItemSubmit={props.onItemSubmit}
                typelist={props.typelist} />


    </div> 
  )

}

export default AddItem

/**
 * Näkymä uuden budjettimerkinnän lisäämiseen.
 *
 * Komponentti toimii "wrapperina" `ItemForm`-komponentille ja:
 * - näyttää otsikon lisäyssivulle
 * - välittää tarvittavat propsit eteenpäin lomakkeelle
 *
 * @param {Object} props
 * @param {Function} props.onItemSubmit - Funktio, jota kutsutaan kun uusi merkintä tallennetaan
 * @param {string[]} props.typelist - Lista käytettävissä olevista kulutyypeistä
 * @returns {JSX.Element} Näkymä, joka sisältää otsikon ja ItemForm-lomakkeen
 *
 * @example
 * <AddItem
 *   typelist={['Ruoka', 'Asuminen', 'Liikenne']}
 *   onItemSubmit={handleItemSubmit}
 * />
 */

