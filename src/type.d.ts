interface TodosData {
  allTodos: {
    data: ITodo[];
  };
}

interface ITodo {
  _id: string;
  title: string;
  completed: boolean;
}

interface IUpdateTodo {
  updateTodo: ITodo;
}
