import React from 'react';
import renderWithStoreAndRouter from '../helpers/renderWithStoreAndRouter';
import Header from '../components/Header';

const testIds = {
  profileTopBtn: 'profile-top-btn',
  pageTitle: 'page-title',
  searchTopBtn: 'search-top-btn',
};

describe('Header', () => {
  test('Existe um botão de perfil', () => {
    const { getByTestId } = renderWithStoreAndRouter(<Header />);
    expect(getByTestId(testIds.profileTopBtn)).toBeInTheDocument();
  });

  test('Existe um título na página', () => {
    const { getByTestId } = renderWithStoreAndRouter(<Header />);
    expect(getByTestId(testIds.pageTitle)).toBeInTheDocument();
  });

  test('Existe um botão de busca', () => {
    const { getByTestId } = renderWithStoreAndRouter(<Header showSearchButton />);
    expect(getByTestId(testIds.searchTopBtn)).toBeInTheDocument();
  });
});
