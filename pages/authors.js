import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyAuthors = () => {
  const domString = '<h1>No Authors</h1>';
  renderToDOM('#store', domString);
};

const showAuthors = (array) => {
  clearDom();

  const btnString = `
  <button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>
  <button class="btn btn-success btn-lg mb-4" id="filter-author-btn">Favorite Authors</button>`;

  renderToDOM('#add-button', btnString);

  let domString = '';
  array.forEach((item) => {
    domString += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <div class="fav-star">
        ${item.favorite ? '<span><i class="fa fa-star"></i></span>' : '<span></span>'}
        </div>
        <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
        <hr>
        <div class="book-icons">
          <i class="btn btn-success" id="view-author-btn--${item.firebaseKey}">
            <span><i class= "fas fa-eye"></i></span>
          </i>
          <i class="btn btn-info" id="update-author--${item.firebaseKey}">
            <span><i class= "fas fa-edit"></i></span>
          </i>
          <i class="btn btn-danger" id="delete-author-btn--${item.firebaseKey}">
            <span><i class= "fas fa-trash-alt"></i></span>
          </i>
        </div>
      </div>
    </div>
    `;
  });
  renderToDOM('#store', domString);
};

export { showAuthors, emptyAuthors };
