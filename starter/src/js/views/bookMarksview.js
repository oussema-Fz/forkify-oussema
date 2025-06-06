import icons from 'url:../../img/icons.svg'; // Parcel 2
import view from './view.js';
import previewView from './previewView.js';

class Bookmark extends view {
    _parentElement = document.querySelector('.bookmarks__list');
    _erroMessage = 'search for a recipe and book mark it! :)';
    addHandler(handler) {
        window.addEventListener('load', handler);
    };
    _generateMarkup()  {
      console.log(this._data);

        return `
            ${this._data.map(bokmark=> 
              // console.log(Bookmark)
              previewView.render(bokmark,false)).join('')
            }
          `;
    };




}
export default new Bookmark(); //EXPORT AN OBJECT NOT THE CLASS