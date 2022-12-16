import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = ({
      loading: false,
    });
  }

  componentDidMount() {
    this.recoveryLocalFavoriteSongs();
  }

  onInputChange = async ({ target }) => {
    const { name } = target;
    this.setState({
      loading: true,
    });
    await addSong(name);
    this.setState({
      loading: false,
    });
  };

  recoveryLocalFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    await getFavoriteSongs();
    this.setState({
      loading: false,
    });
  };

  // FUNCAO QUE MANTEM CHECKED OS ITENS QUE ESTÃO NO LOCALSTORANGE(favoritos)
  localCheck = (param) => {
    const localSongs = localStorage.getItem('favorite_songs');
    return localSongs.includes(param);
  };

  render() {
    const { loading } = this.state;
    const { songs } = this.props;
    // RETIRA O PRIMEIRO INDICE DO ARRAY SONGS
    const newSongArray = [...songs];
    newSongArray.shift();
    const divCard = (
      <div>
        {newSongArray.map(({ trackName, previewUrl, trackId }, index) => (
          <div key={ index }>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favoriteInput">
              Favorita
              <input
                type="checkbox"
                name={ trackName }
                checked={ this.localCheck(trackName) }
                id="favoriteInput"
                onChange={ this.onInputChange }
                data-testid={ `checkbox-music-${trackId}` }
                onClick={ this.handleClick }
              />
            </label>
            <h3>{trackName}</h3>
          </div>
        ))}
      </div>
    );
    return (
      <div>
        {!loading
          ? divCard : <Loading /> }
      </div>
    );
  }
}
MusicCard.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default MusicCard;
