import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

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

export { deleteAuthorBooksRelationship, getBookDetails, getAuthorDetails };
