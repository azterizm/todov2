import { useQuery } from '@apollo/client';
import React from 'react';
import { ALL_TODOS } from './../gql';
import { Todo } from './../components/Todo';
import { ErrorFallback } from '../components/ErrorFallback';
import AllTodosLoader from '../loaders/AllTodosLoader';

export const AllTodos = () => {
  const { loading, error, data } = useQuery<AllTodosData>(ALL_TODOS);

  if (loading) return <AllTodosLoader />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <>
      {data?.allTodos.data.map(({ _id, title, completed }: ITodo, index: number) => (
        <Todo key={_id} _id={_id} title={title} completed={completed} index={index + 1} />
      ))}
    </>
  );
};
