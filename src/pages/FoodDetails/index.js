import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';
import Loading from '../../components/Loading';
import HeaderDetails from '../../components/HeaderDetails';

function FoodDetails() {
  const [idMeals, setIdMeals] = useState({ meals: [] });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setIdMeals(data));
    setLoading(false);
  }, [id]);

  return (
    <Container>

      {loading ? <Loading /> : idMeals.meals.map((item) => (
        <div key={ item.idMeal }>
          <HeaderDetails
            item={ item }
          />
          { item.strIngredient1}
        </div>
      ))}

    </Container>
  );
}

export default FoodDetails;

// const add = {
//   a: {value:1},
//   b: {value:2},
//   c: {value:3}
// }

// const total = Object.values(add).reduce((t, {value}) => t + value, 0)

// console.log(total) // 6

// const array = {
//   "strIngredient1": "Toor dal",
// "strIngredient2": "Water",
// "strIngredient3": "Salt",
// "strIngredient4": "Turmeric",
// "strIngredient5": "Ghee",
// "strIngredient6": "Chopped tomatoes",
// "strIngredient7": "Cumin seeds",
// "strIngredient8": "Mustard Seeds",
// "strIngredient9": "Bay Leaf",
// "strIngredient10": "Green Chili",
// "strIngredient11": "Ginger",
// "strIngredient12": "Cilantro",
// "strIngredient13": "Red Pepper",
// "strIngredient14": "Salt",
// "strIngredient15": "Sugar",
// "strIngredient16": "Garam Masala",
// }
