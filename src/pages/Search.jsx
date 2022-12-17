import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import ArtisticCard from '../components/ArtisticCard';

// CAMPO DE PESQUISA
class Search extends React.Component {
  constructor() {
    super();

    this.state = ({
      searchName: '',
      buttonDisable: true,
      loading: false,
      artisticSearchResult: [],
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

  handleClick = async (e) => {
    e.preventDefault();
    const { searchName } = this.state;
    this.setState({
      loading: true,
    });
    // REQUISIÇÃO DE ARTISTAS COM BASE NO NOME DIGITADO NA PESQUISA
    const artisticResult = await searchAlbumsAPI(searchName);
    this.setState({
      loading: false,
      artisticSearchResult: [...artisticResult],
      error: 'Nenhum álbum foi encontrado',
    });
  };

  render() {
    const { buttonDisable, loading, searchName,
      artisticSearchResult, error } = this.state;
    const artisticSearchResultDiv = (
      <h2>
        Resultado de álbuns de:
        {' '}
        {searchName}
        <ArtisticCard artisticSearchResult={ artisticSearchResult } />
      </h2>
    );
    const form = (
      <form>
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ buttonDisable }
          onClick={ this.handleClick }
          data-testid="search-artist-button"
        >
          Pesquisar

        </button>
      </form>);
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading />
          : form}
        <div>
          { artisticSearchResult.length > 0
            ? artisticSearchResultDiv : error }

        </div>
      </div>
    );
  }
}

export default Search;
