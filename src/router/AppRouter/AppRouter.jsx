import { useMemo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import ErrorPage from '../../pages/ErrorPage'
import Items from '../../pages/Items'
import MainLayout from '../../layout/MainLayout'
import Settings from '../../pages/Settings'
import Stats from '../../pages/Stats'

function AppRouter({ data }) {
    const router = useMemo(() => createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Items />,
        loader: () => data,
      },
      { path: "stats", element: <Stats /> },
      { path: "settings", element: <Settings /> }
    ]
  }
], {
  future: {
    v7_startTransition: true,
  }
}), [data])

  return <RouterProvider router={router} />
}

export default AppRouter