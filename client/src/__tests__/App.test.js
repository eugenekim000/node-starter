import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as useGetData from '../hooks/useGetData';

const waitForAsync = () => new Promise((resolve) => setImmediate(resolve));
Enzyme.configure({ adapter: new Adapter() });

jest.mock('../hooks/useGetData');
const mockedHook = useGetData;

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
    mockedHook.default.mockImplementation(() => [{}, true]);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/courses/2']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.text()).toEqual('Loading');
  });

  it('should sucessfully render data and toggle clicks', async () => {
    let mockLoading = false;
    let mockCourse = {
      id: 1,
      title: 'React: The Big Picture',
      tags: 'front-end-web-development',
    };

    mockedHook.default.mockImplementation(() => [mockCourse, mockLoading]);

    const component = mount(
      <MemoryRouter initialEntries={['/courses/2']}>
        <App />
      </MemoryRouter>
    );

    let children = component.find('.course ul').children().length;
    expect(children).toEqual(3);

    let tagLi = component.find('.tag-li');
    tagLi.simulate('click');
    let tagContainer = component.find('.tags-container');
    expect(tagContainer.text()).toEqual('front-end-web-development');
  });
});
