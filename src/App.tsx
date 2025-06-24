import { API_URL } from '@/Config'
import Root from '@/Root'
import Layout from '@/components/Layout'
import AuthProvider from '@/context/AuthContext'
import NotFound from '@/pages/NotFound'
import Slug from '@/pages/Slug'
import { Response } from '@/types'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '*',
    Component: Root
  },
  {
    path: 's/:slug',
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        path: '',
        element: <Slug />,
        loader: async ({ params: { slug } }) => {
          const response = await fetch(`${API_URL}/slug/${slug}`)

          if (!response.ok) throw new Error('No data found.')

          const { data }: Response = await response.json()

          if (!data) throw new Error('No data found.')

          window.location.href = data.url
          return null
        },
        errorElement: <NotFound />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
