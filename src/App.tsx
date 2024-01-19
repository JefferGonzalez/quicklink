import Root from '@/Root'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '*',
    Component: Root
  }
])

function App(): JSX.Element {
  return <RouterProvider router={router} />
}

export default App
