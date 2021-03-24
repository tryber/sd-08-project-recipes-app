import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function HOFCLink({ url, Component, ...rest }) {
  return (
    <Link to={ `/${url}` }>
      <Component { ...rest } />
    </Link>
  );
}

HOFCLink.propTypes = {
  url: PropTypes.string.isRequired,
  Component: PropTypes.element.isRequired,
  rest: PropTypes.node.isRequired,
};
