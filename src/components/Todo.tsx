import React, { FC, ReactElement } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_TODOS, UPDATE_TODO, DELETE_TODO } from '../gql';
import recIcon from '../assets/rec.png';
import checkIcon from '../assets/check.png';
import trashIcon from '../assets/trash.png';
import editIcon from '../assets/edit.png';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../state/userSlice';

interface TodoProps extends ITodo {
  index: number;
}

export const Todo: FC<TodoProps> = ({ _id, title, completed, user, list, index }) => {
  const [completeTodo] = useMutation<UpdateTodoData>(UPDATE_TODO);
  const [deleteTodo] = useMutation<DeleteTodoData>(DELETE_TODO, {
    update: (cache, { data }) => {
      const queryData: AllTodosData | null = cache.readQuery({ query: ALL_TODOS });
      const target: ITodo | undefined = queryData?.allTodos.data.find(
        (todo: ITodo) => todo._id === data?.deleteTodo._id
      );
      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          allTodos: {
            data: [...queryData?.allTodos.data.filter((todo: ITodo) => todo._id !== target?._id)]
          }
        }
      });
    }
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state: { user: IUser }) => state.user);

  if (!reduxUser._id) {
    dispatch(addUser(user));
  }

  const handleComplete = (): void => {
    completeTodo({ variables: { id: _id, title, completed: !completed } });
  };

  const handleDelete = (): void => {
    deleteTodo({ variables: { id: _id } });
  };

  const handleUpdate = (): void => {
    history.push(`/update/${_id}`);
  };

  const done: ReactElement = <img src={checkIcon} alt="" />;
  const pending: ReactElement = <img src={recIcon} alt="" />;
  const edit: ReactElement = <img src={editIcon} alt="" />;

  return (
    <div className="todo">
      <h1 style={{ marginBottom: list ? 0 : '' }}>
        {index}. {title}
        <span onClick={handleComplete}>{completed ? done : pending}</span>
        <span onClick={handleUpdate}>{edit}</span>
        <span onClick={handleDelete}>
          <img src={trashIcon} alt="" />
        </span>
      </h1>
      <p>{list?.title}</p>
      <hr />
    </div>
  );
};
