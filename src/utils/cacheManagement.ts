import { ApolloCache } from '@apollo/client';
import { ALL_LISTS, ALL_TODOS } from '../gql';

export const listCacheManagment = (
  cache: ApolloCache<DeleteListData>,
  data: DeleteListData | null | undefined
) => {
  const allListsData: AllListsData | null = cache.readQuery({ query: ALL_LISTS });
  const listTarget: IList | undefined = allListsData?.allLists.data?.find(
    (list: IList) => list._id === data?.deleteList._id
  );

  const allTodosData: AllTodosData | null = cache.readQuery({ query: ALL_TODOS });
  const todoTarget: ITodo | undefined = allTodosData?.allTodos.data.find(
    (todo: ITodo) => todo.list?._id === data?.deleteList._id
  );

  cache.writeQuery({
    query: ALL_LISTS,
    data: {
      allLists: {
        data: [
          ...allListsData?.allLists.data?.filter((list: IList) => list._id !== listTarget?._id)
        ]
      }
    }
  });

  cache.writeQuery({
    query: ALL_TODOS,
    data: {
      allTodos: {
        data: [
          ...allTodosData?.allTodos.data.filter((todo: ITodo) => todo._id !== todoTarget?._id),
          {
            _id: todoTarget?._id,
            title: todoTarget?.title,
            completed: todoTarget?.completed
          }
        ]
      }
    }
  });
};

export const updateTodoCacheManagment = (
  cache: ApolloCache<UpdateTodoData>,
  data: UpdateTodoData | null | undefined
) => {
  //no list assigned
  if (typeof data?.updateTodo.list === 'undefined') {
    const todoQuery: AllTodosData | null = cache.readQuery({ query: ALL_TODOS });
    cache.writeQuery({
      query: ALL_TODOS,
      data: {
        allTodos: {
          data: [
            ...todoQuery?.allTodos.data.filter((todo: ITodo) => todo._id !== data?.updateTodo._id),
            {
              _id: data?.updateTodo._id,
              title: data?.updateTodo.title,
              completed: data?.updateTodo.completed
            }
          ]
        }
      }
    });
  }

  const listQuery: AllListsData | null = cache.readQuery({ query: ALL_LISTS });
  const listContains: IList | undefined = listQuery?.allLists.data?.find(
    (list: IList) => list._id === data?.updateTodo.list?._id
  );

  //create new list
  if (!listContains) {
    cache.writeQuery({
      query: ALL_LISTS,
      data: {
        allLists: {
          data: [
            ...listQuery?.allLists.data,
            {
              ...data?.updateTodo.list,
              todos: {
                __typename: 'TodoPage',
                data: [{ ...data?.updateTodo }]
              }
            }
          ]
        }
      }
    });
  }

  //assign a list
  if (listContains) {
    const todoQuery: AllTodosData | null = cache.readQuery({ query: ALL_TODOS });
    const targetList: IList | null = listContains;
    const targetTodo: ITodo | undefined = todoQuery?.allTodos.data.find(
      (todo: ITodo) => todo._id === data?.updateTodo._id
    );
    cache.writeQuery({
      query: ALL_LISTS,
      data: {
        allLists: {
          data: [
            ...listQuery?.allLists.data?.filter(
              (list: IList) => list._id !== data?.updateTodo.list?._id
            ),
            {
              ...targetList,
              todos: {
                __typename: 'TodoPage',
                data: [...targetList?.todos?.data, targetTodo]
              }
            }
          ]
        }
      }
    });
  }
};
