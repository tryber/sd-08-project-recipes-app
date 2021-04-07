import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from './App';

describe('1. Teste o componente <App.js />', () => {  
  it('mostra a tela de login quando a rota é `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Descubra as melhores receitas do mundo')).toBeInTheDocument();
  });
});
