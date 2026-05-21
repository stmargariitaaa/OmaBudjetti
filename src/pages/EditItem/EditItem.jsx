import ItemForm from '../../components/ItemForm'
import { useLoaderData } from 'react-router'
import styles from './EditItem.module.scss'

function EditItem(props) {

  // Haetaan loader-funktion palauttama data.
  const data = useLoaderData()

  return (
    <div className={styles.edititem}>
      <h2>Merkinnän muokkaaminen</h2>
      <ItemForm onItemSubmit={props.onItemSubmit}
                onItemDelete={props.onItemDelete}
                formData={data.item}
                typelist={props.typelist} />
    </div>
  )

}

export default EditItem

/**
 * Näkymä olemassa olevan budjettimerkinnän muokkaamiseen.
 *
 * Komponentti toimii "wrapperina" `ItemForm`-komponentille ja:
 * - näyttää otsikon muokkaussivulle
 * - hakee muokattavan merkinnän tiedot loader-funktion avulla
 * - välittää tiedot ja käsittelijäfunktiot eteenpäin lomakkeelle
 *
 * @param {Object} props
 * @param {Function} props.onItemSubmit - Funktio, jota kutsutaan kun merkintä tallennetaan
 * @param {Function} props.onItemDelete - Funktio, jota kutsutaan kun merkintä poistetaan
 * @param {string[]} props.typelist - Lista käytettävissä olevista kulutyypeistä
 * @returns {JSX.Element} Näkymä, joka sisältää otsikon ja esitäytetyn ItemForm-lomakkeen
 *
 * @example
 * <EditItem
 *   typelist={['Ruoka', 'Asuminen', 'Liikenne']}
 *   onItemSubmit={handleItemSubmit}
 *   onItemDelete={handleItemDelete}
 * />
 */
