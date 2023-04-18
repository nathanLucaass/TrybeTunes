import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    name: '',
    loading: false,
    albuns: '',
    artist: '',
  };

  handleSubmit = async () => {
    const { name } = this.state;
    this.setState({ loading: true, artist: name });
    const albuns = await searchAlbumsAPI(name);
    this.setState({ loading: false, albuns, name: '' });
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ name: value });
  };

  render() {
    const min = 2;
    const { name, loading, albuns, artist } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <div id="search-Bar">
            <label htmlFor="name" id="Pesuisa">
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleInputChange }
                data-testid="search-artist-input"
                id="input-Search"
              />
              <button
                id="button-Search"
                type="submit"
                disabled={ name.length < min }
                data-testid="search-artist-button"
                onClick={ this.handleSubmit }
              >
                Pesquisar
              </button>
            </label>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div>
              {albuns.length <= 0 ? (
                <h1 id="validAlbum">Insira um Álbum</h1>
              ) : (
                <>
                  <h2 id="result-Albuns">
                    Resultado de álbuns de:
                    {' '}
                    {artist}
                  </h2>
                  <div id="all-albuns">
                    {albuns.map((album) => (
                  <div
                  key={album.collectionId}
                  className="album-card"
                  onClick={() => (window.location = `/album/${album.collectionId}`)}
                  data-testid={`link-to-album-${album.collectionId}`}
                  >
                  <Link className="LinkAulbum" to={`/album/${album.collectionId}`}>
                  <img src={album.artworkUrl100} alt="" className="album-image" />
                  {album.collectionName}
                  </Link>
                  </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Search;
