import {
  createAuthor,
  getAuthorBooks,
  getAuthors, updateAuthor
} from '../api/authorData';
import {
  createBook, getSingleBook, updateBook
} from '../api/bookData';
import { getAuthorDetails, getBooksWithAuthors } from '../api/mergedData';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import viewAuthorBooks from '../pages/viewAuthorBooks';
// import viewAuthorBooks from '../pages/viewAuthorBooks';

const formEvents = (user) => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
        uid: user.uid
      };
      createBook(payload).then(({ name }) => {
        getSingleBook(name).then(() => {
          const patchPayload = { firebaseKey: name };
          updateBook(patchPayload).then(() => {
            getBooksWithAuthors(user.uid).then(showBooks);
          });
        });
      });
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
        firebaseKey,
      };

      updateBook(payload).then(() => {
        getBooksWithAuthors(user.uid).then(showBooks);
      });
    }

    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      const payload = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        uid: user.uid
      };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then((author) => {
          const authorId = author.firebaseKey;
          const booksWoAuthors = document.querySelectorAll('.select-book');
          [...booksWoAuthors].forEach((item) => {
            if (item.checked) {
              getSingleBook(item.value).then((book) => {
                const { firebaseKey } = book;
                const authorPayload = {
                  title: book.title,
                  description: book.description,
                  image: book.image,
                  price: book.price,
                  author_id: authorId,
                  sale: book.sale,
                  firebaseKey,
                };
                updateBook(authorPayload);
              });
            }
          });
          getAuthors(user.uid).then(() => {
            getAuthorBooks(authorId).then((books) => {
              if (books.length > 0) {
                getAuthorDetails(authorId).then(viewAuthorBooks);
              } else {
                getAuthors(user.uid).then(showAuthors);
              }
            });
          });
        });
      });
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        firebaseKey,
      };

      updateAuthor(payload).then(() => {
        getAuthors(user.uid).then(showAuthors);
      });
    }
  });
};

export default formEvents;
