import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import HeaderBackground from '../components/HeaderBackground';
import Loading from '../components/Loading';
import { updateUser, getUser } from '../services/userAPI';
import style from './ProfileEdit.module.css';

class ProfileEdit extends React.Component {
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
      description: '',
    };

    this.state = ({
      ...INITIAL_STATE,
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
    console.log(data);
    this.setState({
      name: data.name,
      email: data.email,
      image: data.image,
      description: data.description,
      loading: false,
    });
  };

  // VALIDACAO PARA HABILITAR O BOTAO
  validationButton = () => {
    const { name, email, image } = this.state;
    console.log(image);
    const maxCaracteres = 3;
    const validation = name.length >= maxCaracteres;
    const validation1 = email.length > 0;
    const validation2 = email.includes('@') && email.includes('.com');
    const validation3 = image.length > 0;
    this.setState({
      isSaveButtonDisabled: !(validation && validation1 && validation2 && validation3),
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
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await updateUser({ name, email, image, description });
    this.setState({
      loading: false,
    });
    history.push('/profile');
  };

  render() {
    const { loading, isSaveButtonDisabled } = this.state;
    const { name, email, image, description } = this.state;
    const form = (
      <form>
        <label htmlFor="inputName">
          Fique à vontade para usar seu nome social
          <input
            type="text"
            id="inputName"
            value={ name }
            name="name"
            data-testid="edit-input-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputEmail">
          Escolha um e-mail que consulte diariamente
          <input
            type="email"
            id="inputEmail"
            value={ email }
            name="email"
            data-testid="edit-input-email"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputDescription">
          Descrição
          { description }
          <textarea
            type="text"
            value={ description }
            id="inputDescription"
            name="description"
            data-testid="edit-input-description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="inputImage" className={ style.imageLabel }>
          Insira um link
          <input
            placeholder={ image }
            type="text"
            value={ image }
            id="inputImage"
            name="image"
            data-testid="edit-input-image"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isSaveButtonDisabled }
          onClick={ this.handleClick }
          data-testid="edit-button-save"
        >
          Editar perfil
        </button>
      </form>
    );
    return (
      <div data-testid="page-profile-edit" className={ style.container }>
        <HeaderBackground />
        <Header />
        <img src={ image } alt={ name } className={ style.userImg } />

        {!loading ? form : <Loading /> }

      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
}.isRequired;

export default ProfileEdit;
