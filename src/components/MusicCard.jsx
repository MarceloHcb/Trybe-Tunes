import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { songs } = this.props;
    // RETIRA O PRIMEIRO INDICE DO ARRAY SONGS
    const newSongArray = [...songs];
    newSongArray.shift();
    return (
      <>
        {newSongArray.map(({ trackName, previewUrl }, index) => (
          <div key={ index }>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <h3>{trackName}</h3>
          </div>
        ))}
      </>
    );
  }
}
MusicCard.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default MusicCard;
