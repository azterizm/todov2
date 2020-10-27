import { useQuery } from '@apollo/client';
import React from 'react';
import { ALL_TODOS } from './../gql';
import { Todo } from './../components/Todo';

export const AllTodos = () => {
  const { loading, error, data } = useQuery<TodosData>(ALL_TODOS);

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log(error);
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {data?.allTodos.data.map(({ _id, title, completed }: ITodo, index: number) => (
        <Todo key={_id} _id={_id} title={title} completed={completed} index={index + 1} />
      ))}
    </>
  );
};
