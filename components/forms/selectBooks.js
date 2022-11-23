import renderToDOM from '../../utils/renderToDom';

const selectBooks = (arr) => {
  let domString = `
    <p>Are any of these books by this author?</p>
  `;
  arr.forEach((item) => {
    domString += `
  <div class="form-check">
  <input class="form-check-input" type="checkbox" value="${item.firebaseKey}" id="bookCheck--${item.firebaseKey}">
  <label class="form-check-label" for="flexCheckDefault">
    ${item.title}
  </label>
</div>
  `;
  });
  renderToDOM('#books-wo-authors', domString);
};

export default selectBooks;
