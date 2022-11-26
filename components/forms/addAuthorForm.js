import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';
import selectBooks from './selectBooks';

const addAuthorForm = (obj = {}, arr = []) => {
  clearDom();
  const domString = `
    <h1>${obj.firebaseKey ? 'Edit Author' : 'Submit New Author'}</h1>
    <form id="${obj.firebaseKey ? `update-author--${obj.firebaseKey}` : 'submit-author'}" class="mb-4">
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input type="text" class="form-control" id="first_name" placeholder="First Name" value="${obj.first_name || ''}" required>
      </div>
      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input type="text" class="form-control" id="last_name" placeholder="Last Name" value="${obj.last_name || ''}" required>
      </div>
      <div class="form-group">
        <label for="title">Email</label>
        <input type="email" class="form-control" id="email" aria-describedby="Email" placeholder="Enter Email" value="${obj.email || ''}" required>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="favorite" ${obj.favorite ? 'checked' : ''}>
        <label class="form-check-label" for="favorite">
       Favorite
        </label>
      </div>
      <div id="books-wo-authors"></div>
      <button type="submit" class="btn btn-primary mt-3">Submit Author</button>
    </form>`;

  renderToDOM('#form-container', domString);
  if (arr.length > 0) {
    selectBooks(arr);
  }
};

export default addAuthorForm;
