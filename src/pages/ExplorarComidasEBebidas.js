import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { getComidasRandom, getBebidasRandom } from '../services/BuscaNasAPIs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContextRecipes from '../context/ContextRecipes';

const ExplorarComidasEBebidadas = () => {
  const { setHeaderInfo, setBarraBuscar } = useContext(ContextRecipes);
  const history = useHistory();
  const Type = history.location.pathname.includes('bebidas') ? 'bebidas' : 'comidas';
  const typeTitle = history.location.pathname.includes('bebidas') ? 'Bebidas' : 'Comidas';
  const [randomId, setRandomId] = useState('');

  useEffect(() => {
    async function getRandomId() {
      const Id = Type === 'bebidas' ? await getBebidasRandom() : await getComidasRandom();
      const ids = Type === 'bebidas' ? Id.drinks[0].idDrink : Id.meals[0].idMeal;
      setRandomId(ids);
    }
    getRandomId();
  }, [setRandomId, Type]);

  useEffect(() => {
    setHeaderInfo({ pageTitle: `Explorar ${typeTitle}`, showSearchIcon: false });
  }, [typeTitle, setHeaderInfo]);

  function handleClickIngredientsBtn() {
    setBarraBuscar({ input: '', radio: '' });
    return history.push(`${history.location.pathname}/ingredientes`);
  }

  function handleClickOriginBtn() {
    setBarraBuscar({ input: '', radio: '' });
    return history.push('/explorar/comidas/area');
  }

  return (
    <section className="w-100">
      <Header />
      <section className="w-100 bg-dark cardHeigth cardBody">
        <Button
          className="btn btn-primary mt-5"
          type="button"
          onClick={ () => handleClickIngredientsBtn() }
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </Button>
        {
          history.location.pathname.includes('comidas')
            ? (
              <Button
                className="btn btn-primary"
                type="button"
                onClick={ () => handleClickOriginBtn() }
                data-testid="explore-by-area"
              >
                Por Local de Origem
              </Button>
            )
            : ''
        }
        <Button
          className="btn btn-primary"
          type="button"
          onClick={ () => history.push(`/${Type}/${randomId}`) }
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </Button>
      </section>
      <Footer />
    </section>
  );
};

export default ExplorarComidasEBebidadas;
