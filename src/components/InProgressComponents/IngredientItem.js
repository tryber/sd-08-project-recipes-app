import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function IngredientItem({
  boxChecked,
  className,
  index,
  ingredient,
  handleClick,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const checkClick = (evt) => {
    setIsChecked(!isChecked);
    if (evt.target.checked === true) {
      evt.target.parentElement.classList.add('ingredient-item');
    } else {
      evt.target.parentElement.classList.remove('ingredient-item');
    }
    handleClick();
  };

  useEffect(() => {
    if (boxChecked) return setIsChecked(boxChecked);
  }, []);

  return (
    <li>
      <label
        htmlFor="ingredient"
        className={ className }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          type="checkbox"
          name="ingredient"
          className="checkbox-ingredient"
          onClick={ checkClick }
          checked={ isChecked }
        />
        {ingredient}
      </label>
    </li>
  );
}

IngredientItem.propTypes = ({
  boxChecked: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
});
