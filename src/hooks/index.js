/* eslint-disable no-alert */
import { useEffect } from 'react';

const useVerifyNoOrSingleDish = (data, dishType, history) => {
  useEffect(() => {
    if (data && data.length === 1) {
      const dishPath = dishType === 'meals' ? 'comidas' : 'bebidas';
      const id = dishType === 'meals' ? data[0].idMeal
        : data[0].idDrink;

      history.push(`/${dishPath}/${id}`);
    }
    if (data === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }, [data, history, dishType]);
};

export default useVerifyNoOrSingleDish;
