import React, { Component } from 'react';
import PropTypes from 'prop-types';
import apiService from '../../services/api-service';
import MoviesList from '../../components/MoviesList';
import styles from './SearchMovie.module.css';
import queryString from 'query-string';

class SearchBar extends Component {
  state = {
    query: '',
    movies: [],
  };

  getQueryFromProps = props => queryString.parse(props.location.search).query;

  componentDidMount() {
    const query = this.getQueryFromProps(this.props);
    if (query) {
      this.searchMovies(query);
    }
  }

  componentDidUpdate(prevProps) {
    const prevQuery = this.getQueryFromProps(prevProps);
    const newQuery = this.getQueryFromProps(this.props);

    if (prevQuery !== newQuery) {
      this.searchMovies(newQuery);
    }
  }

  handleChange = event => {
    this.setState({
      query: event.currentTarget.value,
    });
  };

  searchMovies = query => {
    apiService.getMoviesByName(query).then(data => {
      this.setState({ movies: data.results });
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const searchQuery = this.state.query.trim();
    if (!searchQuery) return;

    this.props.history.push({
      search: `query=${searchQuery}`,
    });

    this.searchMovies(searchQuery);
    this.setState({ query: '' });
  };

  render() {
    const { query, movies } = this.state;

    return (
      <div className={styles.section}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={this.handleChange}
            className={styles.input}
          ></input>
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
        <MoviesList movies={movies} />
      </div>
    );
  }
}

SearchBar.propTypes = {};

export default SearchBar;
