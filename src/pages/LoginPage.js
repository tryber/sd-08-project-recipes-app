import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/Login';
import '../CSS/LoginPage.css';

function LoginPage() {
  return (
    <div className="login-image main-container">
      <h1 className="login-title">Recipes App</h1>
      <Login />
    </div>
  );
}

export default LoginPage;
