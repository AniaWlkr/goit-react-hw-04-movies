import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationBar.module.css';
import routes from '../routes';

const NavigationBar = () => {
  return (
    <div className={styles.section}>
      <ul className={styles.navBar}>
        <li className={styles.navItem}>
          <NavLink
            exact
            to={routes.home}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to={routes.movies}
            className={styles.link}
            activeClassName={styles.activeLink}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
