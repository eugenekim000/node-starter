import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import useGetData from './hooks/useGetData';

Enzyme.configure({ adapter: new Adapter() });

const waitForAsync = () => new Promise((resolve) => setImmediate(resolve));

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render loading while fetching data', () => {
    const component = mount(<App />);
    expect(component.text()).toEqual('Loading');
  });

  it('should sucessfully get async data', async () => {
    const component = mount(<App />);
    expect(component.text()).toEqual('Loading');

    await act(async () => {
      await Promise.resolve(component);
      await new Promise((resolve) => setImmediate(resolve));
      component.update();

      console.log(component.debug());

      expect(component.find('.course').children()).to.have.lengthOf(3);
    });
  });

  it('should toggle the tag field', async () => {
    const component = render(<App />);
    const button = component.find('.tag-toggle');
    button.simulate('click');
    expect(component.find('.tag-container').exists()).toBeTruthy();
  });
});
