import { createBrowserRouter, RouterProvider } from 'react-router'
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
        { path: "", element: <Items /> },
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
