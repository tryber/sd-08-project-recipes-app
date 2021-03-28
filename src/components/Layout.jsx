import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

function Layout({ children, ...rest }) {
  return (
    <main>
      <Header { ...rest } />
      {children}
      <Footer />
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
