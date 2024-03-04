import React from 'react'
import ReactDOM from 'react-dom/client'

import Root from './routes/root.jsx'
import ErrorPage from './error-page.jsx'

import BodyMain from './components/Body_main.jsx'
import SingleNews from './routes/lab4/SingleNews.jsx'


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
        path: '/labs/:id',
        element: <BodyMain />,
      },
      {
        path: '/labs/4/news/:id',
        element: <SingleNews />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>,
)
