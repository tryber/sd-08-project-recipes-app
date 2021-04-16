import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
// import mockFetch from '../../cypress/mocks/fetch';
import renderWithRouter from './helpers/renderWithRouter';
// import FoodInProgressCard from '../components/FoodInProgressCard';
import ProfileButton from '../components/buttons/ProfileButton';

describe('ProfileButton.jsx component', () => {
  it('should render', () => {
    const { history } = renderWithRouter(<ProfileButton />, '/comidas');

    expect(history.location.pathname).toBe('/comidas');
    console.log(history.location.pathname);

    const profileTopBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileTopBtn);

    expect(history.location.pathname).toBe('/perfil');
  });
});
