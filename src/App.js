import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './pages/Login/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Expĺorar from './pages/Explorar';
import ComidasIngredientes from './pages/ComidasIngredientes';
import BebidasIngredientes from './pages/BebidasIngredientes';
import ExplorarPorArea from './pages/ExplorarPorArea';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarBebidasIngredientes from './pages/ExplorarBebidasIngredientes';
import ExplorarComidasIngredientes from './pages/ExplorarComidasIngredientes';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import { fetchCategories as fetchCategoriesAction }
  from './store/actions/categories.actions';
import { fetchMeals as fetchMealsAction }
  from './store/actions/meals.action';
import { fetchDrinks as fetchDrinksAction } from './store/actions/drinks.actions';
import NotFound from './pages/NotFound';
// import ReceitasBebidasEmProgresso from './pages/ReceitasBebidasEmProgresso';
import ReceitasEmProgresso from './pages/ReceitasEmProgresso';
import GenericoComidas from './components/GenericoComidas';
import GenericoBebidas from './components/GenericoBebidas';
// import rockGlass from './images/rockGlass.svg';

class App extends React.Component {
  componentDidMount() {
    const { fetchCategories, fetchMeals, fetchDrinks } = this.props;
    fetchCategories();
    fetchMeals();
    fetchDrinks();
  }

  render() {
    // const { rota } = this.props;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comidas } />
            <Route exact path="/bebidas" component={ Bebidas } />
            <Route exact path="/explorar" component={ Expĺorar } />
            <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
            <Route exact path="/comidas/ingredientes" component={ ComidasIngredientes } />
            <Route exact path="/bebidas/ingredientes" component={ BebidasIngredientes } />
            <Route exact path="/explorar/comidas/area" component={ ExplorarPorArea } />
            <Route exact path="/explorar/bebidas/area" component={ NotFound } />
            <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
            {/* <Route component={ Expĺorar } /> */}
            <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExplorarBebidasIngredientes }
            />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExplorarComidasIngredientes }
            />
            <Route exact path="/perfil" component={ Perfil } />
            <Route
              path="/comidas/:id/in-progress"
              component={ ReceitasEmProgresso }
            />
            <Route
              path="/bebidas/:id/in-progress"
              component={ ReceitasEmProgresso }
            />
            <Route path="/comidas/:id" component={ GenericoComidas } />
            <Route path="/bebidas/:id" component={ GenericoBebidas } />
            <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
            {/* <Route exact path={ rota } component={ Generico } /> */}
            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

// App.propTypes = {
//   rota: PropTypes.string.isRequired,
// };
const mapStateToProps = (state) => ({
  rota: state.rota,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategoriesAction()),
  fetchMeals: () => dispatch(fetchMealsAction()),
  fetchDrinks: () => dispatch(fetchDrinksAction()),
});

App.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  fetchDrinks: PropTypes.func.isRequired,
  fetchMeals: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default connect(mapStateToProps)(App);
