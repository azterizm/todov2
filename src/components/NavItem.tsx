import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  link: string;
  name: string;
}

export const NavItem: FC<NavItemProps> = ({ link, name }) => {
  return (
    <li>
      <Link to={link}>{name || link}</Link>
    </li>
  );
};
