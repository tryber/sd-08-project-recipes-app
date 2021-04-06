import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcons from '../images/profileIcon.svg';
import './MainHeader.css';
import SearchButton from './SearchButton';

const Header = ({ name, foodClass, Show }) => {
  const history = useHistory();
  return (
    <AppBar position="static">
      <Toolbar className={ foodClass }>
        <Button
          type="button"
          onClick={ () => history.push('/perfil') }
          data-testid="profile-top-btn"
          src={ profileIcons }
        >
          <img src={ profileIcons } alt="profileIcon" />
        </Button>
        <Typography variant="h6" data-testid="page-title">{name}</Typography>

        {
          (Show ? <SearchButton />
            : <Button />)
        }
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  foodClass: PropTypes.string.isRequired,
  Show: PropTypes.bool.isRequired,
};

export default Header;
