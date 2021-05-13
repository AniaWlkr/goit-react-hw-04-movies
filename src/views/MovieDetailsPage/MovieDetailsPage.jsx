import React, { Component, Suspense, lazy } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import apiService from '../../services/api-service';
import noImage from '../../images/noimage.jpg';
import styles from './MovieDetailsPage.module.css';
import routes from '../../components/routes';
import Loader from '../../components/Loader';

const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "home-page" */),
);
const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "home-page" */),
);

class MovieDetailsPage extends Component {
  state = {
    poster_path: null,
    title: null,
    vote_average: null,
    overview: null,
    genres: null,
    from: null,
  };

  componentDidMount() {
    const location = this.props.location.state.from;
    const { movieId } = this.props.match.params;

    apiService.getMovieDetails(movieId).then(data =>
      this.setState({
        poster_path: data.poster_path || data.backdrop_path,
        title:
          data.title || data.name || data.original_title || data.original_name,
        vote_average: `${data.vote_average * 10}%` || 'no votes',
        overview: data.overview,
        genres: data.genres,
        from: location,
      }),
    );
  }

  handleBackBtnClick = () => {
    const { history } = this.props;

    history.push(this.state.from || routes.home);
  };

  render() {
    const { poster_path, title, vote_average, overview, genres } = this.state;
    const { match } = this.props;

    return (
      <div className={styles.section}>
        <button
          type="button"
          className={styles.button}
          onClick={this.handleBackBtnClick}
        >
          <span role="img" aria-label="arrow left">
            ←
          </span>
          Go back
        </button>
        <div className={styles.movieThumb}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : noImage
            }
            alt={title}
            className={styles.poster}
          />
          <div className={styles.movieInfo}>
            <h2>{title}</h2>
            <p className={styles.userScore}>User score: {vote_average}</p>
            <h3 className={styles.subtitle}>Overview</h3>
            <p className={styles.overview}>{overview}</p>
            <h3 className={styles.subtitle}>Genres</h3>
            <ul className={styles.genres}>
              {genres ? (
                genres.map(genre => (
                  <li key={genre.id} className={styles.genreItem}>
                    {genre.name}
                  </li>
                ))
              ) : (
                <li key="not determined" className={styles.genreItem}>
                  Not determined
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className={styles.addInfo}>
          <h3>Additional information: </h3>
          <ul className={styles.addInfoList}>
            <li key="cast">
              <NavLink
                to={`${match.url}/cast`}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Cast
              </NavLink>
            </li>
            <li key="reviews">
              <NavLink
                to={`${match.url}/reviews`}
                className={styles.link}
                activeClassName={styles.activeLink}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route
              path={`${match.path}/cast`}
              render={props => <Cast {...props} />}
            />
            <Route
              path={`${match.path}/reviews`}
              render={props => <Reviews {...props} />}
            />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default MovieDetailsPage;
