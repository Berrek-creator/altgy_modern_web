import React from 'react'
import ReactDOM from 'react-dom/client'

import Root from './routes/root.jsx'
import ErrorPage from './error-page.jsx'

import Lab from './routes/lab.jsx'
import Lab1 from './routes/lab1/lab1.jsx'
import Lab2 from './routes/lab2/lab2.jsx'

import Loader from './routes/lab4/loader.jsx'

import App from './App.jsx'

import BodyMain from './components/Body_main.jsx'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Lab />
      },
      {
        path: 'labs/1',
        element: <Lab1 />,
      },
      {
        path: 'labs/2',
        element: <Lab2 />
      },
      {
        path: 'labs/3',
        element: <Loader />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
