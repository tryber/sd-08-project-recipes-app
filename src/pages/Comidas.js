import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import HeaderLocation from '../components/Header';
import RecipeCard from '../components/RecipeCard';

const MAX_CATEGORIES = 5;
const MAX_CARDS = 12;

class Comidas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: [],
      categoryName: '',
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(category) {
    const { meals: { meals, Beef, Breakfast, Chicken, Dessert, Goat } } = this.props;
    const { categoryName } = this.state;
    if (category !== categoryName && category !== 'All') {
      this.setState({ categoryName: category });
      switch (category) {
      case 'Beef':
        this.setState({ selectedCategory: Beef });
        break;
      case 'Breakfast':
        this.setState({ selectedCategory: Breakfast });
        break;
      case 'Chicken':
        this.setState({ selectedCategory: Chicken });
        break;
      case 'Dessert':
        this.setState({ selectedCategory: Dessert });
        break;
      case 'Goat':
        this.setState({ selectedCategory: Goat });
        break;
      default:
        this.setState({ selectedCategory: meals });
        break;
      }
    } else {
      this.setState({ categoryName: '', selectedCategory: meals });
    }
  }

  render() {
    const { categories: { recipesCategories }, meals: { meals } } = this.props;
    const { selectedCategory } = this.state;
    if (selectedCategory.length === 0) {
      return (
        <div>
          <HeaderLocation />
          <button
            type="button"
            onClick={ (event) => this.handleClick(event.target.name) }
            name="All"
            data-testid="All-category-filter"
          >
            All
          </button>
          {
            recipesCategories.map((category, index) => {
              if (index < MAX_CATEGORIES) {
                return (
                  <button
                    key={ index }
                    type="button"
                    onClick={ () => this.handleClick(category.strCategory) }
                    data-testid={ `${category.strCategory}-category-filter` }
                  >
                    {category.strCategory}
                  </button>
                );
              }
              return null;
            })
          }
          {

            meals.map((meal, index) => {
              if (index < MAX_CARDS) {
                return (
                  <Link
                    key={ index }
                    to={ `/comidas/${meal.idMeal}` }
                  >
                    <RecipeCard
                      idRecipeCard={ `${index}-recipe-card` }
                      idImg={ `${index}-card-img` }
                      srcImg={ meal.strMealThumb }
                      idCardName={ `${index}-card-name` }
                      mealName={ meal.strMeal }
                    />
                  </Link>
                );
              }
              return null;
            })
          }
          <Footer />
        </div>
      );
    }

    return (
      <div>
        <HeaderLocation />
        <button
          type="button"
          onClick={ (event) => this.handleClick(event.target.name) }
          name="All"
          data-testid="All-category-filter"
        >
          All
        </button>
        {
          recipesCategories.map((category, index) => {
            if (index < MAX_CATEGORIES) {
              return (
                <button
                  type="button"
                  onClick={ () => this.handleClick(category.strCategory) }
                  data-testid={ `${category.strCategory}-category-filter` }
                >
                  {category.strCategory}
                </button>
              );
            }
            return null;
          })
        }

        {

          selectedCategory.map((meal, index) => {
            if (index < MAX_CARDS) {
              console.log(meal);
              return (
                <Link
                  to={ `/comidas/${meal.idMeal}` }
                >
                  <RecipeCard
                    idRecipeCard={ `${index}-recipe-card` }
                    idImg={ `${index}-card-img` }
                    srcImg={ meal.strMealThumb }
                    idCardName={ `${index}-card-name` }
                    mealName={ meal.strMeal }
                  />
                </Link>
              );
            }
            return null;
          })
        }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  meals: state.meals,
});

Comidas.propTypes = {
  meals: PropTypes.objectOf(Object).isRequired,
  categories: PropTypes.objectOf(Object).isRequired,
};

export default connect(mapStateToProps)(Comidas);
