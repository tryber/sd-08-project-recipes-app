// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Login from './pages/Login';

// describe('Testando  o link /', () => {
//   it('A página deve conter os inputs para o Login', () => {
//     render(<Login />);
//     const aboutText = screen.getByText(/This application simulates a Pokédex/i);
//     expect(aboutText).toBeInTheDocument();
//   });

// it('A página deve conter um heading h2 com o texto About Pokédex', () => {
//   render(<About />);
//   const email = screen.getByText(/e-mail/i);
//   expect(email).toBeInTheDocument();
//   expect(email.tagName).toBe('input');
// });

// it('A página deve conter dois parágrafos com texto sobre a Pokédex.', () => {
//   render(<About />);
//   const p1 = screen.getByText(/This application simulates a Pokédex, a digital/i);
//   const p2 = screen.getByText(/One can filter Pokémons by type, and see more details/i);
//   expect(p1).toBeInTheDocument();
//   expect(p1.tagName).toBe('P');
//   expect(p2).toBeInTheDocument();
//   expect(p2.tagName).toBe('P');
// });

// it('A página deve conter uma imagem específica, de uma Pokédex:', () => {
//   render(<About />);
//   const img = screen.getByRole('img');
//   expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
// });
// });
