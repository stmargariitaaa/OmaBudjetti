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
                formData={data.item} />
    </div>
  )

}

export default EditItem
