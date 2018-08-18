import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import renderer from 'react-test-renderer';


const books = [
  {
    'title': 'The Linux Command Line',
    'subtitle': 'A Complete Introduction',
    'authors': [
        'William E. Shotts, Jr.'
    ],
    'imageLinks': {
        'smallThumbnail': 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
        'thumbnail': 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    'id': 'nggnmAEACAAJ',
    'shelf': 'currentlyReading'
  },
  {
    'title': 'The Linux',
    'subtitle': 'Introduction',
    'authors': [
        'Shotts Jr.'
    ],
    'id': 'abcenggnmAEACAAJ',
    'shelf': 'currentlyReading'
  }
]
const onSearch = jest.fn()
const onMoveShelf = jest.fn()

describe('SearchBooks', () => {
  describe('when components renders', () => {
    it('with an empty list books', () => {
      const component = renderer.create(
        <MemoryRouter>
          <SearchBooks
            books={[]}
            onSearch={onSearch}
            onMoveShelf={onMoveShelf}
          />
        </MemoryRouter>
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('with a list books', () => {
      const component = renderer.create(
        <MemoryRouter>
          <SearchBooks
            books={books}
            onSearch={onSearch}
            onMoveShelf={onMoveShelf}
          />
        </MemoryRouter>
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('when user search books', () => {
    it('change input value', () => {
      const onMoveShelf = jest.fn();
      const event = {
        target: { value: 'Linux' }
      }
      const wrapper = mount(
        <MemoryRouter>
          <SearchBooks
            query=''
            books={[]}
            onSearch={onSearch}
            onMoveShelf={onMoveShelf}
          />
        </MemoryRouter>
      )
      wrapper.find('input').simulate('change', event);
      expect(onSearch).toBeCalled()
      //expect(wrapper.state().query).toEqual('Linux')
    })
  })
})
