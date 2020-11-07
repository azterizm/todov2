import { useMutation, useQuery } from '@apollo/client';
import React, { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useHistory, useParams } from 'react-router-dom';
import { ErrorFallback } from '../components/ErrorFallback';
import { FormInput } from '../components/Form';
import { TODO_BY_ID, UPDATE_TODO } from '../gql';

export const UpdateTodo: FC = () => {
  const [title, setTitle] = useState<string>('');
  const { id }: { id: string } = useParams();
  const history = useHistory();

  const { data, loading, error } = useQuery<TodoByIDData>(TODO_BY_ID, {
    variables: { id }
  });

  const [updateTodo] = useMutation<UpdateTodoData>(UPDATE_TODO, {
    onCompleted: () => history.push('/')
  });

  const handleSubmit = () => {
    updateTodo({ variables: { id, title, completed: false } });
  };

  return (
    <>
      {error && <ErrorFallback error={error} />}
      <p style={{ color: '#ff6a6a', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>
        Current name:{' '}
        <span style={{ color: '#6d6dff', margin: 0 }}>{data?.findTodoByID.title}</span>
        {loading && <Skeleton width={173} height={16} />}
      </p>
      <FormInput
        value={title}
        setValue={setTitle}
        handleSubmit={handleSubmit}
        placeholder="What did you think...?"
        submitName="Update"
      />
    </>
  );
};
