import { useMutation, useQuery } from '@apollo/client';
import React, { FC, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ErrorFallback } from '../components/ErrorFallback';
import { Form } from '../components/Form';
import { TODO_BY_TITLE, UPDATE_TODO } from '../gql';
import UpdateTodoLoader from '../loaders/UpdateTodoLoader';

export const UpdateTodo: FC = () => {
  const { id }: { id: string } = useParams();
  const history = useHistory();

  const { data, loading, error } = useQuery<TodoByTitleData>(TODO_BY_TITLE, {
    variables: { id }
  });
  const [updateTodo] = useMutation<UpdateTodoData>(UPDATE_TODO, {
    onCompleted: () => history.push('/')
  });

  const handleSubmit = () => {
    updateTodo({ variables: { id, title, completed: false } });
  };

  const [title, setTitle] = useState<string>('');

  return (
    <>
      {loading && <UpdateTodoLoader />}
      {error && <ErrorFallback error={error} />}
      <h1>{data?.findTodoByID.title}</h1>
      <Form
        title={title}
        setTitle={setTitle}
        handleSubmit={handleSubmit}
        placeholder="Update todo...?"
      />
    </>
  );
};
