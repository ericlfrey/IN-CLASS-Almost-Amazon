import viewBook from '../pages/viewBook';
import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook, updateBook } from './bookData';

// for merged promises
const deleteAuthorBooksRelationship = (firbaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firbaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firbaseKey).then(resolve);
    });
  }).catch(reject);
});
// Merging Author and Book info- called on View Book Button
const mergeAuthorBooks = (firebaseKey) => {
  getSingleBook(firebaseKey).then((book) => {
    const authorId = book.author_id;
    getSingleAuthor(authorId).then((author) => {
      const payload = {
        authorObject: {
          first_name: author.first_name,
          last_name: author.last_name,
          email: author.email,
          favorite: author.favorite
        },
        firebaseKey
      };
      updateBook(payload).then(() => {
        getSingleBook(firebaseKey).then(viewBook);
      });
    });
  });
};

export { deleteAuthorBooksRelationship, mergeAuthorBooks };
