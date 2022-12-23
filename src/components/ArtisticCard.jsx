import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './ArtisticCard.module.css';

// CARD COM A INFORMAÇÃO DOS ARTISTAS DA API

class ArtisticCard extends React.Component {
  render() {
    const { artisticSearchResult } = this.props;
    return (
      <div className={ style.container }>
        {artisticSearchResult
          .map((
            { artistName, artworkUrl100, collectionId,
              collectionName },
            index,
          ) => (
            <div key={ index }>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <img src={ artworkUrl100 } alt={ artistName } />
                <p>{collectionName}</p>
                <h2>{artistName}</h2>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}
ArtisticCard.propTypes = {
  artisticSearchResult: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.number.isRequired,
      artistName: PropTypes.string.isRequired,
      artworkUrl100: PropTypes.string.isRequired,
      collectionName: PropTypes.string.isRequired,
    }),
  ).isRequired,

};
export default ArtisticCard;
