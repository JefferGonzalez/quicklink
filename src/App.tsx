import { API_URL } from '@/Config'
import Root from '@/Root'
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
    path: '/s/:slug',
    element: <Slug />,
    loader: async ({ params: { slug } }) => {
      const response = await fetch(`${API_URL}/api/slug/${slug}`)

      if (!response.ok) {
        const statusCode = response.status

        if (statusCode === 404) {
          throw new Error('No data found.')
        }
      }

      const { data }: Response = await response.json()

      if (!data) {
        throw new Error('No data found.')
      }

      window.location.href = data.url

      return null
    },
    errorElement: <NotFound />
  }
])

function App(): JSX.Element {
  return <RouterProvider router={router} />
}

export default App
