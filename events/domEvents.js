import {
  filterFavAuthors, getAuthors, getSingleAuthor
} from '../api/authorData';
import { showAuthors } from '../pages/authors';
import {
  deleteBook, getBooks, getSingleBook
} from '../api/bookData';
import { showBooks } from '../pages/books';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import viewAuthorBooks from '../pages/viewAuthorBooks';
import {
  deleteAuthorBooksRelationship, getBookDetails, getAuthorDetails
} from '../api/mergedData';
import viewBook from '../pages/viewBook';

const domEvents = () => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then(() => {
          getBooks().then(showBooks);
        });
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm();
    }

    // CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
    }
    // CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((book) => {
        if (book.author_id) {
          getBookDetails(firebaseKey).then(viewBook);
          // eslint-disable-next-line no-alert
        } else if (window.confirm('Want to add an Author?')) {
          addAuthorForm();
        }
      });
      window.scrollTo(0, 0);
    }

    // CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors().then(showAuthors);
        });
      }
    }

    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
    }
    // Filter Authors by Favorite
    if (e.target.id === 'filter-author-btn') {
      filterFavAuthors().then(showAuthors);
    }
    // View Author Info
    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getAuthorDetails(firebaseKey).then(viewAuthorBooks);
      window.scrollTo(0, 0);
    }
  });
};

export default domEvents;
