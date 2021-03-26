import React from 'react';
import favoriteIcon from '../../assets/images/blackHeartIcon.svg';
import shareIcon from '../../assets/images/shareIcon.svg';

export default function FavoriteAndShare() {
  return (
    <section>
      <button type="button">
        <img src={ favoriteIcon } alt="favorite" data-testid="favorite-btn" />
      </button>
      <button type="button">
        <img src={ shareIcon } alt="share" data-testid="share-btn" />
      </button>
    </section>
  );
}
