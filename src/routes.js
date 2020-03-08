import React from 'react';
// const About = React.lazy(() => import('./layouts/About'));
const Home = React.lazy(() => import('./layouts/Home'));
const Dashboard = React.lazy(() => import('./layouts/GPXMap'));


const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Home/>
  },
  {
    path: '/map',
    exact: true,
    main: () => <Dashboard/>
  },
  // {
  //   path: '/about',
  //   main: () => <About/>
  // }
];

export default routes;
