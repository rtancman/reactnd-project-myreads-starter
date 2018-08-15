import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'


const categories = [
  {code: 'currentlyReading', label: 'Currently Reading'},
  {code: 'wantToRead', label: 'Want to Read'},
  {code: 'read', label: 'Read'}
]

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReading: [],
    wantToRead: [],
    read: [],
    booksFromQuery: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter((book) => book.shelf === 'currentlyReading'),
        wantToRead: books.filter((book) => book.shelf === 'wantToRead'),
        read: books.filter((book) => book.shelf === 'read'),
      })
    })
  }

  moveShelf = (book, shelf) => {
    const currentShelf = book.shelf

    if ( currentShelf === 'none' ) {
      this.setState((state) => ({
        [shelf]: state[shelf].concat([book])
      }))
    }else if ( shelf !== 'none' ) {
      this.setState((state) => ({
        [currentShelf]: state[currentShelf].filter((b) => b.id !== book.id),
        [shelf]: state[shelf].concat([book])
      }))
    }else{
      this.setState((state) => ({
        [currentShelf]: state[currentShelf].filter((b) => b.id !== book.id),
      }))
    }

    BooksAPI.update(book, shelf)
  }

  searchBookInMyReads = (book_id, category) => {
    return (this.state[category].filter((b) => b.id === book_id)).length > 0
  }

  search = (query) => {
    if (query.length > 3) {
      BooksAPI.search(query).then((books) => {
        if( !books.hasOwnProperty('error') ){
          books.map((book) => {
            if (this.searchBookInMyReads(book.id, 'currentlyReading')) {
              book.shelf = 'currentlyReading'
            }else if (this.searchBookInMyReads(book.id, 'wantToRead')) {
              book.shelf = 'wantToRead'
            }else if (this.searchBookInMyReads(book.id, 'read')) {
              book.shelf = 'read'
            }else {
              book.shelf = 'none'
            }
            return book
          })
          this.setState((state) => ({
            booksFromQuery: books,
          }))
        }else {
          this.setState((state) => ({
            booksFromQuery: [],
          }))
        }
      })
    }else {
      this.setState((state) => ({
        booksFromQuery: [],
      }))
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                { categories.map((category) => (
                  <ListBooks
                    key={category.code}
                    onMoveShelf={this.moveShelf}
                    books={this.state[category.code]}
                    title={category.label}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            books={this.state.booksFromQuery}
            onSearch={this.search}
            onMoveShelf={this.moveShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
