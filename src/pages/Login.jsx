import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import style from './Login.module.css';
import logo from '../images/logo.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    const INITIAL_STATE = {
      login: true,
      authenticated: false,
      loading: false,
      isSaveButtonDisabled: true,
      name: '',
      email: '',
      image: '',
    };

    this.state = ({
      ...INITIAL_STATE,
    });
  }

  // VALIDACAO PARA HABILITAR O BOTAO
  validationButton = () => {
    const { name } = this.state;

    const maxCaracteres = 3;
    const validation = name.length >= maxCaracteres;
    // const validation1 = email.length > 0;
    // const validation2 = email.includes('@')
    // && (email.includes('.com') || email.includes('.COM'));
    // const validation3 = password.length >= 6;
    this.setState({
      isSaveButtonDisabled: !(validation),
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
    const { authenticated, isSaveButtonDisabled, loading } = this.state;
    const form = (
      <form className={ style.form }>
        <img src={ logo } alt="logo" />
        <label htmlFor="inputName">
          Name:
          <input
            type="text"
            id="inputName"
            name="name"
            data-testid="login-name-input"
            placeholder="qual é o seu nome? "
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputEmail">
          Email:
          <input
            type="email"
            id="inputEmail"
            name="email"
            placeholder="qual seu e-mail? "
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
            rows="2"
            cols="42"
          />
        </label>
        <label htmlFor="inputImage">
          Imagem:
          <input
            type="text"
            id="inputImage"
            name="image"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          disabled={ isSaveButtonDisabled }
          onClick={ this.handleClick }
          data-testid="login-submit-button"
        >
          Entrar
          {authenticated && <Redirect to="/search" />}
        </button>
      </form>);
    return (
      <div data-testid="page-login" className={ style.container }>
        {!loading ? form : <Loading /> }
      </div>
    );
  }
}

export default Login;
