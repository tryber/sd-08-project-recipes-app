import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../../context/RecipesContext';
import IngredientItem from './IngredientItem';

export default function IngredientsList({ listFromProps, id, type }) {
  const { setIsFinished } = useContext(RecipesContext);
  const [isClicked, setIsClicked] = useState(false);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [listFromStorage, setListFromStorage] = useState([]);
  const [checkboxList, setCheckboxList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [labels, setLabels] = useState([]);

  const handleClick = () => {
    setIsClicked(true);
  };

  const saveStorage = () => {
    const listToSave = [];
    labels.forEach((item) => {
      listToSave.push(
        { ingredient: item.textContent,
          checked: item.children[0].checked,
          className: item.className,
        },
      );
    });

    const newObjectToSave = {
      ...listFromStorage,
      [`${type}`]: { ...listFromStorage[`${type}`], [`${id}`]: [...listToSave] },
    };
    localStorage.setItem('InProgressRecipes', JSON.stringify(newObjectToSave));
  };

  useEffect(() => {
    const newCheckboxList = document.querySelectorAll('.checkbox-ingredient');
    const newCheckedList = document.querySelectorAll('.ingredient-item');
    const storageRescue = localStorage.getItem('InProgressRecipes');
    const retrievedObject = JSON.parse(storageRescue);
    const settings = async () => {
      if (storageRescue === null) {
        localStorage.setItem('InProgressRecipes', JSON
          .stringify({ cocktails: {}, meals: {} }));
        setListFromStorage({ cocktails: {}, meals: {} });
      } else {
        setListFromStorage(retrievedObject);
      }
    };
    setCheckboxList(newCheckboxList);
    setCheckedList(newCheckedList);
    settings();
  }, []);

  useEffect(() => {
    if (isClicked) {
      const newCheckboxList = document.querySelectorAll('.checkbox-ingredient');
      setCheckboxList(newCheckboxList);
    }
  }, [isClicked]);

  useEffect(() => {
    if (isClicked) {
      const newCheckedList = document.querySelectorAll('.ingredient-item');
      setCheckedList(newCheckedList);
    }
  }, [isClicked]);

  useEffect(() => {
    if (isClicked) {
      const newLabels = document.querySelectorAll('label');
      setLabels(newLabels);
    }
  }, [isClicked]);

  useEffect(() => {
    const verifyIngredients = async () => {
      if (ingredientsList.length) {
        const newLabels = document.querySelectorAll('label');
        setLabels(newLabels);
      }
    };
    verifyIngredients();
  }, [ingredientsList]);

  useEffect(() => {
    function getIngredientsList() {
      if (listFromStorage[`${type}`] !== null
      && listFromStorage[`${type}`] !== undefined) {
        const recipeInProgressList = (listFromStorage[`${type}`][id]);
        if (recipeInProgressList !== undefined) {
          setIngredientsList(recipeInProgressList);
        } else {
          setIngredientsList(listFromProps);
        }
      } else {
        setIngredientsList(listFromProps);
      }
    }
    getIngredientsList();
  }, [listFromProps, listFromStorage, type, id]);

  useEffect(() => {
    function validation() {
      if (isClicked) {
        saveStorage();

        if (checkboxList.length && checkboxList.length === checkedList.length) {
          setIsFinished(true);
        } else {
          setIsFinished(false);
        }
      }
      setIsClicked(false);
    }
    validation();
  });

  useEffect(() => {
    if (checkboxList.length && checkboxList.length === checkedList.length) {
      setIsFinished(true);
    } else {
      setIsFinished(false);
    }
  });

  return (
    <section>
      <h3>Ingredients</h3>
      <ul>
        {ingredientsList.map((item, index) => (
          <IngredientItem
            key={ index }
            index={ index }
            className={ item.className }
            handleClick={ handleClick }
            boxChecked={ item.checked }
            ingredient={ item.ingredient }
          />
        ))}
      </ul>
    </section>
  );
}

IngredientsList.propTypes = ({
  listFromProps: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
});
