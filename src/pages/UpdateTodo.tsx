import { DocumentNode, useMutation, useQuery } from '@apollo/client';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ErrorFallback } from '../components/ErrorFallback';
import { FormInput } from '../components/Form';
import { ListInput } from '../components/ListInput';
import {
  TODO_BY_ID,
  UPDATE_TODO,
  UPDATE_TODO_WITH_CREATE_LIST,
  UPDATE_TODO_WITH_LIST,
  UPDATE_TODO_WITH_NO_LIST
} from '../gql';
import { updateTodoCacheManagment } from '../utils/cacheManagement';

export const UpdateTodo: FC = () => {
  const [title, setTitle] = useState<string>('');
  const [listTitle, setListTitle] = useState<string>('');
  const [listID, setListID] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const userID: string = useSelector((state: { user: IUser }) => state.user._id);

  const todoMutation: DocumentNode =
    listID === '' && listTitle === ''
      ? UPDATE_TODO_WITH_NO_LIST
      : listTitle
        ? UPDATE_TODO_WITH_CREATE_LIST
        : listID
          ? UPDATE_TODO_WITH_LIST
          : UPDATE_TODO;


  const { data: todoData, loading: todoLoading, error: todoError } = useQuery<TodoByIDData>(
    TODO_BY_ID,
    {
      variables: { id }
    }
  );

  const [updateTodo, { loading: updateLoading }] = useMutation<UpdateTodoData>(todoMutation, {
    onCompleted: () => history.push('/'),
    update: (cache, { data }) => {
      updateTodoCacheManagment(cache, data);
    }
  });

  useEffect(() => {
    if (todoData?.findTodoByID.list) {
      setListID(todoData.findTodoByID.list._id);
    }
  }, [id, todoData]);

  const handleSubmit = (): void => {
    const updateTitle: string | undefined = title || todoData?.findTodoByID.title;
    updateTodo({
      variables: {
        id,
        title: updateTitle,
        completed: false,
        listID,
        listTitle,
        userID,
        date: date ? new Date(date).toISOString() : null
      },
      optimisticResponse: {
        updateTodo: {
          _id: id,
          title: updateTitle as any,
          completed: false,
          date: date ? new Date(date).toISOString() : null as any,
          list: {
            _id: listID,
            title: listTitle
          }
        }
      }
    });
  };

  const currentName: ReactElement = (
    <p style={{ color: '#ff6a6a', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>
      Current name:{' '}
      <span style={{ color: '#6d6dff', margin: 0 }}>{todoData?.findTodoByID.title}</span>
      {todoLoading && <Skeleton width={173} height={16} />}
    </p>
  );

  return (
    <>
      {todoError && <ErrorFallback error={todoError} />}
      {currentName}
      <FormInput value={title} setValue={setTitle} placeholder="What did you think...?" />
      {listID === 'CREATE_LIST' ? (
        <FormInput
          value={listTitle}
          setValue={setListTitle}
          label="List name: "
          placeholder="Name the very new list..."
        />
      ) : (
          <ListInput ID={listID} setID={setListID}>
            <option value={'CREATE_LIST'}>Create a new list...</option>
          </ListInput>
        )}
      <FormInput
        value={date}
        setValue={setDate}
        placeholder="You can leave me or change me"
        label="Date"
        type="datetime-local"
      />
      <button onClick={handleSubmit} disabled={updateLoading}>
        {updateLoading ? 'Updating...' : 'Update'}
      </button>
    </>
  );
};
