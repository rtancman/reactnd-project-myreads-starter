import React, { Component } from 'react';
import PropTypes from 'prop-types'


const shelfOptions = [
  {value: 'currentlyReading', label: 'Currently Reading'},
  {value: 'wantToRead', label: 'Want to Read'},
  {value: 'read', label: 'Read'},
  {value: 'none', label: 'None'}
]

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveShelf: PropTypes.func.isRequired
  }

  state = {
    book: this.props.book
  }

  changeShelf = (shelf) => {
    const oldState = { ...this.state }
    this.props.onMoveShelf(this.state.book, shelf).catch((e) => {
      this.setState({ ...oldState })
    })
    const updatedBook = {
      ...this.state.book,
      shelf
    }
    this.setState({book: updatedBook})
  }

  render() {
    const { book } = this.state
    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks && book.imageLinks.thumbnail && (
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
          )}
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(event) => this.changeShelf(event.target.value)} >
              <option value="move" disabled>Move to...</option>
              {shelfOptions.map((shelf) => (
                <option key={shelf.value} value={shelf.value}>{shelf.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && (
          <div className="book-authors">{book.authors.join(', ')}</div>
        )}
      </div>
    )
  }
}

export default Book

