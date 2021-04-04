import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import StyledExploreCard from '../styles/component/ExploreCard';

export default function ExploreCard({ cardName, cardId, linkTo }) {
  const history = useHistory();

  const goToLink = () => history.push(`${linkTo}`);

  return (
    <StyledExploreCard
      type="button"
      data-testid={ `explore-${cardId}` }
      onClick={ goToLink }
    >
      {cardName}
    </StyledExploreCard>
  );
}

ExploreCard.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};
