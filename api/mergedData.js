// import { showBooks } from '../pages/books';
import {
  deleteSingleAuthor, getAuthorBooks, getSingleAuthor
} from './authorData';
import {
  booksOnSale, deleteBook, getBooks, getSingleBook
} from './bookData';

// When Author is Deleted, this Also Deletes Their Books
const deleteAuthorBooksRelationship = (firbaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firbaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firbaseKey).then(resolve);
    });
  })
    .catch(reject);
});

// Merging Author and Book info- called on View Book Button

// // *One way to do it:*
// const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
//   getSingleBook(firebaseKey).then((bookObject) => {
//     getSingleAuthor(bookObject.author_id)
//       .then((authorObject) => resolve({ ...bookObject, authorObject }));
//   }).catch(reject);
// });

// Using async await
const getBookDetails = async (firebaseKey) => {
  const bookObject = await getSingleBook(firebaseKey);
  const authorObject = await getSingleAuthor(bookObject.author_id);
  return { ...bookObject, authorObject };
};

// Merging Author and Books info- called on View Author Button

// // *One way to do it:*
// const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
//   getSingleAuthor(firebaseKey).then((authorObject) => {
//     getAuthorBooks(firebaseKey)
//       .then((booksArray) => resolve({ ...authorObject, booksArray }));
//   }).catch(reject);
// });

const getAuthorDetails = async (firebaseKey) => {
  const authorObject = await getSingleAuthor(firebaseKey);
  const booksArray = await getAuthorBooks(firebaseKey);
  return { ...authorObject, booksArray };
};

const getBooksWithAuthors = () => new Promise((resolve, reject) => {
  getBooks().then((books) => {
    const bookArr = books.map((book) => getBookDetails(book.firebaseKey));
    Promise.all(bookArr).then(resolve);
  }).catch(reject);
});

const filterBooksWithAuthors = () => new Promise((resolve, reject) => {
  booksOnSale().then((books) => {
    const bookArr = books.map((book) => getBookDetails(book.firebaseKey));
    Promise.all(bookArr).then(resolve);
  }).catch(reject);
});

export {
  deleteAuthorBooksRelationship, getBookDetails, getAuthorDetails, getBooksWithAuthors, filterBooksWithAuthors
};
