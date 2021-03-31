import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import RecommendedCard from './RecommendedCard';

function RecommendedList({ value }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const MAX_RECIPES = 6;
  return (
    <Carousel activeIndex={ index } onSelect={ handleSelect }>
      {value.map((elem, i) => {
        if (i < MAX_RECIPES) {
          return (
            <Carousel.Item>
              <RecommendedCard
                key={ i }
                card={ elem }
                index={ i }
              />
            </Carousel.Item>
          );
        }
        return '';
      })}
    </Carousel>
  );
}

RecommendedList.propTypes = {
  value: PropTypes.shape(
    PropTypes.any,
  ).isRequired,
};

export default RecommendedList;
