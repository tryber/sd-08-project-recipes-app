import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const PAGINA_TESTE_COMIDA = '/comidas/52771/in-progress';

describe('Testa Receitas em Progresso', () => {
  describe(`47 - Verifica se os atributos data-testid estão presentes
  na tela com suas respectivas quantidades`, () => {
    it('A foto deve possuir o atributo data-testid="recipe-photo"', () => {
      renderWithRouter(
        <App />,
        [PAGINA_TESTE_COMIDA],
      );

      const receitaFoto = screen.getByTestId('recipe-photo');
      expect(receitaFoto).toBeInTheDocument();
    });

    it('O título deve possuir o atributo data-testid="recipe-title"', () => {
      renderWithRouter(
        <App />,
        [PAGINA_TESTE_COMIDA],
      );

      const receitaTitulo = screen.getByTestId('recipe-title');
      expect(receitaTitulo).toBeInTheDocument();
    });

    it('O botão de compartilhar deve possuir o atributo data-testid="share-btn"', () => {
      renderWithRouter(
        <App />,
        [PAGINA_TESTE_COMIDA],
      );

      const receitaBotaoCompartilhar = screen.getByTestId('share-btn');
      expect(receitaBotaoCompartilhar).toBeInTheDocument();

      userEvent.click(receitaBotaoCompartilhar);
    });

    it('O botão de favoritar deve possuir o atributo data-testid="favorite-btn"', () => {
      renderWithRouter(
        <App />,
        [PAGINA_TESTE_COMIDA],
      );

      const receitaBotaoFavoritar = screen.getByTestId('favorite-btn');
      expect(receitaBotaoFavoritar).toBeInTheDocument();

      userEvent.click(receitaBotaoFavoritar);
    });

    it(`O texto da categoria deve possuir o atributo
    data-testid="recipe-category"`, () => {
      renderWithRouter(
        <App />,
        [PAGINA_TESTE_COMIDA],
      );

      const receitaTextoCategoria = screen.getByTestId('recipe-category');
      expect(receitaTextoCategoria).toBeInTheDocument();
    });

    it(`Os ingredientes devem possuir o atributo data-testid=$ {index}-ingredient-step,
    a verificação será feita pelo length do atributo`, async () => {
      renderWithRouter(
        <App />,
        [PAGINA_TESTE_COMIDA],
      );

      const receitaListaIngredientes = await screen.findAllByRole('listitem');
      expect(receitaListaIngredientes[0]).toBeInTheDocument();
    });

    it(`O elemento de instruções deve possuir
    o atributo data-testid="instructions"`, () => {
      renderWithRouter(
        <App />,
        [PAGINA_TESTE_COMIDA],
      );

      const receitaTextoIntrucoes = screen.getByTestId('instructions');
      expect(receitaTextoIntrucoes).toBeInTheDocument();
    });

    it(`O botão para finalizar a receita deve possuir
    o atributo data-testid="finish-recipe-btn"`, async () => {
      const { history } = renderWithRouter(
        <App />,
        [PAGINA_TESTE_COMIDA],
      );
      const receitaBotaoFinalizar = screen.getByTestId('finish-recipe-btn');
      expect(receitaBotaoFinalizar).toBeInTheDocument();
      expect(receitaBotaoFinalizar.disabled).toBe(true);

      const checksIngredientes = await screen.findAllByRole('checkbox');
      checksIngredientes.map((check) => userEvent.click(check));

      expect(receitaBotaoFinalizar.disabled).toBe(false);
      userEvent.click(receitaBotaoFinalizar);
      expect(history.location.pathname).toBe('/receitas-feitas');
    });
  });
});
