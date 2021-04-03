/// <reference types="cypress" />

const fetchMock = require('../mocks/fetch');

describe('70 - Implemente os elementos da tela de explorar bebidas ou comidas respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids corretos para a tela de explorar comidas', () => {
    cy.visit('http://localhost:3000/explorar/comidas');

    cy.get('[data-testid="explore-by-ingredient"]');
    cy.get('[data-testid="explore-by-area"]');
    cy.get('[data-testid="explore-surprise"]');
  });

  it('Tem os data-testids corretos para a tela de explorar bebidas', () => {
    cy.visit('http://localhost:3000/explorar/bebidas');

    cy.get('[data-testid="explore-by-ingredient"]');
    cy.get('[data-testid="explore-by-area"]').should('not.exist');
    cy.get('[data-testid="explore-surprise"]');
  });
});

describe('71 - Desenvolva 3 botões: um para explorar por ingrediente, um para explorar por local de origem e um para pegar uma receita aleatória', () => {
  it('Tem os botões "Por Ingredientes", "Por Local de Origem" e "Me Surpreenda!" para a tela de explorar comidas', () => {
    cy.visit('http://localhost:3000/explorar/comidas');

    cy.get('[data-testid="explore-by-ingredient"]').contains('Por Ingredientes');
    cy.get('[data-testid="explore-by-area"]').contains('Por Local de Origem');
    cy.get('[data-testid="explore-surprise"]').contains('Me Surpreenda!');
  });

  it('Tem apenas os botões "Por Ingredientes" e "Me Surpreenda!" para a tela de explorar bebidas', () => {
    cy.visit('http://localhost:3000/explorar/bebidas');

    cy.get('[data-testid="explore-by-ingredient"]').contains('Por Ingredientes');
    cy.get('[data-testid="explore-by-area"]').should('not.exist');
    cy.get('[data-testid="explore-surprise"]').contains('Me Surpreenda!');
  });
});

describe('72 - Redirecione a pessoa usuária ao clicar em "Por Ingredientes", a rota deve mudar para a tela de explorar por ingredientes', () => {
  it('Ao clicar no botão "Por Ingredientes" da tela de explorar comidas a rota muda para a página de explorar comidas por ingrediente', () => {
    cy.visit('http://localhost:3000/explorar/comidas');

    cy.get('[data-testid="explore-by-ingredient"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/explorar/comidas/ingredientes'));
  });

  it('Ao clicar no botão "Explorar Bebidas" da tela de explorar bebidas a rota muda para a página de explorar bebidas por ingrediente', () => {
    cy.visit('http://localhost:3000/explorar/bebidas');

    cy.get('[data-testid="explore-by-ingredient"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/explorar/bebidas/ingredientes'));
  });
});

describe('73 - Redirecione a pessoa usuária ao clicar em "Por Local de Origem", a rota deve mudar para tela de explorar por local de origem', () => {
  it('A rota deve mudar para tela de explorar por local de origem', () => {
    cy.visit('http://localhost:3000/explorar/comidas');

    cy.get('[data-testid="explore-by-area"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/explorar/comidas/area'));
  });
});

describe('74 - Redirecione a pessoa usuária ao clicar em "Me Surpreenda!", a rota deve mudar para a tela de detalhes de uma receita, que deve ser escolhida de forma aleatória através da API', () => {
  it('Ao clicar no botão "Por Ingredientes" da tela de explorar comidas a rota muda para a página de detalhes de uma comida aleatória', () => {
    cy.visit('http://localhost:3000/explorar/comidas', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="explore-surprise"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/comidas/52771'));
  });

  it('Ao clicar no botão "Explorar Bebidas" da tela de explorar bebidas a rota muda para a página de detalhes de uma bebida aleatória', () => {
    cy.visit('http://localhost:3000/explorar/bebidas', {
      onBeforeLoad(win) {
        win.fetch = fetchMock;
      },
    });

    cy.get('[data-testid="explore-surprise"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/bebidas/178319'));
  });
});
