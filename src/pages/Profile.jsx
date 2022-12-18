import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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
    console.log(userInfo);
    const divProfile = (
      <div>
        <h2>Nome</h2>
        <p>{name}</p>
        <h2>E-mail</h2>
        <p>{email}</p>
        <h2>Descrição</h2>
        <p>{description}</p>
        <img src={ image } alt={ name } data-testid="profile-image" />
        <Link to="/profile/edit">
          <h3>Editar perfil</h3>
        </Link>
      </div>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        {loading
          ? <Loading />
          : divProfile}
      </div>
    );
  }
}

export default Profile;
