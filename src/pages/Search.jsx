import React from 'react';
import Header from '../components/Header';

// CAMPO DE PESQUISA
class Search extends React.Component {
  constructor() {
    super();

    this.state = ({
      searchName: '',
      buttonDisable: true,
    });
  }

  // VALIDACAO DE 2 CARACTERES PARA DESBLOQUEIO DO BOTAO SEARCH
  validationButton = () => {
    const { searchName } = this.state;
    const maxCaracteres = 2;
    const validationName = searchName.length >= maxCaracteres;
    this.setState({
      buttonDisable: !validationName,
    });
  };

  // ATRIBUI O NOME A SER PESQUISADO E HABILITA O BOTAO COM VALIDAÇÃO
  handleChange = ({ target }) => {
    this.setState({
      searchName: target.value,
    }, this.validationButton);
  };

  render() {
    const { buttonDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            disabled={ buttonDisable }
            data-testid="search-artist-button"
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
