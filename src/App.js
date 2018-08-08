import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'

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
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: books.filter((book) => book.shelf == 'currentlyReading'),
        wantToRead: books.filter((book) => book.shelf == 'wantToRead'),
        read: books.filter((book) => book.shelf == 'read'),
      })
    })
  }

  moveShelf = (book, shelf) => {
    const currentShelf = book.shelf

    if ( shelf !== 'none' ) {
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
                <ListBooks
                  onMoveShelf={this.moveShelf}
                  books={this.state.currentlyReading}
                  title="Currently Reading"
                />
                <ListBooks
                  onMoveShelf={this.moveShelf}
                  books={this.state.wantToRead}
                  title="Want to Read"
                />
                <ListBooks
                  onMoveShelf={this.moveShelf}
                  books={this.state.read}
                  title="Read"
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={({ history }) => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
