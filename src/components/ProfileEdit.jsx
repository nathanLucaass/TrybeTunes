import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    loading: true,
    name: '',
    description: '',
    email: '',
    image: '',
  };

  async componentDidMount() {
    const user = await getUser();
    const { name, description, email, image } = user;
    console.log(user);
    this.setState({ name, description, email, image });
    this.setState({ loading: false });
  }

  onInputChange = (event) => {
    event.preventDefault();
    const { target } = event;
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveChanges = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { name, description, email, image } = this.state;
    updateUser({ name, description, email, image });
    history.push('/profile');
  };

  render() {
    const { loading, name, description, email, image } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit" />
        {loading ? (
          <Loading />
        ) : (
          <form id="profileEdit">
            <label htmlFor="name">
              <h2>Nome</h2>
              <p>Fique à vontate para usar nome social</p>
              <input
                type="text"
                placeholder="Nome"
                name="name"
                value={ name }
                onChange={ this.onInputChange }
                className="inputEdit"
              />
            </label>
            <label htmlFor="email">
              <h2>E-mail</h2>
              <input
                value={ email }
                type="text"
                placeholder="Email"
                name="email"
                onChange={ this.onInputChange }
                className="inputEdit"
              />
            </label>
            <label htmlFor="description">
              <h2>Descrição</h2>
              <p>Conte um pouco sobre você</p>
              <input
                value={ description }
                type="text"
                placeholder="Descrição"
                name="description"
                onChange={ this.onInputChange }
                className="inputEdit"
              />
            </label>
            <label htmlFor="image">
              <h2>Imagem</h2>
              <p>Insira uma URL de imagem</p>
              <input
                value={ image }
                type="text"
                placeholder="Foto"
                name="image"
                onChange={ this.onInputChange }
                className="inputEdit"
              />
            </label>
            <button
              type="submit"
              onClick={ this.saveChanges }
              id="btn-edit"
            >
              Salvar

            </button>
          </form>
        )}
      </>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.string.isRequired,
};
