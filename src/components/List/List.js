import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Cards from '../Card/Cards';
import { getAllRecipes, getRecipesByIngredient } from '../../services/FoodsDrinksRequests';
import Context from '../../contextApi/Context';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import getMeal from '../../services/requestMealForId';
import getDrink from '../../services/RequestDrinkForId';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import './list.css';

const List = ({ title, results, refCard }) => {
  const CARDSFORPAGE = 12;

  const { results: prevResults , setResults } = useContext(Context);
  const [activatedFilters, setActivatedFilters] = useState([]);
  const [manipulatedResult, setManipulatedResult] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [recipesByIngredient, setRecipesByIngredient] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (prevResults.length === 0) {
      getAllRecipes(title).then((response) => {
        setResults(response);
      });
    }
  }, [title]);

  const handleClick = (event) => {
    // console.log(event.target.innerText);
    getRecipesByIngredient(title, event.target.innerText).then((response) => {
      setResults(response);
    });
  };

  const handleClickToFilter = (event) => {
    if (activatedFilters.includes(event.target.name)) {
      setActivatedFilters( activatedFilters.filter(element => element !== event.target.name))
    } else {
      setActivatedFilters([
        ...activatedFilters, event.target.name ])
    }
  }

  const getMealOrDrink = async (id) => {
    if (title === 'Explorar Ingredientes de Comidas') {
      const meal = await getMeal(id);
      // console.log(meal);
      return meal;
    } else {
      const drink = await getDrink(id);
      // console.log(drink);
      return drink;
    }
  };

  const handleClickToRecipes = () => {
    setResults(manipulatedResult)
    setRedirect(true)
  }

  useEffect( () => {
    if (activatedFilters.length === 1) {
      getRecipesByIngredient(title, activatedFilters[0]).then( (response) => {
        setRecipesByIngredient(response);
      });
    }
  }, [activatedFilters])

  useEffect(() => {
    if (activatedFilters.length !== 0) {
      (async () => {
        if (recipesByIngredient.length !== 0) {
          console.log(recipesByIngredient[0].idMeal)
          let manipulatedList = []
          for (let index = 0; index < recipesByIngredient.length; index += 1) {
            const teste = await getMealOrDrink(recipesByIngredient[index].idMeal);
            manipulatedList = [...manipulatedList, teste];
          }
          console.log(manipulatedList)

          // Tentativa usando HOF (Não deu certo)

          // const teste = await getMealOrDrink(recipesByIngredient[0].idMeal);
          // console.log(teste)
          // const manipulatedResults = await recipesByIngredient.map( async (recipe) => await getMealOrDrink(title === 'Explorar Ingredientes de Comidas' ? recipe.idMeal : recipe.idDrink))
          // console.log(manipulatedResults)

          activatedFilters.forEach((ingredient, index) => {
            if (index > 0) {
              manipulatedList = manipulatedList.filter((recipe) => {
                  const listValues = Object.values(recipe);
                  // console.log(recipe)
                  console.log(listValues)

                  const lowerList = listValues.map((value) => value && value.toLowerCase() );
                  console.log(lowerList);

                  // const existIngredient = lowerList.includes(ingredient.toLowerCase())

                  const existIngredient = lowerList.some((element) => element && element.includes(ingredient.toLowerCase()))
                  // console.log(existIngredient)
                  if (existIngredient) {
                    return recipe
                  }
              });
              console.log(manipulatedList)
            }
          });
          setManipulatedResult(manipulatedList)
          setLoad(false)
        }
      })();
    }
  }, [activatedFilters])

  useEffect(()=> {
    setLoad(true)
    if (activatedFilters.length < 2) {
      // setResults([])
      setManipulatedResult([])
      setRecipesByIngredient([])
    }
  }, [activatedFilters])

  const renderActivatedFilter = () => {
      return (
        <div className="filtered-container">
          {activatedFilters.map((filter) => (
            <span key={ filter } className="filtered-content" >
              <span >
                {filter}
                <Button
                className="btn remove-button w-20 remove-button"
                type="button"
                name={ filter }
                onClick={ handleClickToFilter }
                >
                  X
                </Button>
              </span>
            </span>
          ))}
        </div>);
  }

  // const buttonContent = () => {
  //   return (
      
  //   )
  // }

  if (results && refCard === 'ingredients') {
    return (
      <div>
        {renderActivatedFilter()}
        {redirect && <Redirect to={ title === 'Explorar Ingredientes de Comidas'
                  ? `/comidas`
                  : `/bebidas` } />}
      <Button
        className="btn btn-danger w-100 my-1"
        onClick={handleClickToRecipes}
        disabled={manipulatedResult.length > 0 && manipulatedResult.length !== recipesByIngredient.length ? false : true}
        >
          {activatedFilters.length < 2 ? "Escolha os ingredientes" : (load === true ?
        <Spinner animation="border" role="status" className='spinner'>
          <span className="sr-only">Loading...</span>
        </Spinner>:
        (manipulatedResult.length > 0 && manipulatedResult.length !== recipesByIngredient.length ? `${manipulatedResult.length} receitas encontradas` : `Combinação não encontrada`))}
      </Button>
      <div className="list-cards">
        {results.map((object, index) => {
          if (index < CARDSFORPAGE) {
            return (
              <>
                <Card className='card-container' >
                  <Link
                    id={
                      title === 'Explorar Ingredientes de Comidas'
                        ? object.strIngredient
                        : object.strIngredient1
                    }
                    onClick={handleClick}
                    to={
                      title === 'Explorar Ingredientes de Comidas'
                        ? `/comidas`
                        : `/bebidas`
                    }
                  >
                    <Cards
                      className="card-item"
                      key={
                        title === 'Explorar Ingredientes de Comidas'
                          ? object.strIngredient
                          : object.strIngredient1
                      }
                      object={object}
                      title={title}
                      index={index}
                      refCard={refCard}
                    />
                  </Link>
                  <Button
                  className="btn btn-danger w-20 card-button"
                  name={ title === 'Explorar Ingredientes de Comidas' ? object.strIngredient : object.strIngredient1 }
                  onClick={handleClickToFilter}
                  >
                    {activatedFilters.includes(title === 'Explorar Ingredientes de Comidas' ? object.strIngredient : object.strIngredient1) ? "-" : "+"}
                  </Button>
                </Card>
              </>
            );
          }
        })}
      </div>
      </div>
    );
  } else {
    return (
      <>
        {results.map((object, index) => {
          if (index < CARDSFORPAGE) {
            return (
              <Link
                to={
                  title === 'Comidas'
                    ? `/comidas/${object.idMeal}`
                    : `/bebidas/${object.idDrink}`
                }
              >
                <Cards
                  key={title === 'Comidas' ? object.idMeal : object.idDrink}
                  object={object}
                  title={title}
                  index={index}
                />
              </Link>
            );
          }
        })}
      </>
    );
  }
};
List.propTypes = {
  title: PropTypes.string.isRequired,
  results: PropTypes.arrayOf.isRequired,
};

export default List;
