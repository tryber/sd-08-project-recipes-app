import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

function Perfil() {
  const BOOLEAN_TRUE = true;
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || '{}');
  const history = useHistory();
  return (
    <>
      <Header title="Perfil" disableBtn={ BOOLEAN_TRUE } />
      <p data-testid="profile-email">
        Email:
        { user.email }
      </p>
      <Button
        label="Receitas Feitas"
        datatestid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      />
      <Button
        label="Receitas Favoritas"
        datatestid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      />
      <Button
        label="Sair"
        datatestid="profile-logout-btn"
        onClick={ () => localStorage.clear() || history.push('/') }
      />
      <Footer />
    </>
  );
}

export default Perfil;
