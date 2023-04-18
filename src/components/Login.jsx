import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingL from './LoadingL';

import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    name: '',
    loading: false,
  };

  handleSubmit = async () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png' });
    this.setState({ loading: false });
    history.push('/search');
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ name: value });
  };

  render() {
    const min = 3;
    const { name, loading } = this.state;
    return (
      <div data-testid="page-login" id="login">
        {loading ? (
          <p><LoadingL /></p>
        ) : (
          <div id="login-info">
            <img src="https://i.ibb.co/mrjLCF8/Logo.png" alt="Logo" id="logo-login" />
            <label htmlFor="name">
              <input
                placeholder="Qual é o seu nome?"
                type="text"
                id="loginInput"
                name="name"
                value={ name }
                onChange={ this.handleInputChange }
                data-testid="login-name-input"
              />
            </label>
            <button
              id="button-login"
              type="submit"
              disabled={ name.length < min }
              data-testid="login-submit-button"
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </div>

        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};
