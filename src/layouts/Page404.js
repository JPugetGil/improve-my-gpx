// import React from 'react';
import routes from '../routes';


export default function Page404({data}) {

  if (routes.findIndex(route => route.path === data.location.pathname) < 0) {
    return ("Page 404");
  } else {
    return null;
  }
}