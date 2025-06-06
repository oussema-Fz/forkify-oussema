import view from './view.js'; // Importing the base view class
import icons from 'url:../../img/icons.svg'; // Importing the SVG icons


class paginationView extends view {
_parentElement = document.querySelector('.pagination'); // Selecting the parent element for pagination


addHandler(handler) {
 this._parentElement.addEventListener('click',function(e){
  const btn=e.target.closest('.btn--inline'); 
 // Getting the page number from the button's data attribute
 if(!btn) return; // If no button is found, exit the function
 const goToPage=+btn.dataset.goto;
 console.log(goToPage); 
 handler(goToPage)
 }) ; 


}
_generateMarkup() {
const numberPages= Math.ceil(this._data.results.length / this._data.resultpage); // Calculate the number of pages based on the total results and results per page
const currentPage=this._data.page; // Get the current page from the model

    if (currentPage === 1 && numberPages > 1) {
       return `<button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          
           
          
          `;
    }
    if (currentPage < numberPages) {
        return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
          </button>
     
          <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    if (currentPage === numberPages && numberPages > 1) {
        return `
    
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
          </button>`;
    }   

    return ''; // Return an empty string if no buttons are needed
    
}
}

export default new paginationView(); // Exporting an instance of the paginationView class