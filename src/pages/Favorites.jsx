import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

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
    console.log(songs);
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : <MusicCard songs={ songs } fav="favorites" />}

      </div>
    );
  }
}

export default Favorites;
