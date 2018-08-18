import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme';
import ListBooks from './ListBooks'
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

const onMoveShelf = jest.fn()

describe('ListBooks', () => {
  describe('when component renders', () => {
    it('is valid list books', () => {
      const component = renderer.create(
        <ListBooks
          title='Test'
          books={books}
          onMoveShelf={onMoveShelf}
        />
      )
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    })

    it('is empty list books', () => {
      const component = renderer.create(
        <ListBooks
          title='Test'
          books={[]}
          onMoveShelf={onMoveShelf}
        />
      )
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    })

    it('show write title', () => {
      const wrapper = shallow(
        <ListBooks
          title='Test'
          books={[]}
          onMoveShelf={onMoveShelf}
        />
      )
      expect(wrapper.find('h2').text()).toEqual('Test');
    })
  })
})
