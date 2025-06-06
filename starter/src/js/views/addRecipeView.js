import view from './view.js'; // Importing the base view class
import icons from 'url:../../img/icons.svg'; // Importing the SVG icons


class AddRecipeView extends view {
_parentElement = document.querySelector('.upload');
_message='Recipe was successfully uploaded!'; // Message to be displayed after successful upload
_errorMessage='Could not upload the recipe!'; // Error message to be displayed in case of failure
_window=document.querySelector('.add-recipe-window') // Selecting the parent element for pagination
_overlay=document.querySelector('.overlay'); // Selecting the overlay element
_closeBtn=document.querySelector('.btn--close-modal'); // Selecting the close button for the modal
_openBtn=document.querySelector('.nav__btn--add-recipe'); // Selecting the button to open the modal

constructor() {
    super();
    this._addHandlerShowWindow(); 
    this._addHandlerCloseWindow();
}
toggleWindow() {
    this._overlay.classList.toggle('hidden'); // Toggling the hidden class on the overlay to show/hide it
    this._window.classList.toggle('hidden'); // Toggling the hidden class on the modal to show/hide it
}
_addHandlerShowWindow() {
  this._openBtn.addEventListener('click', this.toggleWindow.bind(this));
  
   // Adding an event listener to the open button to show the modal
}
_addHandlerCloseWindow() {
    this._closeBtn.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click',this.toggleWindow.bind(this));// Adding an event listener to the close button to hide the modal
}

addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit',function(e) {
        e.preventDefault();
        const dataArray=[...new FormData(this)];
        console.log(dataArray,"🎃🎊");

        const data=Object.fromEntries(dataArray); 
        console.log(data,"🎄");// Creating a new FormData object from the form element
        handler(data);
    })
}

}

export default new AddRecipeView(); // Exporting an instance of the paginationView class