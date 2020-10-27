import { useMutation } from '@apollo/client';
import React, { FC } from 'react';
import { COMPLETE_TODO } from '../gql';

interface TodoProps {
  _id: string;
  title: string;
  completed: boolean;
  index: number;
}

export const Todo: FC<TodoProps> = ({ _id, title, completed, index }) => {
  const [completeTodo] = useMutation<IUpdateTodo>(COMPLETE_TODO);

  const handleTodo = (): void => {
    completeTodo({ variables: { id: _id, title, completed: true } });
  };

  return (
    <div id={_id}>
      <h1>
        {index}. {title}
      </h1>
      <p onClick={handleTodo}>{completed ? 'DONE' : 'PENDING'}</p>
      <hr />
    </div>
  );
};
