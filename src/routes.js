import React from 'react';
// const About = React.lazy(() => import('./layouts/About'));
const Dashboard = React.lazy(() => import('./layouts/Dashboard'));
const Page404 = React.lazy(() => import('./layouts/Page404'));


const routes = [
  {
    path: '/',
    exact: true,
    main: () => <Dashboard/>
  },
  // {
  //   path: '/about',
  //   main: () => <About/>
  // },
  {
    path: '/*',
    main: (data) => <Page404 data={data} />
  }
];

export default routes;
