import './App.css';
import LoginPage from './Pages/Login/Login';
import RegisterPage from './Pages/Register/Register';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import System from './Pages/System/System';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} index />
          <Route element={<RegisterPage />} path="RegisterPage" />
          <Route element={<ChangePassword />} path="ChangePassword" />
          <Route element={<ForgotPassword />} path="ForgotPassword" />
          <Route element={<System />} path="System" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
