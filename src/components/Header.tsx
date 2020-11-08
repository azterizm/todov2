import React, { FC } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { NavItem } from '../components/NavItem';

export const Header: FC = () => {
  const history = useHistory();
  const key = localStorage.getItem('token');

  const handleLogout = (): void => {
    if (!key) return;
    localStorage.removeItem('token');
    localStorage.clear();
    history.push('/login');
  };

  return (
    <ul>
      {key ? (
        <>
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/add">
              Add Entry
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/lists">
              Lists
            </NavLink>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </>
      ) : (
        <NavItem link="/login" name="Login" />
      )}
    </ul>
  );
};
