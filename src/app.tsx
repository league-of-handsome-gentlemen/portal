import * as React from "react";
import { LoginPage } from './login/login-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './private-routes';

export const App = () => {
  const { NODE_ENV } = process.env;
  const baseName = NODE_ENV === 'production' ? '/portal' : '/';

  return (
    <div className="container">
      <BrowserRouter basename={baseName}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<h1>Home</h1>}></Route>
            <Route path='/other' element={<h1>Other</h1>}></Route>
          </Route>
          <Route path='/login' element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
