import * as React from 'react';

import { connect } from 'dva';
import { todo } from './types';

interface TodoProps {
  removeTodo?: (index: number) => void;
  addTodo?: (text: string) => void;
  todos: Array<todo>;
}

interface TodoState {
  input: string;
}

class TodoList extends React.Component<TodoProps, TodoState> {
  constructor(props: TodoProps) {
    super(props);
    this.state = { input: '' };
  }

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value });
  };

  onTodoClick = (index: number) => () => {
    const { removeTodo } = this.props;
    if (removeTodo === undefined) {
      return;
    }
    removeTodo(index);
  };

  onTodoSubmit = () => {
    const { addTodo } = this.props;
    const { input } = this.state;
    if (addTodo === undefined) {
      return;
    }
    addTodo(input);
    this.setState({ input: '' });
  };

  render() {
    const { input } = this.state;
    const { todos } = this.props;
    return (
      <div className="todo-container">
        <h1>Todos</h1>
        <input type="text" onChange={this.onInputChange} value={input} />
        {
          <ul>
            {todos.map(({ text }, index) => {
              return (
                <li key={index} onClick={this.onTodoClick(index)}>
                  {text}
                </li>
              );
            })}
          </ul>
        }
        <button className="todo-add" onClick={this.onTodoSubmit}>
          Add Todo
        </button>
      </div>
    );
  }
}

// const mapStateProps = ({})
interface StoreState {
  todos: {
    todoList: [todo];
  };
}
const mapStateToProps = ({ todos }: StoreState) => {
  const { todoList } = todos;
  return {
    todos: todoList,
  };
};

const ADD_TODO = 'todos/addTodo';
const REMOVE_TODO = 'todos/removeTodo';

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    addTodo: (text: string) => dispatch({ type: ADD_TODO, payload: { text } }),
    removeTodo: (index: number) => dispatch({ type: REMOVE_TODO, payload: { index } }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);

export { TodoList };
