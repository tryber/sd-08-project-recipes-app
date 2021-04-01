import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import Cards from '../Card/Cards';
import 'react-multi-carousel/lib/styles.css';

const SlideCards = ({ title, results, numberOfCards }) => {
  const recomended = results.filter((result, index) => index < numberOfCards);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <Carousel responsive={responsive}>
      {recomended.map((result, index) => (
        <div className="item" key={index}>
          <Cards
            className="item-card"
            title={title}
            object={result}
            index={index}
            testid="-recomendation-card"
            cardTitle="-recomendation-title"
          />
        </div>
      ))}
    </Carousel>
  );
};
SlideCards.propTypes = {
  title: PropTypes.string.isRequired,
  results: PropTypes.arrayOf.isRequired,
  numberOfCards: PropTypes.string.isRequired,
};

export default SlideCards;
