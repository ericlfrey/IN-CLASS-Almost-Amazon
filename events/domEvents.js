import {
  filterFavAuthors, getAuthors, getSingleAuthor
} from '../api/authorData';
import { showAuthors } from '../pages/authors';
import {
  deleteBook, getBooksWithoutAuthors, getSingleBook
} from '../api/bookData';
import { showBooks } from '../pages/books';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import viewAuthorBooks from '../pages/viewAuthorBooks';
import {
  deleteAuthorBooksRelationship, getBookDetails, getAuthorDetails, getBooksWithAuthors
} from '../api/mergedData';
import viewBook from '../pages/viewBook';

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // *BOOKS*

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(user.uid);
    }
    // CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((book) => {
        if (book.author_id) {
          getBookDetails(firebaseKey).then(viewBook);
          // eslint-disable-next-line no-alert
        } else if (window.confirm('Want to add an Author?')) {
          getBooksWithoutAuthors(user.uid).then((arr) => {
            addAuthorForm({}, arr);
          });
        }
      });
    }
    // CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(user.uid, bookObj));
    }
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then(() => {
          getBooksWithAuthors(user.uid).then(showBooks);
        });
      }
    }

    // *AUTHORS*

    // CLICK EVENT FOR SHOWING ADD AUTHOR FORM
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // CLICK EVENT FOR FILTERING FAVORITE AUTHORS
    if (e.target.id === 'filter-author-btn') {
      filterFavAuthors(user.uid).then(showAuthors);
    }
    // CLICK EVENT FOR VIEW AUTHOR / BOOKS
    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getAuthorDetails(firebaseKey).then(viewAuthorBooks);
    }
    // CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj, []));
    }
    // CLICK EVENT FOR DELETING AN AUTHOR / BOOKS
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors(user.uid).then(showAuthors);
        });
      }
    }
  });
};

export default domEvents;
