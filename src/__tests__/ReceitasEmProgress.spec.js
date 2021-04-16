// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import ReceitasEmProgress from '../pages/ReceitasEmProgress';
// import { useHistory } from 'react-router-dom';
// import { Router } from 'react-router-dom';
// import { createBrowserHistory } from 'history';
// // import userEvent from '@testing-library/user-event';

// describe('ReceitasEmProgress Page', () => {
// //   beforeEach(() => {
// //     Object.defineProperty(window, 'localStorage', {
// //       value: {
// //         getItem: jest.fn(() => null),
// //         setItem: jest.fn(() => null),
// //         clear: jest.fn(() => null),
// //       },
// //       writable: true,
// //     });
// //   });
//   const setup = async ()  => {
//       const history = createBrowserHistory();
//       const utils = render(
//           <Router  history={history}>
//                <ReceitasEmProgress />
//           </Router>
//       );
//       const profileTopButton = await utils.findByTestId('profile-top-btn');
//       const pageTitle =  await utils.findByTestId('page-title');
//       const searchTopButton =  await utils.findByTestId('search-top-btn');
//     //   console.log(inputEmail, inputPassword, loginSubmitBtn);
//     // const historyLocation =  history.location.pathname ;
//       return {
//         profileTopButton, pageTitle, searchTopButton, history,
//       } 
//     }

//   test('9/10 - Implemente os elementos do header na tela principal de receitas, respeitando os atributos descritos no protótipo', async () => {
//     const {profileTopButton, pageTitle, searchTopButton} = await setup();
//     expect(profileTopButton).not.toBeInTheDocument();
//     expect(pageTitle).not.toBeInTheDocument();
//     expect(searchTopButton).not.toBeInTheDocument();
//   });

// });