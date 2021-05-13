import React, { Component } from 'react';
import apiService from '../../services/api-service';
import styles from './Cast.module.css';
import noActor from '../../images/noactor.jpeg';

class Cast extends Component {
  state = {
    casts: [],
  };

  componentDidMount() {
    const movieId = Number(this.props.match.params.movieId);

    apiService
      .getMovieCredits(movieId)
      .then(data => this.setState({ casts: data.cast }));
  }

  render() {
    const { casts } = this.state;
    return (
      <div className={styles.section}>
        {casts && casts.length > 0 ? (
          <ul>
            {casts.map(({ id, name, profile_path, character }) => (
              <li key={id}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : noActor
                  }
                  alt={name}
                  className={styles.img}
                />
                <h4 className={styles.actorName}>{name}</h4>
                <p className={styles.character}>Character: {character}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h2>We don't have any info on the cast for this movie</h2>
        )}
      </div>
    );
  }
}

export default Cast;
