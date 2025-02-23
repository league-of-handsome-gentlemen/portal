import { LoginPage } from './login/login-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from './private-routes';
import { Home } from "./home";

const { BASE_URL } = import.meta.env;

export const App = () => {
  return (
    <div className="container">
      <BrowserRouter basename={BASE_URL}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home />}></Route>
            <Route path='/other' element={<h1>Other</h1>}></Route>
          </Route>
          <Route path='/login' element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
