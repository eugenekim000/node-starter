import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Enzyme, { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import useGetData from '../hooks/useGetData';

Enzyme.configure({ adapter: new Adapter() });

const waitForAsync = () => new Promise((resolve) => setImmediate(resolve));

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MemoryRouter>
        <App />{' '}
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render not found for invalid urls', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/McDerp']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.text()).toEqual('not found!');
  });

  it('should render loading while fetching data', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/courses/2']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.text()).toEqual('Loading');
  });

  it('should sucessfully get async data', async () => {
    const component = mount(
      <MemoryRouter initialEntries={['/courses/2']}>
        <App />
      </MemoryRouter>
    );
    expect(component.text()).toEqual('Loading');

    await act(async () => {
      await Promise.resolve(component);
      await new Promise((resolve) => setImmediate(resolve));
      component.update();

      console.log(component.debug());

      expect(component.find('.course').children()).to.have.lengthOf(3);
    });
  });

  // it('should toggle the tag field', async () => {
  //   const component = render(<App />);
  //   const button = component.find('.tag-toggle');
  //   button.simulate('click');
  //   expect(component.find('.tag-container').exists()).toBeTruthy();
  // });
});
