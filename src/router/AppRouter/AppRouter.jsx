import { createBrowserRouter, RouterProvider } from 'react-router'
import AddItem from '../../pages/AddItem'
import EditItem from '../../pages/EditItem'
import ErrorPage from '../../pages/ErrorPage'
import Items from '../../pages/Items'
import MainLayout from '../../layout/MainLayout'
import Settings from '../../pages/Settings'
import Stats from '../../pages/Stats'
import Loader from '../../pages/Loader'




function AppRouter(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      hydrateFallbackElement: <Loader />,
      children: [
        { path: "",
          element: <Items />,
          loader: () => { return props.data } },
        { path: "add",
          element: <AddItem onItemSubmit={props.onItemSubmit}
                            typelist={props.typelist} /> },
        { path: "edit/:id",
          element: <EditItem onItemSubmit={props.onItemSubmit}
                             onItemDelete={props.onItemDelete}
                             typelist={props.typelist} />,
          loader: ({params}) => {
            const item = props.data.filter(item => item.id === params.id).shift()
            if (item) {
              return { item }
            } else {
              throw new Response("Not Found", { status: 404 })
            }
          } },
        { path: "stats", element: <Stats data={props.data} /> },
        { path: "settings",
         element: <Settings typelist={props.typelist}
                             onTypeSubmit={props.onTypeSubmit}
                             user={props.user}
                             auth={props.auth} /> }
        
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter

/**
 * Sovelluksen reitityksestä vastaava komponentti.
 *
 * Komponentti:
 * - määrittelee sovelluksen reitit React Routerin `createBrowserRouter`-funktion avulla
 * - liittää näkymät yhteiseen `MainLayout`-asetteluun
 * - määrittää virhesivun reitityksen virhetilanteita varten
 * - välittää tarvittavat propsit eri sivukomponenteille
 * - käyttää loader-funktioita datan välittämiseen reiteille
 *
 * Reitit:
 * - `/` näyttää merkintöjen listauksen
 * - `/add` näyttää uuden merkinnän lisäyslomakkeen
 * - `/edit/:id` näyttää valitun merkinnän muokkauslomakkeen
 * - `/stats` näyttää tilastonäkymän
 * - `/settings` näyttää asetussivun
 *
 * @param {Object} props
 * @param {Object[]} props.data - Merkinnät
 * @param {string[]} props.typelist - Lista käytettävissä olevista kulutyypeistä
 * @param {Function} props.onItemSubmit - Funktio, jota kutsutaan kun merkintä lisätään tai tallennetaan
 * @param {Function} props.onItemDelete - Funktio, jota kutsutaan kun merkintä poistetaan
 * @param {Function} props.onTypeSubmit - Funktio, jota kutsutaan kun uusi kulutyyppi lisätään
 * @returns {JSX.Element} RouterProvider-komponentti, joka huolehtii sovelluksen reitityksestä
 *
 * @example
 * <AppRouter
 *   data={data}
 *   typelist={typelist}
 *   onItemSubmit={handleItemSubmit}
 *   onItemDelete={handleItemDelete}
 *   onTypeSubmit={handleTypeSubmit}
 * />
 */
