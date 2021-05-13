import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from '../../components/Loader';

const SearchMovie = lazy(() =>
  import('../../components/SearchMovie' /* webpackChunkName: "home-page" */),
);
const MovieDetailsPage = lazy(() =>
  import('../MovieDetailsPage' /* webpackChunkName: "home-page" */),
);

const MoviesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/movies" component={SearchMovie} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
      </Switch>
    </Suspense>
  );
};

export default MoviesPage;
