import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer, Header } from '../../components';
// import { _ } from '../../store/actions'
import '../../styles/pages/Container.css';

class Explore extends Component {
  render() {
    return (
      <div>
        <Header title="Explorar" />
        <div className="container">

          <Link to="/explorar/comidas">
            <button
              type="button"
              data-testid="explore-food"
            >
              Explorar Comidas
            </button>
          </Link>

          <Link to="/explorar/bebidas">
            <button
              type="button"
              data-testid="explore-drinks"
            >
              Explorar Bebidas
            </button>
          </Link>
        </div>
        <Footer />

      </div>
    );
  }
}

// Profile.propTypes = {
//   _: PropTypes._.isRequired,
// };

// const mapDispatchToProps = (dispatch) => ({
//   _: (_) => {
//     dispatch(_(_));
//   },
// });

export default connect(null, null)(Explore);
