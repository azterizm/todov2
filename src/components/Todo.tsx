import React, { FC, ReactElement, useState } from 'react';
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

export const Todo: FC<TodoProps> = ({ _id, title, completed, user, list, date, index }) => {
  const [completedState, setCompletedState] = useState<boolean>(completed);
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
            data: [...queryData?.allTodos.data.filter((todo: ITodo) => todo._id !== target?._id) as any]
          }
        }
      });
    }
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state: { user: IUser }) => state.user);

  if (!reduxUser) {
    dispatch(addUser(user));
  }

  console.log('redux', reduxUser)

  const handleComplete = (): void => {
    setCompletedState(e => !e)
    completeTodo({ variables: { id: _id, title, completed: !completed } });
  };

  const handleDelete = (): void => {
    deleteTodo({ variables: { id: _id } });
  };

  const handleUpdate = (): void => {
    history.push(`/update/${_id}`);
  };

  const doneElem: ReactElement = <img src={checkIcon} alt="Complete" />;
  const pendingElem: ReactElement = <img src={recIcon} alt="Uncomplete" />;
  const editElem: ReactElement = <img src={editIcon} alt="edit" />;
  const deleteElem: ReactElement = <img src={trashIcon} alt="trash" />;

  const todoDate: Date = new Date(date ?? '');
  const dateData: string = todoDate.toDateString();
  const dateRender: string = dateData.substring(0, dateData.length - 5);
  const timeData: string = todoDate.toLocaleTimeString();
  const timeRender: string = [timeData.substring(0, 4), timeData.substring(8)].join(' ');

  return (
    <div className="todo">
      <h1 style={{ marginBottom: list ? 0 : '' }}>
        {index}. {title}
        <span data-testid='completeTodo' onClick={handleComplete}>{completedState ? doneElem : pendingElem}</span>
        <span data-testid='updateTodo' onClick={handleUpdate}>{editElem}</span>
        <span data-testid='deleteTodo' onClick={handleDelete}>{deleteElem}</span>
      </h1>
      {date && (
        <div className="date">
          <p>{dateRender}</p>
          <p>{timeRender}</p>
        </div>
      )}
      <p>{list?.title}</p>
      <hr />
    </div>
  );
};
