import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Components.css';

export default class Card extends Component {
  render() {
    const { value, index, infos } = this.props;

    return (
      <section className="card-item" data-testid={ `${index}-recipe-card` }>
        <Link to={ `${infos.linkRedirect}${value[infos.id]}` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ value[infos.thumb] }
            alt={ value[infos.name] }
          />
          <h5 data-testid={ `${index}-card-name` }>{value[infos.name]}</h5>

        </Link>
      </section>
    );
  }
}

Card.propTypes = {
  value: PropTypes.objectOf(PropTypes.string),
  index: PropTypes.number,
  infos: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    thumb: PropTypes.string,
    linkRedirect: PropTypes.string,
  }),
};

Card.defaultProps = {
  value: {},
  index: 0,
  infos: {
    id: '',
    name: '',
    thumb: '',
    linkRedirect: '',
  },
};
