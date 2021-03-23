import React from 'react';

export default function Hero(src, name) {
  return (
    <img src={ src } alt={ name } data-testid="recipe-photo" />
  );
}
