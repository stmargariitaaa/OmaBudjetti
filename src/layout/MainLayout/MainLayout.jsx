import styles from './MainLayout.module.scss'
import { ButtonContainer } from '../../shared/ui/buttons'
import Content from '../../components/Content'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import { Outlet } from 'react-router'

function MainLayout() {

  return (
    <div className={styles.layout}>
      <ButtonContainer>
        <div className={styles.layout_app}>
          <Header />
          <Content>
            <Outlet />
          </Content>
          <Menu />
        </div>
      </ButtonContainer>
    </div>
  )
}

export default MainLayout
