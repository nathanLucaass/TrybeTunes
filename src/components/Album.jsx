import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    allMusic: '',
    loading: true,
    fav: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const allMusic = await getMusics(match.params.id);
    this.setState({ allMusic });
    this.setState({ loading: false });
    const fav = await getFavoriteSongs();
    this.setState({ fav });
  }

  render() {
    const { allMusic, loading, fav } = this.state;
    console.log(fav);
    return (
      <>
        <Header />
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <div data-testid="page-album">
              <h1
                data-testid="album-name"
                id="album-Name"
              >
                {allMusic[0].collectionCensoredName}

              </h1>
              <h2 data-testid="artist-name" id="band-Name">{allMusic[0].artistName}</h2>
            </div>
            <div className="all-Music">
              {allMusic.slice(1).map((musica, index) => (
                <MusicCard
                  key={ index }
                  artworkUrl100={ musica.artworkUrl100 }
                  trackName={ musica.trackName }
                  previewUrl={ musica.previewUrl }
                  trackId={ musica.trackId }
                />
              ))}
            </div>
          </>
        )}
      </>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
