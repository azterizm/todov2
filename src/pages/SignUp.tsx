import { useMutation } from '@apollo/client';
import React, { FC, KeyboardEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ErrorFallback } from '../components/ErrorFallback';
import { FormInput } from '../components/Form';
import { Loading } from '../components/Loading';
import { CREATE_USER } from '../gql';
import { addUser } from '../state/userSlice';
import { emailReg } from '../utils/todosCounter';

export const SignUp: FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');
  const [signUp, { error, loading }] = useMutation<CreateUserData>(CREATE_USER, {
    onCompleted: data => {
      dispatch(addUser(data.createUser));
      history.push('/login');
    }
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (): void => {
    !name || !password || !email
      ? setInputError('Please complete all input fields')
      : !email.match(emailReg)
      ? setInputError('Email is not valid.')
      : error
      ? setInputError(error.message + ' Try to login or refresh the page to continue.')
      : signUp({ variables: { name, email: email, password: password } });
  };

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') return;
    handleSubmit();
  };

  return (
    <div className="auth">
      <h1>Let's create an Account.</h1>
      <div className="input">
        <FormInput
          value={name}
          setValue={setName}
          label="Username"
          placeholder="Enter your name..."
        />
        <FormInput value={email} setValue={setEmail} label="Email" placeholder="Email Address" />
        <FormInput
          type="password"
          value={password}
          setValue={setPassword}
          label="Password"
          placeholder="Password"
          onKeyPress={handleEnterKey}
        />
      </div>
      <button onClick={handleSubmit}>Sign Up</button>
      <Link to="/login">Go back</Link>
      {inputError && <ErrorFallback error={inputError ?? error} />}
      {loading && <Loading />}
    </div>
  );
};
