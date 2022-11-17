import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { emptyBooks } from './books';

const viewAuthorBooks = (author, array) => {
  clearDom();
  if (array.length === 0) {
    emptyBooks();
  } else {
    const str = `
    <div class="view-author-books-container">
      <div class="text-white ms-5 details">
        <h5>${author.first_name} ${author.last_name} ${author.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
        <div>
          Author Email: <a href="mailto:${author.email}">${author.email}</a>
        </div>
        <hr>
      </div>
      <div class="author-books-cards" id="authBooksCards"></div>
    </div>`;
    renderToDOM('#store', str);
    let domString = '';
    array.forEach((item) => {
      domString += `
      <div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body" style="height: 250px;">
          <h6 class="card-title">${item.title}</h6>
          <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
          <hr>
          <div class="book-icons">
            <i class="btn btn-success"   id="view-book-btn--${item.firebaseKey}">
              <span><i class= "fas fa-eye"></i></span>
            </i>
            <i id="edit-book-btn--${item.firebaseKey}"  class="btn btn-info">
              <span><i class= "fas fa-edit"></i></span>
            </i>
            <i id="delete-book-btn--${item.firebaseKey}"  class="btn btn-danger">
              <span><i class= "fas fa-trash-alt"></i></span>
            </i>
          </div>
        </div>
      </div>`;
    });
    renderToDOM('#authBooksCards', domString);
  }
};
export default viewAuthorBooks;
