import React from 'react';
import { BsSearch } from 'react-icons/bs';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import ArtisticCard from '../components/ArtisticCard';
import style from './Search.module.css';
import errorLogo from '../images/🦆 icon _circle error_.png';
import HeaderBackground from '../components/HeaderBackground';

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
    const divError = (
      <div className={ style.error }>
        <img src={ errorLogo } alt="erro" />
        <h2> Nenhum álbum foi encontrado</h2>
      </div>
    );
    this.setState({
      loading: false,
      artisticSearchResult: [...artisticResult],
      error: divError,
    });
  };

  render() {
    const { buttonDisable, loading, searchName,
      artisticSearchResult, error } = this.state;
    const artisticSearchResultDiv = (
      <div>
        <h1>
          Resultado de álbuns de:
          {' '}
          {searchName}
        </h1>
        <ArtisticCard artisticSearchResult={ artisticSearchResult } />
      </div>
    );
    const form = (
      <form className={ style.form }>
        <HeaderBackground />
        <input
          type="text"
          placeholder="nome do artista"
          data-testid="search-artist-input"
          onChange={ this.handleChange }
          className={ style.input }
        />
        <label htmlFor="inputSearch">
          <input
            type="submit"
            id="inputSearch"
            value="Pesquisar"
            disabled={ buttonDisable }
            onClick={ this.handleClick }
            data-testid="search-artist-button"
            className={ style.btn }
          />

          <BsSearch className={ style.iconSearch } />
        </label>
      </form>);
    return (
      <div data-testid="page-search" className={ style.container }>
        <Header />
        { loading ? <Loading />
          : form}
        <div className={ style.artistDiv }>
          { artisticSearchResult.length > 0
            ? artisticSearchResultDiv : error}

        </div>
      </div>
    );
  }
}

export default Search;
