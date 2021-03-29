import React, { createContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const DataHeaderContext = createContext();

function HeaderContext(props) {
  const location = useLocation();
  const zero = 0;
  const one = 1;
  const loc = location.pathname;
  const v = loc.includes('-') ? loc.replace('-', ' ') : loc;
  const d = v.includes('/') ? v.replace(/[/]/g, '') : v;
  const j = d.substring(zero, one).toLocaleUpperCase().concat(d.substring(one));
  const title = j === 'Explorarcomidasarea' ? 'Explorar Origem' : j;

  const { children } = props;
  return (
    <div>
      <DataHeaderContext.Provider
        value={ {
          title,
        } }
      >
        {children}
      </DataHeaderContext.Provider>
    </div>
  );
}

export default HeaderContext;
HeaderContext.propTypes = {
  children: PropTypes.node.isRequired,
};
