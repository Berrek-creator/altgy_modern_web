//import React from 'react'
import ReactDOM from 'react-dom/client'

import Root from './routes/root.jsx'
import ErrorPage from './error-page.jsx'

import BodyMain from './components/BodyMain.jsx'

import SingleNews from './routes/lab4/SingleNews.jsx'
import SingleDraft from './routes/lab6/SingleDraft.jsx'

import Auth from './components/Auth.jsx'
import PostDrafts from './routes/lab6/PostDrafts.jsx'
import CreateEditPost from './routes/lab6/CreateEditDraft.jsx'


import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import { useEffect } from 'react'

import Home from './pages/home.jsx'
import About from './pages/about.jsx'

import Header from './components/Header.jsx'


// В данный компонент нужно обернуть компонент, для которого нужна авторизация
function PrivateRoute({ children }) {
    let navigate = useNavigate()
    let is_auth = useSelector(store => store.auth.is_auth)

    useEffect(() => {
      console.log("Auth route?:", is_auth)
      if (!is_auth) {
        navigate('/login');
      }
    }, [is_auth])

    // иначе, выполнение дойдет досюда и будет возвращен компонент
    return children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home></Home>
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/motilda',
        element: <Header />
      },
      {
        path: '/login',
        element: <Auth />
      },
      {
        path: '/labs/:id',
        element: <BodyMain />,
      },
      {
        path: '/labs/4/news/:id',
        element: <SingleNews />
      },
      {
        path: '/labs/6/drafts/',
        element: (
          <PrivateRoute>
            <PostDrafts />
          </PrivateRoute>
        )
      },
      {
        path: '/labs/6/drafts/:id',
        element: (
          <PrivateRoute>
            <SingleDraft />
          </PrivateRoute>
        )
      },
      {
        // create отвечает за создание и обновление
        path: '/labs/6/drafts/create/:id?',
        element: (
          <PrivateRoute>
            <CreateEditPost />
          </PrivateRoute>
        )
      },
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>,
)
