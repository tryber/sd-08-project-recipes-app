import { useLocation } from 'react-router-dom';

function Title() {
  const { pathname } = useLocation();

  switch (pathname) {
  case '/comidas': return 'Comidas';
  case '/bebidas': return 'Bebidas';
  case '/explorar': return 'Explorar';
  case '/explorar/comidas': return 'Explorar Comidas';
  case '/explorar/bebidas': return 'Explorar Bebidas';
  case '/explorar/comidas/ingredientes': return 'Explorar Ingredientes';
  case '/explorar/bebidas/ingredientes': return 'Explorar Ingredientes';
  case '/explorar/comidas/area': return 'Explorar Origem';
  case '/perfil': return 'Perfil';
  case '/receitas-feitas': return 'Receitas Feitas';
  case '/receitas-favoritas': return 'Receitas Favoritas';
  default: return false;
  }
}

export default Title;
