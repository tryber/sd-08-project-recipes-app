import React from 'react';
import favoriteIcon from '../../assets/images/blackHeartIcon.svg';
import shareIcon from '../../assets/images/shareIcon.svg';

export default function FavoriteAndShare() {
  return (
    <section>
      <button type="button" data-testid="favorite-btn">
        <img src={ favoriteIcon } alt="favorite" />
      </button>
      <button type="button" data-testid="share-btn">
        <img src={ shareIcon } alt="share" />
      </button>
    </section>
  );
}
