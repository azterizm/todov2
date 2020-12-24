import { ApolloError } from '@apollo/client';
import React, { FC } from 'react';

interface ErrorFallbackProps {
  error: TErrorFallback | string;
  [x: string]: any;
}

type TErrorFallback = ApolloError | undefined;

export const ErrorFallback: FC<ErrorFallbackProps> = ({ error, ...props }) => {
  if (process.env.NODE_ENV === 'development') console.log(error);
  if (typeof error === 'string') return <h3 {...props}>{error}</h3>;
  return <h3 {...props}>Error occured: {error?.message || 'Unexpected behaviour occured.'}</h3>;
};
