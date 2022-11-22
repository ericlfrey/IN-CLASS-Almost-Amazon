import { signOut } from '../utils/auth';
import { showBooks } from '../pages/books';
import { getAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import { filterBooksWithAuthors, getBooksWithAuthors } from '../api/mergedData';

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    filterBooksWithAuthors(user.uid).then(showBooks);
  });

  // SHOW ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooksWithAuthors(user.uid).then(showBooks);
  });

  // SHOW ALL AUTHORS
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(user.uid).then(showAuthors);
  });

  // SEARCH BOOKS
  document.querySelector('#search').addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
      const searchValue = document.querySelector('#search').value.toLowerCase();
      getBooksWithAuthors(user.uid).then((arr) => {
        const filteredBooks = arr.filter((item) => item.title.toLowerCase().includes(searchValue)
          || item.authorObject.first_name.toLowerCase().includes(searchValue)
          || item.authorObject.last_name.toLowerCase().includes(searchValue));
        showBooks(filteredBooks);
      });
      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
