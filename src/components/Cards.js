import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';

class Cards extends Component {
  render() {
    const { strThumb, str, index, route } = this.props;
    return (
      <Link
        to={ route }
      >
        <div data-testid={ `${index}-recipe-card` }>
          <h1 data-testid={ `${index}-card-name` }>{str}</h1>
          <img data-testid={ `${index}-card-img` } src={ strThumb } alt={ str } />
        </div>
      </Link>
    );
  }
}

Cards.propTypes = {
  strThumb: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
};

export default Cards;
