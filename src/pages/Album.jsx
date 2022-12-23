import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import style from './Album.module.css';
import HeaderBackground from '../components/HeaderBackground';

class Album extends React.Component {
  constructor() {
    super();

    this.state = ({
      songs: [],
      album: {},
      loading: false,
    });
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs = async () => {
    const { match } = this.props;
    this.setState({
      loading: true,
    });
    // BUSCA OS DADOS DOS ARTISTAS NA API ATRAVÉS DOS PARÂMETROS DA ROTA
    const fetchedSongs = await getMusics(match.params.id);
    this.setState({
      songs: fetchedSongs,
      album: fetchedSongs[0],
      loading: false,
    });
  };

  render() {
    const { songs, album, loading } = this.state;
    const divCard = (
      <div>
        <h2 data-testid="album-name">{album.collectionName}</h2>
        <p data-testid="artist-name">
          {album.artistName}
        </p>
        <MusicCard
          songs={ songs }
          fav="noFavorites"
          collectionImage={ album.artworkUrl100 }
        />
      </div>

    );
    return (
      <div className={ style.container }>
        <HeaderBackground />
        <Header />
        <div data-testid="page-album" className={ style.divCard }>
          { loading ? <Loading />
            : divCard}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
