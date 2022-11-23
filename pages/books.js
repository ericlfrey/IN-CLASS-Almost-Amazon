import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyBooks = () => {
  const domString = '<h1>No Books</h1>';
  renderToDOM('#store', domString);
  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-book-btn">Add A Book</button>';
  renderToDOM('#add-button', btnString);
};

const showBooks = (array) => {
  clearDom();
  if (array.length === 0) {
    emptyBooks();
  } else {
    const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-book-btn">Add A Book</button>';
    renderToDOM('#add-button', btnString);

    let domString = '';
    array.forEach((item) => {
      domString += `
      <div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body book-card" style="height: 275px;">
          <h6 class="card-title">${item.title}</h6>
          <h6 class="card-title">${item.authorObject.first_name ? item.authorObject.first_name : ''} ${item.authorObject.last_name ? item.authorObject.last_name : ''}</h6>          
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
    renderToDOM('#store', domString);
    window.scrollTo(0, 0);
  }
};

export { showBooks, emptyBooks };
