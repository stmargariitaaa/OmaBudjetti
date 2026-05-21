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

/**
 * Sovelluksen pääasettelu (layout-komponentti).
 *
 * Vastaa sovelluksen perusrakenteesta, joka sisältää:
 * - yläpalkin (`Header`)
 * - sisällön (`Content`), johon reititetty näkymä renderöidään (`Outlet`)
 * - alapalkin / valikon (`Menu`)
 * - ympäröivän `ButtonContainer`-komponentin, joka tarjoaa yhteisen kontekstin painikkeille
 *
 * `Outlet`-komponenttia käytetään React Routerissa renderöimään
 * kulloinkin aktiivinen alireitti tämän layoutin sisään.
 *
 * Rakenne:
 *  - Header
 *  - Content (→ Outlet: vaihtuva sisältö)
 *  - Menu
 *
 * @returns {JSX.Element} Sovelluksen layout, jonka sisään reititetyt näkymät renderöityvät.
 */
