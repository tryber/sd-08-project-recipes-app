import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const FoodsAndDrinks = ({ title, visible }) => (
  <>
    <Header title={ title } visible={ visible } />
    <Footer />
  </>
);
FoodsAndDrinks.defaultProps = {
  visible: true,
};
FoodsAndDrinks.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
};
export default FoodsAndDrinks;
