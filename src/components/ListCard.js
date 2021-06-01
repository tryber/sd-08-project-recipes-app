import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from './Card';
import { fetchIngredient as fetchIngredientAction } from '../action';

class ListCard extends Component {
  componentDidMount() {
    const { searchIngredient,
      params: { defaultSearch } } = this.props;
    const url = defaultSearch;
    searchIngredient(url);
  }

  render() {
    const { result, infos, filterButton } = this.props;
    const { history } = infos;
    return (
      <section>
        <ul className="card-list">
          {result && result.length && result.map((item, index) => {
            const TOTAL_ITEMS = 12;
            if (index >= TOTAL_ITEMS) {
              return null;
            }
            if (result.length === 1 && !filterButton) {
              const redirect = `${infos.linkRedirect}${item[infos.id]}`;
              return history(redirect);
            }
            return (<Card
              infos={ infos }
              key={ item[infos.name] ? item[infos.name] : Math.random() * 100 }
              value={ item }
              index={ index }
            />);
          })}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (({ search: { result, isFetching, filterButton } }) => ({
  result: result.meals || result.drinks,
  isFetching,
  filterButton,
}));

const mapDispatchToProps = (dispatch) => ({
  searchIngredient: (url) => dispatch(fetchIngredientAction(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListCard);

ListCard.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
  infos: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    thumb: PropTypes.string,
    linkRedirect: PropTypes.string,
    history: PropTypes.func.isRequired,
  }),
  params: PropTypes.shape({
    url: PropTypes.shape({
      byName: PropTypes.string.isRequired,
    }).isRequired,
    defaultSearch: PropTypes.string.isRequired,
  }).isRequired,
  searchIngredient: PropTypes.func.isRequired,
  filterButton: PropTypes.bool,
};

ListCard.defaultProps = {
  result: [],
  infos: {
    id: '',
    name: '',
    thumb: '',
    linkRedirect: '',
  },
  filterButton: false,
};
