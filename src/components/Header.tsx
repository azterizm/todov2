import React, { FC } from 'react';
import { NavItem } from '../components/NavItem';

export const Header: FC = () => {
  return (
    <ul>
      <NavItem link="/" name="Home" />
      <NavItem link="/add" name="Add Entry" />
    </ul>
  );
};
