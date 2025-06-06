import icons from 'url:../../img/icons.svg'; // Parcel 2
import view from './view.js';
import previewView from './previewView.js';

class ResultView extends view {
    _parentElement = document.querySelector('.results');
    _erroMessage = 'We could not find that query!';
    
   _generateMarkup()  {
           return `
               ${this._data.map(result=>previewView.render(result,false)).join('')}
             `;
       };

}
export default new ResultView(); //EXPORT AN OBJECT NOT THE CLASS