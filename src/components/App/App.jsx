import styles from './App.module.scss'
import Item from '../Item'
import Header from '../Header'
import Menu from '../Menu'
import Content from '../Content'
import Button from '../../shared/ui/buttons'
import { ButtonContainer, FloatingButton } from '../../shared/ui/buttons'
import Items from '../../pages/Items'
import Stats from '../../pages/Stats'
import Settings from '../../pages/Settings'



function App() {

      return (
    <>
      <ButtonContainer>
      <div className={styles.app}>
        <Header />
        <Content>
          <Settings />
        </Content>
        <Menu />
      </div>
      </ButtonContainer>
    </>
  )


}

export default App
