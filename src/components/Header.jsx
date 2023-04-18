import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    name: '',
    loading: false,
    profileImg: '',
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      name: user.name,
      profileImg: user.image,
      loading: false,
    });
  }

  render() {
    const { name, loading, profileImg } = this.state;
    return (
      <div id="nav">
        <div data-testid="header-component">
          <img src="https://i.ibb.co/mrjLCF8/Logo.png" alt="Logo" id="logo-header" />
        </div>
        <div id="links">
          <Link className="Link" to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link
            className="Link"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favoritos
          </Link>
          <Link className="Link" to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div id="profileHeader">
            <img src={ profileImg } alt="ProfileImg" id="headerProfileImg" />
            <h1 data-testid="header-user-name" id="user">{name}</h1>
          </div>
        )}
      </div>
    );
  }
}
