import styles from './App.module.scss'
import Item from '../Item'
import Header from '../Header'
import Menu from '../Menu'
import Content from '../Content'
import Button from '../../shared/ui/buttons'
import { ButtonContainer, FloatingButton } from '../../shared/ui/buttons'





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
          <FloatingButton secondary>+</FloatingButton>
          
        </Content>
        <Menu />
      </div>
      </ButtonContainer>
    </>
  )


}

export default App
