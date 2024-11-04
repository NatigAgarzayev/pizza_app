import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from './components/Layout.tsx'
import Admin from './pages/admin/Admin.tsx'
import AdminPizzas from './pages/admin/AdminPizzas.tsx'
import AdminOrders from './pages/admin/AdminOrders.tsx'
import Menu from './pages/menu/Menu.tsx'
import WhoWeAre from './pages/whoweare/WhoWeAre.tsx'
import Order from './pages/order/Order.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/menu",
        element: <Menu />
      },
      {
        path: "/whoweare",
        element: <WhoWeAre />
      },
      {
        path: "/order",
        element: <Order />
      }
    ]
  },
  {
    path: "/admin/",
    element: <Admin />,
    children: [
      {
        path: "/admin/",
        element: <AdminPizzas />
      },
      {
        path: "/admin/orders",
        element: <AdminOrders />
      }
    ]
  },
])

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
)
