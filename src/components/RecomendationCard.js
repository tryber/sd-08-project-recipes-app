import React, { Component } from 'react';
import { Button, Card, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class RecomendationCard extends Component {
  constructor() {
    super();
    this.state = {
      carouselIndex: 0,
    };
    this.handleCarousel = this.handleCarousel.bind(this);
  }

  handleCarousel(selectedIndex) {
    this.setState({ carouselIndex: selectedIndex });
  }

  render() {
    const { carouselIndex } = this.state;
    const { recomendations, redirectToPage } = this.props;
    return (
      <Carousel activeIndex={ carouselIndex } onSelect={ this.handleCarousel }>
        {recomendations.map((recomendation, index) => {
          const {
            strMealThumb,
            strMeal,
            strCategory,
            idMeal,
            strDrinkThumb,
            strDrink,
            idDrink,
            // strAlcoholic,
          } = recomendation;
          return (
            <Carousel.Item key={ index }>
              <Card
                style={ { width: '18rem' } }
                data-testid={ `${index}-recomendation-card` }
              >
                <Card.Img variant="top" src={ strMealThumb || strDrinkThumb } />
                <Card.Body>
                  <Card.Title
                    data-testid={ `${index}-recomendation-title` }
                  >
                    { strMeal || strDrink }
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    { strCategory }
                  </Card.Subtitle>
                  <Button
                    variant="primary"
                    onClick={ () => {
                      if (idMeal) {
                        return redirectToPage(`/comidas/${idMeal}`);
                      }
                      if (idDrink) {
                        return redirectToPage(`/bebidas/${idDrink}`);
                      }
                    } }
                  >
                    Go somewhere
                  </Button>

                </Card.Body>
              </Card>

            </Carousel.Item>
          );
        })}
      </Carousel>

    );
  }
}

RecomendationCard.propTypes = {
  recomendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  redirectToPage: PropTypes.func.isRequired,
};

export default withRouter(RecomendationCard);
