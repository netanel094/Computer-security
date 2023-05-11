import './App.css';
import LoginPage from './Pages/Login/Login';
import RegisterPage from './Pages/Register/Register';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import System from './Pages/System/System';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} index />
      <Route element={<RegisterPage />} path="RegisterPage" />
      <Route element={<ChangePassword />} path="ChangePassword" />
      <Route element={<ForgotPassword />} path="ForgotPassword" />
      <Route element={<ResetPassword />} path="ResetPassword" />
      <Route element={<System />} path="System" />
    </Routes>
  );
}

export default App;
