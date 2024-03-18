import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx';
import New from './routers/products/new.tsx';
import Register from './routers/auth/register.tsx';
import Login from './routers/auth/login.tsx';
import Users from './routers/users/users.tsx';
import Products from './routers/products/products.tsx';
import Category from './routers/category/category.tsx';
import Edit from './routers/products/edit.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Dashboard from './routers/dashboard.tsx';
import Orders from './routers/orders/orders.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: "/products",
        children: [
          {
            path: "/products/",
            element: <Products />,
          },
          {
            path: '/products/new',
            element: <New />
          },
          {
            path: '/products/edit',
            element: <Edit />
          }
        ]
      },
      {
        path: "/orders",
        children: [
          {
            path: '/orders/',
            element: <Orders />
          }
        ]
      },
      {
        path: "/categories",
        element: <Category />
      },
      {
        path: "/inventory",
        element: <h1>inventory</h1>,
      },
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/permissions",
        element: <h1>permission</h1>,
      },
      {
        path: "/report",
        element: <h1>report</h1>,
      },
    ],
  },
  {
    path: '/auth',
    children: [
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <Register />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // App = layout
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
