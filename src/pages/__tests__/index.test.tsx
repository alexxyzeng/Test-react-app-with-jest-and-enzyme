import 'jest';
import Index from '..';
import React, { useState } from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer, { ReactTestInstance, ReactTestRenderer } from 'react-test-renderer';

configure({ adapter: new Adapter() });

describe('Page: index', () => {
  it('Render correctly', () => {
    const wrapper: ReactTestRenderer = renderer.create(<Index />);
    expect(wrapper.root.children.length).toBe(1);
    const outerLayer = wrapper.root.children[0] as ReactTestInstance;
    expect(outerLayer.type).toBe('div');
    expect(outerLayer.children.length).toBe(2);
  });
});

describe('Page: index', () => {
  it('Render correctly', () => {
    const wrapper = mount(<Index />);
    expect(wrapper.children()).toHaveLength(1);
    const outerLayer = wrapper.childAt(0);
    expect(outerLayer.type()).toBe('div');
    expect(outerLayer.children()).toHaveLength(2);
  });
  it('case of use state', () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.find('#intro').text()).toBe('Welcome to Umi');
    wrapper.find('button').simulate('click');

    expect(wrapper.find('#intro').text()).toBe('Welcome to Jest and Enzyme');
  });
});
