import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    isChecked: false,
    loading: false,
    trackId: '',
  };

  async componentDidMount() {
    const { trackId } = this.props;
    this.setState({ trackId });
    const fav = await getFavoriteSongs();
    if (fav.some((music) => music.trackId === trackId)) {
      this.setState({ isChecked: true });
    }
  }

  handleInputChange = async (event) => {
    const { trackId } = this.state;
    this.setState({ isChecked: event.target.checked });
    if (event.target.checked) {
      this.setState({ loading: true });
      this.setState({ trackId });
      await addSong({ trackId });
      this.setState({ loading: false });
    }
    if (!event.target.checked) {
      this.setState({ loading: true });
      await removeSong({ trackId });
      this.setState({ loading: false });
    }
  };

  render() {
    const { trackName, previewUrl, artworkUrl100, trackId } = this.props;
    const { loading, isChecked } = this.state;
    return (
      <div className="MusicCard">
        {loading ? (
          <p id="music-Load">Carregando...</p>
        ) : (
          <>
            <div id="MusicInfo">
              <img src={ artworkUrl100 } alt="" id="MusicImg" />
              <div id="music-Fav">
                <h3 id="MusicName">{trackName}</h3>
                <label id="CardLabel">
                  <input
                    id="Favorite"
                    type="checkbox"
                    data-testid={ `checkbox-music-${trackId}` }
                    checked={ isChecked }
                    onChange={ this.handleInputChange }
                  />
                  Favorita
                </label>
              </div>
            </div>
            <audio data-testid="audio-component" src={ previewUrl } controls id="audio">
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
          </>
        )}
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
