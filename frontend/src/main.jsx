import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
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
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
