import * as React from "react";
import { LoginPage } from './login/login-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './private-routes';

const { BASE_NAME } = process.env;

export const App = () => {
  return (
    <div className="container">
      <BrowserRouter basename={BASE_NAME}>
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
