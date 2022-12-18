import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      loading: false,
      userInfo: {},
    });
  }

  componentDidMount() {
    this.userData();
  }

  // BUSCANDO INFORMAÇÕES DO USUÁRIO
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
    // PREENCHENDO INFORMAÇÕES DE USUÁRIO RECEBIDAS DO STATE NO HEADER
    const user = (
      <h2 data-testid="header-user-name">
        {' '}
        Usuário:
        {userInfo.name}
      </h2>
    );
    return (
      <header data-testid="header-component">

        <Link to="/search" data-testid="link-to-search"> Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Músicas Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile"> Perfil</Link>

        { loading
          ? <Loading />
          : user}
      </header>
    );
  }
}

export default Header;
