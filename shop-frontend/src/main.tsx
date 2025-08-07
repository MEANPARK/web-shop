import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import { AuthProvider } from './AuthContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/profile',
    element: <Home />,
  },
])

createRoot(document.getElementById('root')!).render(
  <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </>,
)

