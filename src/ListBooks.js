import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Book from './Book'


const ListBooks = (props) => {
  const { books, title, onMoveShelf} = props

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
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

ListBooks.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onMoveShelf: PropTypes.func.isRequired
}

export default ListBooks

