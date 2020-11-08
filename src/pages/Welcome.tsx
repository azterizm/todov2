import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Welcome: FC = () => {
  return (
    <div className="Welcome">
      <h1>Modern Stack Todo App</h1>
      <p>
        This is probably a normal todo app but this project aimed to make use of the most of best
        practices. <br />
        Go ahead <strong>Login</strong> to get started!
      </p>
      <Link to="/login" style={{ textDecoration: 'none', color: '#6d6def' }}>
        Login
      </Link>
    </div>
  );
};
