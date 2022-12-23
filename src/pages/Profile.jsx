import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HeaderBackground from '../components/HeaderBackground';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import style from './Profile.module.css';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = ({
      loading: false,
      userInfo: {},
    });
  }

  componentDidMount() {
    this.userData();
  }

  userData = async () => {
    this.setState({
      loading: true,
    });
    const data = await getUser();
    this.setState({
      userInfo: { ...data },
      loading: false,
    });
  };

  render() {
    const { userInfo, loading } = this.state;
    const { name, email, image, description } = userInfo;
    const divProfile = (
      <div className={ style.divProfile }>
        <img
          src={ image }
          alt={ name }
          data-testid="profile-image"
          className={ style.ProfileImg }
        />
        <h2>Nome:</h2>
        <p>{name}</p>
        <h2>E-mail:</h2>
        <p>{email}</p>
        <h2>Descrição:</h2>
        <p>{description}</p>
        <button type="button">
          <Link to="/profile/edit">
            Editar perfil
          </Link>
        </button>
      </div>
    );
    return (
      <div data-testid="page-profile" className={ style.container }>
        <HeaderBackground />
        <Header />
        {loading
          ? <Loading />
          : divProfile}
      </div>
    );
  }
}

export default Profile;
