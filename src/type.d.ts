interface AllTodosData {
  allTodos: {
    data: ITodo[];
  };
}

interface TodoByTitleData {
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
}
