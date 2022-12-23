import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import style from './MusicCard.module.css';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      loading: false,
      favSongs: [],
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
    if (target.checked) {
      await addSong(song);
      this.setState({ loading: false });
    } else {
      await removeSong(song);
      this.setState({ loading: false });
    }
    this.recoveryLocalFavoriteSongs();
  };

  recoveryLocalFavoriteSongs = async () => {
    this.setState({ loading: true });
    const local = await getFavoriteSongs();
    this.setState({
      loading: false,
      favSongs: local,
    });
  };

  // FUNCAO QUE MANTEM CHECKED OS ITENS QUE ESTÃO NO LOCALSTORANGE(favoritos)
  isChecked = (song) => {
    const localCheck = localStorage.getItem('favorite_songs');
    return localCheck.includes(song);
  };

  render() {
    const { loading, favSongs } = this.state;
    const { fav, songs, collectionImage } = this.props;
    // RETIRA O PRIMEIRO INDICE DO ARRAY SONGS
    const newSongArray = [...songs];
    newSongArray.shift();
    const musicArray = fav === 'favorites' ? favSongs : newSongArray;
    const albumImage = fav !== 'favorites' ? (<img
      src={ collectionImage }
      alt="collectionImage"
    />) : '';
    const divCard = (
      <div className={ style.container }>
        { albumImage }
        {musicArray.map((song, index) => (
          <div key={ index } className={ style.list }>
            <h3>{song.trackName}</h3>
            <audio data-testid="audio-component" src={ song.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ song.trackId }>
              <input
                type="checkbox"
                name={ song.trackName }
                checked={ this.isChecked(song.trackId) }
                id={ song.trackId }
                onChange={ this.onInputChange }
                data-testid={ `checkbox-music-${song.trackId}` }
                className={ style.inputCheckbox }
              />
              <p>Favorita</p>
              <span />
            </label>
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
  fav: PropTypes.string.isRequired,
  collectionImage: PropTypes.string.isRequired,
  songs: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default MusicCard;
