import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Loading.css';

class Loading extends Component {
  render() {
    const { state, children } = this.props;
    if (!state) {
      return children;
    }
    return (
      <div className="containerLoading">
        <span>Homens Trabalhando Muito.......</span>
      </div>
    );
  }
}

Loading.propTypes = {
  state: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Loading;
