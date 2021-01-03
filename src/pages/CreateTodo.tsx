import { ListInput } from '../components/ListInput';
import { useMutation } from '@apollo/client';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ErrorFallback } from '../components/ErrorFallback';
import { FormInput } from '../components/Form';
import { ALL_TODOS, CREATE_TODO, CREATE_TODO_WITH_LIST } from '../gql';

export const CreateTodo: FC = () => {
  const [title, setTitle] = useState<string>('');
  const [listID, setListID] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const history = useHistory();
  const user: IUser | null = useSelector((state: { user: IUser }) => state.user);

  const [addTodo, { loading, error }] = useMutation<CreateTodoData>(
    listID ? CREATE_TODO_WITH_LIST : CREATE_TODO,
    {
      onCompleted: () => history.push('/'),
      update: (cache, { data }) => {
        const queryData: AllTodosData | null = cache.readQuery({ query: ALL_TODOS });
        cache.writeQuery({
          query: ALL_TODOS,
          data: {
            allTodos: {
              data: [...queryData?.allTodos.data, data?.createTodo]
            }
          }
        });
      }
    }
  );

  const handleSubmit = () => {
    const dateVar: string | null = date ? new Date(date).toISOString() : null;
    addTodo({
      variables: { title, completed: false, date: dateVar, userID: user._id, listID },
      optimisticResponse: {
        createTodo: {
          _id: '1',
          title,
          completed: false,
          date: dateVar as any,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email
          }
        }
      }
    });
  };

  return (
    <div className="createTodo">
      <div className="input">
        <FormInput value={title} setValue={setTitle} label="Todo" placeholder="What todo...?" />
        <ListInput ID={listID} setID={setListID} />
        <FormInput
          value={date}
          setValue={setDate}
          label="Date"
          placeholder="When will that be...?"
          type="datetime-local"
        />
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Adding Todo...' : 'Add Todo'}
      </button>
      {error && <ErrorFallback error={error} />}
    </div>
  );
};
