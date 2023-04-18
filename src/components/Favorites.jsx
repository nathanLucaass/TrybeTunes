import React, { Component } from 'react';
import Header from './Header';
import getMusic from '../services/getMusic';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends Component {
  state = {
    musics: [],
    loading: false,
  };

  async componentDidMount() {
    this.generateFav();
  }

  componentDidUpdate(prevProps, prevState) {
    const { musics } = this.state;
    if (prevState.musics !== musics) {
      this.generateFav();
    }
  }

  InputChange = async () => {
    this.setState({ loading: true });
    this.setState({ loading: false });
  };

  async generateFav() {
    const fav = await getFavoriteSongs();
    const promises = [];
    fav.forEach((item) => {
      const promise = getMusic(item.trackId);
      promises.push(promise);
    });

    try {
      const results = await Promise.all(promises);
      const flattenedResults = results.flat();
      this.setState({ musics: flattenedResults });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { musics, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            musics.map((music) => (
              <MusicCard
                key={ music.trackId }
                artworkUrl100={ music.artworkUrl100 }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                onChange={ this.InputChange }
                generateFav={ this.generateFav }
              />
            ))
          )}
        </div>
      </>
    );
  }
}

export default Favorites;
