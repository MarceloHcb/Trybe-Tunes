import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import HeaderBackground from '../components/HeaderBackground';
import style from './Favorites.module.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = ({
      loading: false,
      songs: [],
    });
  }

  componentDidMount() {
    this.recoveryLocalFavoriteSongs();
  }

  recoveryLocalFavoriteSongs = async () => {
    this.setState({ loading: true });
    const songs = await getFavoriteSongs();
    this.setState({
      loading: false,
      songs,
    });
  };

  render() {
    const { loading, songs } = this.state;
    const divFavorites = (
      <div className={ style.favorites }>
        <MusicCard songs={ songs } fav="favorites" />
      </div>
    );
    return (
      <div data-testid="page-favorites" className={ style.container }>
        <Header />
        <HeaderBackground />
        <h2 className={ style.title }> Músicas Favoritas</h2>
        <div className={ style.favorites }>
          {loading ? <Loading />
            : divFavorites}
        </div>
      </div>
    );
  }
}

export default Favorites;
