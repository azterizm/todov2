import { ApolloError } from '@apollo/client';
import React, { FC } from 'react';

interface ErrorFallbackProps {
  error: TErrorFallback;
}

type TErrorFallback = ApolloError | undefined;

export const ErrorFallback: FC<ErrorFallbackProps> = ({ error }) => {
  console.log(error);
  return <h3>{error?.message || 'Unexpected behaviour occured.'}</h3>;
};
