import React, {  useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './cardRecipe.css';
import Context from '../../contextApi/Context';

const CardRecipe = ({
  id,
  type,
  index,
  image,
  alcoholicOrNot,
  area,
  category,
  name,
  doneDate,
  tags,
  favorite = false,
}) => {
const {setFavoriteRecipes} =useContext(Context)
  const [saveClipBoard, setSaveClipBoard] = useState(false);
  const savetoClipboard = (id, type) => {
    window.navigator.clipboard.writeText(
      `http://localhost:3000/${type}s/${id}`,
    );
    setSaveClipBoard(true);
  };
 
  const removeFav = ()=>{
    const idDoObj = id
    if(localStorage.getItem('favoriteRecipes')){
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'))
      const filterFav = favorites.filter(ele=>ele.id !==idDoObj )
      localStorage.setItem('favoriteRecipes',JSON.stringify(filterFav))
      setFavoriteRecipes(filterFav)
     }
    }
   


  return (
    <div className="card-recipe">
      <div className="left">
        <img
          className="card-recipe-image"
          src={image}
          alt=""
          data-testid={`${index}-horizontal-image`}
        />
      </div>
      <div className="right">
        {saveClipBoard && 'Link copiado!'}
        <span
          className="card-category"
          data-testid={`${index}-horizontal-top-text`}
        >
          {type === 'comida' ? area : alcoholicOrNot} - {category}
        </span>
        <span className="card-name" data-testid={`${index}-horizontal-name`}>
          {name}
        </span>
        <span
          className="card-done-date"
          data-testid={`${index}-horizontal-done-date`}
        >
          Feita em: {doneDate}
        </span>

        <div className="card-tag">
          {tags !== null &&
            tags.length > 0 &&
            tags.slice(0, 2).map((tag, key) => (
              <span
                className="badge badge-pill badge-success"
                key={key}
                data-testid={`${index}-${tag}-horizontal-tag`}
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
      <button
        type="button"
        className="card-icon-share"
        src={ShareIcon}
        onClick={() => savetoClipboard(id, type)}
        data-testid={`${index}-horizontal-share-btn`}
      >
        <img src={ShareIcon} />
      
        
      </button>
      {favorite && (
        <button className="btn-favorite" type="button" onClick = {()=>removeFav()}>
          <img
            src={blackHeartIcon}
            alt="Profile icon"
            data-testid={`${index}-horizontal-favorite-btn`}
          />
        </button>
      )}
    </div>
  );
};

CardRecipe.propTypes = {
  index: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf.isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default CardRecipe;
