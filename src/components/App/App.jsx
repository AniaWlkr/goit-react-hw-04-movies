import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import AppBar from '../AppBar';
import Loader from '../Loader';
import PageNotFound from '../../views/PageNotFound';
import routes from '../routes';

const HomePage = lazy(() =>
  import('../../views/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('../../views/MoviesPage' /* webpackChunkName: "movies-page" */),
);

function App() {
  return (
    <div className={styles.container}>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route path={routes.movies} component={MoviesPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
