import { Model } from 'dva';
import { AnyAction } from 'redux';
import { todo } from '../types';

interface State {
  todoList: [todo];
}

const todos: Model = {
  namespace: 'todos',
  state: {
    todoList: [],
  },
  reducers: {
    addTodo(state: State, { payload: { text } }) {
      const { todoList } = state;
      return {
        todoList: [...todoList, { text }],
      };
    },
    removeTodo(state: State, { payload: { index } }) {
      const { todoList } = state;
      return {
        todoList: todoList.filter((_todo, todoIndex) => {
          return todoIndex !== index;
        }),
      };
    },
  },
};

export default todos;
