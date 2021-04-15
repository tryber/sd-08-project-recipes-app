import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Container, Row } from 'react-bootstrap';
import Footer from '../components/Footer';
import HeaderLocation from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const MAX_CATEGORIES = 5;
const MAX_CARDS = 12;

class Bebidas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: null,
      categoryName: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(category) {
    const { drinks:
      { drinks, ordinaryDrink,
        cocktail, milkFloatShake, otherUnknown, cocoa } } = this.props;
    const { categoryName } = this.state;
    if (category !== categoryName && category !== 'All') {
      this.setState({ categoryName: category });
      switch (category) {
      case 'Ordinary Drink':
        this.setState({ selectedCategory: ordinaryDrink });
        break;
      case 'Cocktail':
        this.setState({ selectedCategory: cocktail });
        break;
      case 'Milk / Float / Shake':
        this.setState({ selectedCategory: milkFloatShake });
        break;
      case 'Other/Unknown':
        this.setState({ selectedCategory: otherUnknown });
        break;
      case 'Cocoa':
        this.setState({ selectedCategory: cocoa });
        break;
      default:
        this.setState({ selectedCategory: drinks });
        break;
      }
    } else {
      this.setState({ categoryName: '', selectedCategory: drinks });
    }
  }

  render() {
    const { categories: { drinksCategories }, drinks: { drinks } } = this.props;
    const { selectedCategory } = this.state;
    if (!selectedCategory) {
      return (
        <div>
          <Container>
            <HeaderLocation />
            <div className="d-flex justify-content-around flex-wrap">
              <Button
                size="sm"
                className="filter-button orange"
                type="submit"
                onClick={ (event) => this.handleClick(event.target.name) }
                name="All"
                data-testid="All-category-filter"
              >
                All
              </Button>
              {
                drinksCategories.map((category, index) => {
                  if (index < MAX_CATEGORIES) {
                    return (
                      <Button
                        size="sm"
                        className="filter-button orange"
                        type="submit"
                        onClick={ () => this.handleClick(category.strCategory) }
                        data-testid={ `${category.strCategory}-category-filter` }
                      >
                        {category.strCategory}
                      </Button>
                    );
                  }
                  return null;
                })
              }
            </div>
            <Row lg="4" md="3">
              {

                drinks.map((drink, index) => {
                  if (index < MAX_CARDS) {
                    return (
                      <Link
                        to={ `/bebidas/${drink.idDrink}` }
                        className="recipe-link"
                      >
                        <RecipeCard
                          idRecipeCard={ `${index}-recipe-card` }
                          idImg={ `${index}-card-img` }
                          srcImg={ drink.strDrinkThumb }
                          idCardName={ `${index}-card-name` }
                          mealName={ drink.strDrink }
                        />
                      </Link>
                    );
                  }
                  return null;
                })
              }
            </Row>
          </Container>
          <br />
          <br />
          <Footer className="footer orange" />
        </div>
      );
    }

    return (
      <div>
        <Container>
          <HeaderLocation />
          <div className="d-flex justify-content-around flex-wrap">
            <Button
              size="sm"
              className="filter-button orange"
              type="button"
              onClick={ (event) => this.handleClick(event.target.name) }
              name="All"
              data-testid="All-category-filter"
            >
              All
            </Button>
            {
              drinksCategories.map((category, index) => {
                if (index < MAX_CATEGORIES) {
                  return (
                    <Button
                      size="sm"
                      className="filter-button orange"
                      type="button"
                      onClick={ () => this.handleClick(category.strCategory) }
                      data-testid={ `${category.strCategory}-category-filter` }
                    >
                      {category.strCategory}
                    </Button>
                  );
                }
                return null;
              })
            }
          </div>
          {

            selectedCategory.map((drink, index) => {
              if (index < MAX_CARDS) {
                return (
                  <Link
                    to={ `/bebidas/${drink.idDrink}` }
                    className="recipe-link"
                  >
                    <RecipeCard
                      idRecipeCard={ `${index}-recipe-card` }
                      idImg={ `${index}-card-img` }
                      srcImg={ drink.strDrinkThumb }
                      idCardName={ `${index}-card-name` }
                      mealName={ drink.strDrink }
                    />
                  </Link>
                );
              }
              return null;
            })
          }
        </Container>
        <br />
        <br />
        <Footer className="footer orange" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  drinks: state.drinks,
  selectedCategory: state.selectedCategory,
});

Bebidas.propTypes = {
  drinks: PropTypes.arrayOf(Array).isRequired,
  categories: PropTypes.arrayOf(Array).isRequired,
};

export default connect(mapStateToProps)(Bebidas);
