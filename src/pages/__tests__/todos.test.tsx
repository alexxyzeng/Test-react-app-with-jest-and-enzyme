import React from 'react';
import 'jest';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { TodoList } from '../todoDemo';
import { todo } from '../todoDemo/types';

configure({ adapter: new Adapter() });

describe('<TodoList />', () => {
  it('matches snapshot', () => {
    const todos: Array<todo> = [];
    const wrapper = shallow(<TodoList todos={todos} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('calls setState after input change', () => {
    const wrapper = shallow(<TodoList todos={[]} />);
    wrapper.find('input').simulate('change', { target: { value: 'Add Todo' } });
    expect(wrapper.state('input')).toEqual('Add Todo');
  });
  it('calls addTodo with submit button click', () => {
    const addTodo = jest.fn();
    const todos: Array<todo> = [];
    const wrapper = shallow(<TodoList todos={todos} addTodo={addTodo} />);
    wrapper.find('input').simulate('change', { target: { value: 'Add Todo' } });
    wrapper.find('.todo-add').simulate('click');
    expect(addTodo).toHaveBeenCalledWith('Add Todo');
  });
  it('calls removeTodo with todo item click', () => {
    const removeTodo = jest.fn();
    const todos: Array<todo> = [{ text: 'Learn Jest' }, { text: 'Learn RxJS' }];
    const wrapper = shallow(<TodoList todos={todos} removeTodo={removeTodo} />);
    wrapper
      .find('li')
      .at(0)
      .simulate('click');
    expect(removeTodo).toHaveBeenCalledWith(0);
  });
});
