import {
  deleteSingleAuthor, getAuthorBooks, getSingleAuthor
} from './authorData';
import {
  deleteBook, getBooks, getSingleBook
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

// Merging Author and Single Book info- called on View Book Button

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
const getAuthorDetails = async (firebaseKey) => {
  const authorObject = await getSingleAuthor(firebaseKey);
  const booksArray = await getAuthorBooks(firebaseKey);
  return { ...authorObject, booksArray };
};

// Merging All Books With Authors- Uses getBookDetails
const getBooksWithAuthors = (uid) => new Promise((resolve, reject) => {
  getBooks(uid).then((books) => {
    const bookArr = books.map((book) => getBookDetails(book.firebaseKey));
    Promise.all(bookArr).then(resolve);
  }).catch(reject);
});
// Merging Books on Sale with Authors
const filterBooksWithAuthors = (uid) => new Promise((resolve, reject) => {
  getBooks(uid).then((books) => {
    const saleBooks = books.filter((item) => item.sale);
    const bookArr = saleBooks.map((book) => getBookDetails(book.firebaseKey));
    Promise.all(bookArr).then(resolve);
  }).catch(reject);
});

export {
  deleteAuthorBooksRelationship, getBookDetails, getAuthorDetails, getBooksWithAuthors, filterBooksWithAuthors
};
