import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'


class SearchBooks extends Component {
  static propTypes = {
    query: PropTypes.string,
    books: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onMoveShelf: PropTypes.func.isRequired
  }

  state = {
    query: this.props.query || ''
  }

  updateQuery = (query) => {
    this.setState(
      { query: query.trim() },
      () => this.props.onSearch(this.state.query)
    )
  }

  componentDidMount() {
    this.props.onSearch(this.state.query)
  }

  render() {
    const { books, onMoveShelf, onSearch } = this.props
    const { query } = this.state
    return (
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
            <input
              type="text"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
           {books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onMoveShelf={onMoveShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks

