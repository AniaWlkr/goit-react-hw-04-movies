import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styles from './MoviesList.module.css';

const MoviesList = ({ movies, location }) => {
  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, name }) => (
        <li key={id}>
          <NavLink
            to={{
              pathname: `movies/${id}`,
              state: { from: location },
            }}
          >
            {title || name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default withRouter(MoviesList);
