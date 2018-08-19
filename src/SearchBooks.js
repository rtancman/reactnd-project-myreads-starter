import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { debounce } from 'throttle-debounce';
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

  onSearchDebounced = debounce(500, this.props.onSearch)

  updateQuery = (query) => {
    this.setState(
      { query: query },
      () => this.onSearchDebounced(this.state.query.trim())
    )
  }

  componentDidMount() {
    this.onSearchDebounced(this.state.query)
  }

  render() {
    const { books, onMoveShelf } = this.props
    const { query } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
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

