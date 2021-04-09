import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import ExploreButton from './ExploreButton';
import profileIcon from '../images/profileIcon.svg';
import '../styles/Header.css';

function Header({ title, explore }) {
  const {
    setType,
  } = useContext(MyContext);
  let name;

  useEffect(() => {
    if (title === 'Comidas') {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      name = {
        palavra: 'Meal',
        item: 'meals',
      };
      setType(name);
    } else {
      name = {
        palavra: 'Drink',
        item: 'drinks',
      };
      setType(name);
    }
  }, []);

  return (
    <div className="headerContainer">
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h3 data-testid="page-title">{ title }</h3>
      {explore ? <ExploreButton title={ title } /> : null }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  explore: PropTypes.bool.isRequired,
};

export default Header;
