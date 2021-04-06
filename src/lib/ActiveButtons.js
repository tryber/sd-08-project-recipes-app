const ACTIVE_BUTTON = 'active-button';

// const activeButton = {
//   init: (parentSelector, type) => {
//     const buttons = document.querySelectorAll(`${parentSelector} button`);
//     buttons[0].classList.add(`${ACTIVE_BUTTON}-${type}`);
//   },
//   onClick: (parentSelector, type) => {
//     const activeButtons = document.querySelectorAll('.selector-grid button');
//     activeButtons.forEach((btn) => {
//       btn.classList.remove(`${ACTIVE_BUTTON}-${recipeType}`);
//     });

//     if (e.target.getAttribute('class') === 'MuiButton-label') {
//       const button = e.target.parentElement;
//       button.classList.add(`${ACTIVE_BUTTON}-${recipeType}`);
//     } else {
//       e.target.classList.add(`${ACTIVE_BUTTON}-${recipeType}`);
//     }
//   },
// };

class ActiveButtons {
  constructor(parentSelector, type) {
    this.buttons = `${parentSelector} button`;
    this.className = `${ACTIVE_BUTTON}-${type}`;
  }

  init() {
    document.querySelectorAll(this.buttons)[0].classList.add(this.className);
  }

  onClick(evt) {
    document.querySelectorAll(this.buttons)
      .forEach((btn) => { btn.classList.remove(this.className); });

    if (evt.target.getAttribute('class') === 'MuiButton-label') {
      evt.target.parentElement.classList.add(this.className);
    } else {
      evt.target.classList.add(this.className);
    }
  }
}

export default ActiveButtons;
