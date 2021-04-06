import React from 'react';
import { Grid } from '@material-ui/core';
import SmallHolder from '../components/SmallHolder';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ButtonLink from '../components/ButtonLink';
import { getUserEmail } from '../services/localStorage';

const Profile = () => {
  const user = getUserEmail();

  return (
    <div>
      <Header
        name="Perfil"
        foodClass="Profile"
        Show={ false }
      />
      <SmallHolder
        name={ user }
        className="main"
      />

      <Grid className="Button-explorer">
        <ButtonLink
          LinkT="/receitas-feitas"
          name="Receitas Feitas"
          className="SizeUp"
          size="large"
          variant="contained"
          color="inherit"
          href="#contained-buttons"
          type="button"
          datatest="profile-done-btn"
        />

        <ButtonLink
          LinkT="/receitas-favoritas"
          name="Receitas Favoritas"
          className="SizeUp"
          size="large"
          variant="contained"
          color="inherit"
          href="#contained-buttons"
          type="button"
          datatest="profile-favorite-btn"
        />
      </Grid>
      <Grid className="Button-Logout">
        <ButtonLink
          LinkT="/"
          className="SizeDown"
          name="Sair"
          size="small"
          variant="contained"
          color="secondary"
          href="#contained-buttons"
          type="button"
          datatest="profile-logout-btn"
          func={ () => localStorage.clear() }
        />
      </Grid>
      <Footer
        foodClass="Profile-footer"
      />
    </div>
  );
};

export default Profile;
