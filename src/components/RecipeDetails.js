import React, { useContext } from 'react';
import Context from '../context/Context';
import Recommended from './Recommended';
import Ingredients from './Ingredients';
import '../styles/RecipeDetails.css';
import DetailsHeader from './DetailsHeader';

function RecipeDetails({ recipeType, page }) {
  const {
    isFetching,
    recipeDetails,
  } = useContext(Context);

  function renderDetails() {
    const recipe = Object.values(recipeDetails[0])[0][0];

    return (
      <section
        key={ recipe[`id${recipeType}`] }
        className="container-recipe-details container-fluid"
      >
        <DetailsHeader recipe={ recipe } recipeType={ recipeType } />
        <Ingredients page={ page } id={ recipe[`id${recipeType}`] } />
        { recipeType === 'Meal'
          ? (
            <div>
              <h5>Video</h5>
              <iframe
                title="Youtube video"
                data-testid="video"
                src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
                width="330"
              >
                <track kind="captions" />
              </iframe>
            </div>
          )
          : null }
        <div>
          <Recommended recipeType={ recipeType } />
        </div>
      </section>
    );
  }

  return (
    recipeDetails.length && (isFetching
      ? <p>Loading...</p>
      : renderDetails())
  );
}

export default RecipeDetails;
