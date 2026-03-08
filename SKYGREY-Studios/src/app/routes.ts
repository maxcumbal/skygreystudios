import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { Datenschutz } from './pages/Datenschutz';
import { Impressum } from './pages/Impressum';
import { AGB } from './pages/AGB';

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: '/',
        Component: HomePage,
      },
      {
        path: '/datenschutz',
        Component: Datenschutz,
      },
      {
        path: '/impressum',
        Component: Impressum,
      },
      {
        path: '/agb',
        Component: AGB,
      },
    ],
  },
]);