import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

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
    const id = Number(target.id);
    const { songs } = this.props;
    const song = songs.find((item) => item.trackId === id);
    this.setState({ loading: true });
    // MECANISMO QUE INCLUI OU RETIRA O OBJETO DOS FAVORITOS
    if (target.checked === true) {
      await addSong(song);
      this.setState({ loading: false });
    } else {
      await removeSong(song);
      this.setState({ loading: false });
    }
  };

  recoveryLocalFavoriteSongs = async () => {
    this.setState({ loading: true });
    await getFavoriteSongs();
    this.setState({ loading: false });
  };

  // FUNCAO QUE MANTEM CHECKED OS ITENS QUE ESTÃO NO LOCALSTORANGE(favoritos)
  isChecked = (song) => {
    const localCheck = localStorage.getItem('favorite_songs');
    return localCheck.includes(song);
  };

  render() {
    const { loading } = this.state;
    const { songs } = this.props;
    // RETIRA O PRIMEIRO INDICE DO ARRAY SONGS
    const newSongArray = [...songs];
    newSongArray.shift();
    const divCard = (
      <div>
        {newSongArray.map((song, index) => (
          <div key={ index }>
            <audio data-testid="audio-component" src={ song.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ song.trackId }>
              Favorita
              <input
                type="checkbox"
                name={ song.trackName }
                checked={ this.isChecked(song.trackId) }
                id={ song.trackId }
                onChange={ this.onInputChange }
                data-testid={ `checkbox-music-${song.trackId}` }

              />
            </label>
            <h3>{song.trackName}</h3>
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
