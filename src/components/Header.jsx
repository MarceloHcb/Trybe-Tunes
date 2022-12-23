import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch, BsStar } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import style from './Header.module.css';
import logo from '../images/logo.png';

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
      <div className={ style.userDiv }>
        <Link to="/profile" className={ style.Link }>
          {' '}
          <img src={ userInfo.image } alt={ userInfo.name } className={ style.userImg } />
        </Link>
        <h2 data-testid="header-user-name">
          {userInfo.name}
        </h2>
      </div>
    );
    return (
      <header data-testid="header-component" className={ style.container }>
        <Link to="/">
          {' '}
          <img src={ logo } alt="logo" className={ style.logo } />
        </Link>
        <Link to="/search" data-testid="link-to-search" className={ style.Link }>
          <BsSearch className={ style.icon } />
          {' '}
          Pesquisa
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites" className={ style.Link }>
          {' '}
          <BsStar className={ style.icon } />
          Músicas Favoritas
        </Link>
        <Link to="/profile" data-testid="link-to-profile" className={ style.Link }>
          {' '}
          <CgProfile className={ style.icon } />
          {' '}
          Perfil
        </Link>

        { loading
          ? <Loading />
          : user}
      </header>
    );
  }
}

export default Header;
