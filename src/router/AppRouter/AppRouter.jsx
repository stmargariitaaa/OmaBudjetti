import { createBrowserRouter, RouterProvider } from 'react-router'
import AddItem from '../../pages/AddItem'
import EditItem from '../../pages/EditItem'
import ErrorPage from '../../pages/ErrorPage'
import Items from '../../pages/Items'
import MainLayout from '../../layout/MainLayout'
import Settings from '../../pages/Settings'
import Stats from '../../pages/Stats'



function AppRouter(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
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
        { path: "stats", element: <Stats /> },
        { path: "settings", element: <Settings /> }
        
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter