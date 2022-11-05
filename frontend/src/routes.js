import { useRoutes } from 'react-router-dom';
import Home from './pages/home';
import PageNotFound from './pages/PageNotFound';

export default function Router() {
  return useRoutes([
    {
      path: '/bbt',
      element: <Home />,
      children: [
        {
            path: '/bbt/:currency',
            element: <Home />
        }
      ]
    },
    {
      path: '*',
      element: <PageNotFound />,
      children: [{ path: '*', element: <PageNotFound /> }]
    }
  ]);
}
