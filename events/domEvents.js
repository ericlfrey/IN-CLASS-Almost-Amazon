import {
  filterFavAuthors, deleteSingleAuthor, getAuthors, getSingleAuthor, getAuthorBooks
} from '../api/authorData';
import { showAuthors } from '../pages/authors';
import {
  deleteBook, getBooks, getSingleBook, updateBook
} from '../api/bookData';
import { showBooks } from '../pages/books';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import viewBook from '../pages/viewBook';
import viewAuthorBooks from '../pages/viewAuthorBooks';

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
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
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
      window.scrollTo(0, 0);
    }

    // CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteSingleAuthor(firebaseKey).then(() => {
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
      const [, authorId] = e.target.id.split('--');
      getAuthorBooks(authorId).then((books) => {
        getSingleAuthor(authorId).then((author) => {
          viewAuthorBooks(author, books);
        });
      });
      window.scrollTo(0, 0);
    }
  });
};

export default domEvents;
