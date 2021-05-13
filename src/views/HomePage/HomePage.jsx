import React, { Component } from 'react';
import apiService from '../../services/api-service';
import MoviesList from '../../components/MoviesList';
import styles from './HomePage.module.css';

class HomePage extends Component {
  state = {
    movies: [],
  };
  componentDidMount() {
    apiService
      .getTrendingMovies()
      .then(data => this.setState({ movies: data.results }));
  }

  render() {
    return (
      <div className={styles.section}>
        <h1>Trending today</h1>
        <MoviesList movies={this.state.movies} />
      </div>
    );
  }
}

export default HomePage;
