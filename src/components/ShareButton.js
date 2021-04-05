import React, { Component } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

class ShareButton extends Component {
  constructor() {
    super();
    this.state = {
      displayShareMesage: false,
    };
    this.share = this.share.bind(this);
    this.favoriteThisItem = this.favoriteThisItem.bind(this);
  }

  share() {
    copy(window.location);
    const SHOW_TIME = 3000;
    this.setState({ displayShareMesage: true }, () => {
      setTimeout(() => this.setState({ displayShareMesage: false }), SHOW_TIME);
    });
  }

  render() {
    const { displayShareMesage } = this.state;
    return (
      <div>
        <button
          type="button"
          onClick={ () => this.share() }
        >
          <img
            alt="card"
            data-testid="share-btn"
            src={ shareIcon }
          />
          {' '}
        </button>
        { displayShareMesage ? <p className="alert">Link copiado!</p> : <div />}

      </div>
    );
  }
}

export default ShareButton;
