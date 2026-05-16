import Button from '../../shared/ui/buttons'
import { useNavigate } from 'react-router'
import useForm from '../../shared/hooks/useform'
import styles from './ItemForm.module.scss'

function ItemForm(props) {

    // React Routerin hook näkymien välistä siirtymistä varten
  const navigate = useNavigate()
  // Lomakkeen varsinainen submit-toiminto
  const submit = () => {
    console.log(values)
    alert("SUBMIT")
  }

  // Lomakkeen alkutila
  const initialState = {
    type: "",
    amount: 0,
    paymentDate: "",
    periodStart: "",
    periodEnd: "",
    receiver: ""
  }

  // Haetaan lomakkeen state ja käsittelijät custom-hookista.
  const {values, handleChange, handleSubmit } = useForm(submit, initialState, false)

  // Peruuta-painikkeen toiminto. Ei tallenneta mitään,
  // palataan takaisin.
    const handleCancel = () => {
    navigate('/', { viewTransition: true })
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.itemform}>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='type'>Kulutyyppi</label>
              <select id='type' name='type' onChange={handleChange} value={values.type}>
                <option>Puhelin</option>
                <option>Sähkö</option>
                <option>Vesi</option>
                <option>Vero</option>
              </select>
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='amount'>Summa</label>
              <input id='amount' type='number' name='amount' step='0.01' onChange={handleChange} value={values.amount} />
            </div>
            <div>
              <label htmlFor='paymentDate'>Maksupäivä</label>
              <input id='paymentDate' type='date' name='paymentDate' onChange={handleChange} value={values.paymentDate} />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='periodStart'>Laskutuskauden alku</label>
              <input id='periodStart' type='date' name='periodStart' onChange={handleChange} value={values.periodStart} />
            </div>
            <div>
              <label htmlFor='periodEnd'>Laskutuskauden loppu</label>
              <input id='periodEnd' type='date' name='periodEnd' onChange={handleChange} value={values.periodEnd} />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <label htmlFor='receiver'>Saaja</label>
              <input id='receiver' type='text' name='receiver' onChange={handleChange} value={values.receiver} />
            </div>
          </div>
          <div className={styles.itemform_row}>
            <div>
              <Button onClick={handleCancel}>PERUUTA</Button>
            </div>
            <div>
              <Button primary type='submit'>LISÄÄ</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )

}


export default ItemForm
