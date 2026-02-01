import { getURLBySlug } from '@/modules/short-link/use-cases'
import NotFound from '@/pages/NotFound'
import Slug from '@/pages/Slug'
import AuthProvider from '@/providers/AuthProvider'
import ThemeProvider from '@/providers/ThemeProvider'
import Root from '@/Root'
import Layout from '@/shared/components/Layout'
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
          if (!slug) throw new Error('Slug is required.')

          const response = await getURLBySlug(slug)

          if (!response.ok) throw new Error('No data found.')

          const { data } = response

          window.location.href = data.url
          return null
        },
        errorElement: <NotFound />
      }
    ]
  }
])

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
