import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  state = {
    loading: true,
    user: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
    this.setState({ loading: false });
    console.log(user);
  }

  render() {
    const { loading, user } = this.state;
    const { name, description, email, image } = user;
    return (
      <>
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div data-testid="page-profile" className="profileCard">
            <div id="barProfile">
              <img
                src={ image }
                alt="profileImg"
                data-testid="profile-image"
                id="profile-Image"
              />
            </div>
            <h1 id="NomeProfile">{name}</h1>
            <h3>{email}</h3>
            <p id="profileDescription">{description}</p>
            <Link to="/profile/edit" className="btn btn-edit">Editar Perfil</Link>
          </div>
        )}
      </>
    );
  }
}

export default Profile;
