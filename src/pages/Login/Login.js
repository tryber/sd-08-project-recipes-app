import React from 'react';
import rockGlass from '../../images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginComponent from '../../components/Login/LoginComp';
import './login.css';

function Login() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <LoginComponent />
    </div>
  );
}

export default Login;
