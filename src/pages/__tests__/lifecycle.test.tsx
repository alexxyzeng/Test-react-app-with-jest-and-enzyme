import React from 'react';
import { shallow } from 'enzyme';

const orderCallback = jest.fn();

interface LifecycleState {
  currentLifeCycle: string;
}

class Lifecycle extends React.Component<any, LifecycleState> {
  static getDerivedStateFromProps() {
    orderCallback('getDerivedStateFromProps');
    return { currentLifeCycle: 'getDerivedStateFromProps' };
  }

  constructor(props: any) {
    super(props);
    this.state = { currentLifeCycle: 'constructor' };
    orderCallback('constructor');
  }

  componentDidMount() {
    orderCallback('componentDidMount');
    this.setState({
      currentLifeCycle: 'componentDidMount',
    });
  }

  componentDidUpdate() {
    orderCallback('componentDidUpdate');
  }

  render() {
    orderCallback('render');
    return <div>{this.state.currentLifeCycle}</div>;
  }
}

describe('React Lifecycle', () => {
  beforeEach(() => {
    orderCallback.mockReset();
  });

  it('renders in correct order', () => {
    const _ = shallow(<Lifecycle />);

    expect(orderCallback.mock.calls[0][0]).toBe('constructor');
    expect(orderCallback.mock.calls[1][0]).toBe('getDerivedStateFromProps');
    expect(orderCallback.mock.calls[2][0]).toBe('render');
    expect(orderCallback.mock.calls[3][0]).toBe('componentDidMount');
    expect(orderCallback.mock.calls.length).toBe(7);
  });

  it('detect lify cycle methods', () => {
    const _ = shallow(<Lifecycle />);
    expect(Lifecycle.getDerivedStateFromProps.call.length).toBe(1);
    expect(Lifecycle.prototype.render.call.length).toBe(1);
    expect(Lifecycle.prototype.componentDidMount.call.length).toBe(1);
    jest.spyOn(Lifecycle.prototype, 'componentDidUpdate');
    expect(Lifecycle.prototype.componentDidUpdate.call.length).toBe(1);
  });
});
