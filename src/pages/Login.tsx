import { useMutation } from '@apollo/client';
import React, { FC, KeyboardEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FormInput } from '../components/Form';
import { LOGIN_USER } from '../gql';

export const Login: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginUser, { error }] = useMutation<LoginUserData>(LOGIN_USER, {
    variables: { email, password },
    onCompleted: ({ loginUser }) => {
      localStorage.setItem('token', loginUser);
      history.push('/');
    }
  });

  const history = useHistory();

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleSubmit = (): void => {
    if (!email || !password) return;
    loginUser();
  };

  const userName: string | null = useSelector((state: { user: IUser }) => state.user.name);

  return (
    <div className="auth">
      {userName && <h3>Hey, {userName}! Login with your given credentials.</h3>}
      <div id="input">
        <div className="email">
          <FormInput
            value={email}
            setValue={setEmail}
            type="email"
            handleEnterKey={false}
            placeholder="Enter your email..."
            label="Email"
            style={{ borderColor: error ? 'red' : 'black' }}
          />
        </div>
        <div className="password">
          <FormInput
            value={password}
            setValue={setPassword}
            type="password"
            placeholder="and its password."
            label="Password"
            style={{ borderColor: error ? 'red' : 'black' }}
            onKeyPress={handleEnterKey}
          />
        </div>
      </div>
      <button onClick={handleSubmit}>Login</button>
      <Link to="/signup">Create an account?</Link>
      {error && <h1 className="loginError">User not found or the password is incorrect.</h1>}
    </div>
  );
};
