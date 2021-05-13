import React, { Component } from 'react';
import apiService from '../../services/api-service';
import styles from './Reviews.module.css';

class Reviews extends Component {
  state = {
    reviews: [],
  };

  componentDidMount() {
    const movieId = Number(this.props.match.params.movieId);

    apiService
      .getMovieReviews(movieId)
      .then(data => this.setState({ reviews: data.results }));
  }

  render() {
    const { reviews } = this.state;

    return (
      <div className={styles.section}>
        {reviews && reviews.length > 0 ? (
          <ul className={styles.list}>
            {reviews.map(({ id, author, content }) => (
              <li key={id}>
                <p className={styles.author}>Author: {author}</p>
                <p className={styles.content}>{content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <h2>We don't have any review for this movie</h2>
        )}
      </div>
    );
  }
}

export default Reviews;
