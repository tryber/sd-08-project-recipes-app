import React from 'react';
import { useSelector } from 'react-redux';
import { embedLink } from '../../services/utils';

export default function YTVideo() {
  const { strYoutube } = useSelector((state) => state.detailsReducer.actualRecipe);
  return (
    <iframe
      data-testid="video"
      src={ embedLink(strYoutube) }
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
      allowFullScreen
    />
  );
}
