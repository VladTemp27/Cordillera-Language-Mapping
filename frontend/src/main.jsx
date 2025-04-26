import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home.jsx';
import Mapping from './pages/Mapping.jsx';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
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
],{
  basename: '/Cordillera-Language-Mapping/',
});

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
