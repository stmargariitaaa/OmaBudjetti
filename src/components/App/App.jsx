import styles from './App.module.scss'
import Item from '../Item'
import Header from '../Header'
import Menu from '../Menu'
import Content from '../Content'
import Button from '../../shared/ui/buttons'
import { ButtonContainer, FloatingButton } from '../../shared/ui/buttons'
import Items from '../../pages/Items'






function App() {

      return (
    <>
      <ButtonContainer>
      <div className={styles.app}>
        <Header />
        <Content>
          <Item />
          <Item />
          <Item />
          <Item />
          <Items />
          <FloatingButton secondary>+</FloatingButton>
          
        </Content>
        <Menu />
      </div>
      </ButtonContainer>
    </>
  )


}

export default App
