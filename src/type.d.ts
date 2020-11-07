interface LoginUserData {
  loginUser: string;
}

interface CreateUserData {
  createUser: IUser;
}

interface UserQueryData {
  allUsers: {
    data: IUser[];
  };
}

interface AllTodosData {
  allTodos: {
    data: ITodo[];
  };
}

interface TodoByIDData {
  findTodoByID: ITodo;
}

interface CreateTodoData {
  createTodo: ITodo;
}

interface DeleteTodoData {
  deleteTodo: {
    _id: string;
  };
}

interface UpdateTodoData {
  updateTodo: ITodo;
}

interface ITodo {
  _id: string;
  title: string;
  completed: boolean;
  list?: IList;
  user?: IUser;
}

interface IList {
  title: string;
  todos?: {
    data: ITodo[];
  };
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  todos?: {
    data: ITodo[];
  };
}
