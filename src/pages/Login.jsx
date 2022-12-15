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

  shouldComponentUpdate(_nextprops, nextState) {
    console.log(nextState);
    return true;
  }

  componentDidUpdate(prevProp, prevState) {
    console.log(prevState);
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
    this.setState({
      name: target.value,
    }, this.validationButton);
  };

  handleClick = async () => {
    const { name } = this.state;
    this.setState({
      authenticated: true,
      loading: true,
    });
    await createUser({ name });
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
            data-testid="login-name-input"
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
