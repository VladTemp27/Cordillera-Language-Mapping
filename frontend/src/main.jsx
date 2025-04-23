import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import Home from './pages/Home.jsx';
import Mapping from './pages/Mapping.jsx';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/language-mapping',
        element:<Mapping />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
