import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Generico extends Component {
  constructor() {
    super();
    this.video = this.video.bind(this);
    this.randonDrinkVideo = this.randonDrinkVideo.bind(this);
  }

  video() {
    const { detalhes } = this.props;
    let youtube;
    if (detalhes !== undefined && detalhes.strYoutube !== undefined) {
      youtube = detalhes.strYoutube.replace('watch?v=', 'embed/');
    }
    if (!detalhes.strYoutube) {
      youtube = this.randonDrinkVideo();
    }
    if (detalhes !== undefined && detalhes.strYoutube !== undefined) {
      youtube = detalhes.strYoutube.replace('watch?v=', 'embed/');
    }
    return youtube;
  }

  randonDrinkVideo() {
    const min = 1;
    const max = 5;
    const arrOptions = ['sóPraSerMaisAleatorio', '4u_ODB0kb-8',
      '4DHLbsRoTvY', '7Le2Pk1SkMc', 'FrFSeuAJd9o', 'cVyYy2HO-0'];
    const random = Math.random() * (max - min) + min;
    const indice = Math.ceil(random);
    const fimDoLink = arrOptions[indice];
    return `https://www.youtube.com/embed/${fimDoLink}`;
  }

  render() {
    const youtube = this.video();
    return (
      <div>
        <h1>Generico</h1>
        <iframe width="683" height="384" title="video" src={ youtube } />
      </div>
    );
  }
}

Generico.propTypes = {
  detalhes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  detalhes: state.routes.detalhes,
});

export default connect(mapStateToProps)(Generico);
