import React from 'react';
import { mount } from 'enzyme';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

class Demo extends React.Component<FormComponentProps> {
  reset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  onSubmit = () => {
    const { form } = this.props;
    form.resetFields();
    //  提交操作
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Item>{getFieldDecorator('input', { initialValue: '' })(<Input />)}</Form.Item>
        <Form.Item>
          {getFieldDecorator('textarea', { initialValue: '' })(<Input.TextArea />)}
        </Form.Item>
        <button type="button" onClick={this.reset}>
          reset
        </button>
        <button type="submit">submit</button>
      </Form>
    );
  }
}

const FormDemo = Form.create()(Demo);
describe('<FormDemo />', () => {
  it('click to reset', () => {
    const wrapper = mount(<FormDemo />);
    wrapper.find('input').simulate('change', { target: { value: '111' } });
    wrapper.find('textarea').simulate('change', { target: { value: '222' } });
    expect(wrapper.find('input').prop('value')).toBe('111');
    expect(wrapper.find('textarea').prop('value')).toBe('222');
    wrapper.find('button[type="button"]').simulate('click');
    expect(wrapper.find('input').prop('value')).toBe('');
    expect(wrapper.find('textarea').prop('value')).toBe('');
  });
  it('click to submit', () => {
    const wrapper = mount(<FormDemo />);
    wrapper.find('input').simulate('change', { target: { value: '111' } });
    wrapper.find('textarea').simulate('change', { target: { value: '222' } });
    expect(wrapper.find('input').prop('value')).toBe('111');
    expect(wrapper.find('textarea').prop('value')).toBe('222');
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('input').prop('value')).toBe('');
    expect(wrapper.find('textarea').prop('value')).toBe('');
  });
});

const searchText = 'mock search text';
const Search = Input.Search;
describe('antd custom event test', () => {
  it('test search event', () => {
    const mockSearch = jest.fn();
    const wrapper = mount(
      <div>
        <Search onSearch={mockSearch} />
      </div>,
    );
    const onSearch = wrapper.find(Search).props().onSearch;
    if (onSearch !== undefined) {
      onSearch(searchText);
      expect(mockSearch).toBeCalledWith(searchText);
    } else {
      expect(mockSearch).not.toBeCalled();
    }
  });
});
