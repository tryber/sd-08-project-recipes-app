import React, { useState } from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import FavoriteCard from './Details/FavoriteCard';
import Header from './Header';

function ReceitasFavoritas() {
  const storedFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [favorites, setFavorites] = useState(storedFavRecipes);
  const [filter, setFilter] = useState('all');

  return (
    <>
      <Header title="Receitas Favoritas" searchType="none" />
      <Container>
        <Row style={ { justifyContent: 'space-around' } }>
          <Button
            variant="secondary"
            style={ { margin: '10px 0px', borderRadius: '5px' } }
            onClick={ () => setFilter('all') }
            data-testid="filter-by-all-btn"
          >
            All
          </Button>
          <Button
            variant="secondary"
            style={ { margin: '10px 0px', borderRadius: '5px' } }
            onClick={ () => setFilter('comida') }
            data-testid="filter-by-food-btn"
          >
            Food
          </Button>
          <Button
            variant="secondary"
            style={ { margin: '10px 0px', borderRadius: '5px' } }
            onClick={ () => setFilter('bebida') }
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </Button>
        </Row>
      </Container>
      <Container fluid style={ { marginBottom: '80px' } }>
        <Row style={ { justifyContent: 'space-around' } }>
          <FavoriteCard
            favorites={ favorites }
            setFavorites={ setFavorites }
            filter={ filter }
          />
        </Row>
      </Container>
    </>
  );
}

export default ReceitasFavoritas;
