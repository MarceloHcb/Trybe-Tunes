import React from 'react';
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
    console.log(data);
    this.setState({
      userInfo: { ...data },
      loading: false,
    });
  };

  render() {
    const { userInfo, loading } = this.state;
    // PREENCHENDO INFORMAÇÕES DE USUÁRIO RECEBIDAS NO STATE NO HEADER
    const user = (
      <h2 data-testid="header-user-name">
        {' '}
        Usuário:
        {userInfo.name}
      </h2>
    );
    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : user}
      </header>
    );
  }
}

export default Header;
