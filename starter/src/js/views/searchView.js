// This module handles the search functionality of the application.
import view from './view.js'; // Importing the view module
class searchView extends view {
  _parentElement = document.querySelector('.search');

    getQuery() {
        const query=this._parentElement.querySelector('.search__field').value;
        this._clearInput(); // Clear the input field after getting the query
        return query;
    }
    _clearInput() {
        this._parentElement.querySelector('.search__field').value = ''; // Clear the input field after submission
    }
    searchHandler(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the form from submitting and reloading the page
            handler(); // Call the handler function passed from the controller
        });

    }
}
export default new searchView(); //EXPORT AN OBJECT NOT THE CLASS
// This allows us to use the methods of the class without creating an instance of it.