import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    const INITIAL_STATE = {
      name: '',
      login: true,
      authenticated: false,
      loading: false,
    };

    this.state = ({
      ...INITIAL_STATE,
    });
  }

  componentDidMount() {

  }

  // VALIDACAO PARA HABILITAR O BOTAO
  validationButton = () => {
    const { name } = this.state;
    const maxCaracteres = 3;
    const validationName = name.length >= maxCaracteres;
    this.setState({
      login: !validationName,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationButton);
  };

  handleClick = async () => {
    const { name, email, image, description } = this.state;
    this.setState({
      authenticated: true,
      loading: true,
    });
    await createUser({ name, email, image, description });
    this.setState({
      loading: false,
    });
  };

  render() {
    const { authenticated, login, loading } = this.state;
    const form = (
      <form>
        <label htmlFor="inputName">
          Name:
          <input
            type="text"
            id="inputName"
            name="name"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputEmail">
          Email:
          <input
            type="email"
            id="inputEmail"
            name="email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputDescription">
          Descrição:
          <textarea
            type="text"
            id="inputDescription"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputImage">
          Imagem do Perfil:
          <input
            type="text"
            id="inputImage"
            name="image"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          disabled={ login }
          onClick={ this.handleClick }
          data-testid="login-submit-button"
        >
          Entrar
          {authenticated && <Redirect to="/search" />}
        </button>
      </form>);
    return (
      <div data-testid="page-login">
        {!loading ? form : <Loading /> }
      </div>
    );
  }
}

export default Login;
