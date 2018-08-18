import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, render } from 'enzyme';
import Book from './Book'
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

const book = {
  'title': 'The Linux Command Line',
  'subtitle': 'A Complete Introduction',
  'authors': [
      'William E. Shotts, Jr.'
  ],
  'publisher': 'No Starch Press',
  'publishedDate': '2012',
  'description': 'You have experienced the shiny, point-and-click surface of your Linux computer—now dive below and explore its depths with the power of the command line. The Linux Command Line takes you from your very first terminal keystrokes to writing full programs in Bash, the most popular Linux shell.',
  'industryIdentifiers': [
      {
          'type': 'ISBN_13',
          'identifier': '9781593273897'
      },
      {
          'type': 'ISBN_10',
          'identifier': '1593273894'
      }
  ],
  'readingModes': {
      'text': true,
      'image': false
  },
  'pageCount': 480,
  'printType': 'BOOK',
  'categories': [
      'COMPUTERS'
  ],
  'averageRating': 4,
  'ratingsCount': 2,
  'maturityRating': 'NOT_MATURE',
  'allowAnonLogging': true,
  'contentVersion': '1.2.2.0.preview.2',
  'panelizationSummary': {
      'containsEpubBubbles': false,
      'containsImageBubbles': false
  },
  'imageLinks': {
      'smallThumbnail': 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
      'thumbnail': 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
  },
  'language': 'en',
  'previewLink': 'http://books.google.com/books?id=nggnmAEACAAJ&dq=linux&hl=&cd=3&source=gbs_api',
  'infoLink': 'https://play.google.com/store/books/details?id=nggnmAEACAAJ&source=gbs_api',
  'canonicalVolumeLink': 'https://market.android.com/details?id=book-nggnmAEACAAJ',
  'id': 'nggnmAEACAAJ',
  'shelf': 'currentlyReading'
}

const onMoveShelf = jest.fn()

describe('Book', () => {
  describe('when component renders', () => {

    it('without crashing', () => {
      const component = renderer.create(
        <Book book={book} onMoveShelf={onMoveShelf} />,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('without imageLinks', () => {
      const book = {
        'title': 'lala',
        'authors': [
            'William E. Shotts, Jr.'
        ]
      }
      const component = renderer.create(
        <Book book={book} onMoveShelf={onMoveShelf} />,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('without authors', () => {
      const book = {
        'title': 'lala',
        'imageLinks': {
            'smallThumbnail': 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
            'thumbnail': 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
        }
      }
      const component = renderer.create(
        <Book book={book} onMoveShelf={onMoveShelf} />,
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when user change category book', () => {
    it('change select value', () => {
      const onMoveShelf = jest.fn(() => {
        return new Promise((resolve, reject) => resolve())
      })
      const event = {
        preventDefault() {},
        target: { value: 'read' }
      };
      const component = shallow(<Book book={book} onMoveShelf={onMoveShelf} />);
      component.find('select').simulate('change', event);
      expect(onMoveShelf).toBeCalled();
      expect(component.state().book.shelf).toEqual('read');
    });
  });
});

