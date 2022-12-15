import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// CARD COM A INFORMAÇÃO DOS ARTISTAS DA API

class ArtisticCard extends React.Component {
  render() {
    const { artisticSearchResult } = this.props;
    return (
      <div>
        {artisticSearchResult
          .map((
            { artistName, artistId, artworkUrl100, collectionId,
              collectionName, collectionPrice,
              releaseDate, trackCount },
            index,
          ) => (
            <div key={ index }>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >

                <img src={ artworkUrl100 } alt={ artistName } />
                <p>{artistId}</p>
                <p>{collectionId}</p>
                <p>{collectionName}</p>
                <p>{collectionPrice}</p>
                <p>{releaseDate}</p>
                <p>{trackCount}</p>
                <p>{artistName}</p>
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
      collectionId: PropTypes.number.isRequired,
      collectionName: PropTypes.string.isRequired,
      collectionPrice: PropTypes.number.isRequired,
      releaseDate: PropTypes.string.isRequired,
      trackCount: PropTypes.number.isRequired,
    }),
  ).isRequired,

};
export default ArtisticCard;
