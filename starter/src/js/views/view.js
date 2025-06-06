import icons from 'url:../../img/icons.svg'; // Parcel 2
export default class view {
        _data;
     
    
    render(data,render=true) {
    if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    console.log(this._data);

    const markup = this._generateMarkup();
     
    if(!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }



    updateData(data) {
    
      this._data = data;
      const newMarkup = this._generateMarkup();
      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElements = Array.from(newDOM.querySelectorAll('*'));
      const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    
      newElements.forEach((newEl, i) => {
        const curEl = curElements[i];
    
        // Update changed TEXT
        if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
           
           curEl.textContent = newEl.textContent;
        }


          if (!newEl.isEqualNode(curEl)) {
            // Update changed ATTRIBUTES
            Array.from(newEl.attributes).forEach(attr => {
              curEl.setAttribute(attr.name, attr.value);
            });
          }



      });
    }
    



    // updateData(data) {
    //   if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    //   this._data = data;
    //   const NewMarkup = this._generateMarkup();
    //   const newDOM = document.createRange().createContextualFragment(NewMarkup);
    //   const newElements =Array.from(newDOM.querySelectorAll('*')) ;
    //   const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    //   // console.log(newElements);

    //   newElements.forEach((newEl,i)=> {
    //     const currEl=curElements[i];
    //     console.log('🎆',currEl.firstChild?.nodeValue);
    //     console.log(newEl.firstChild?.nodeValue);
    //     // console.log('🎈',newEl.firstChild);
    //     // console.log(currEl.firstChild);
    //     // console.log(newEl.firstChild);
    //   //   if(!newEl.isEqualNode(currEl) ) {

          
    //   //     currEl.textContent= newEl.textContent;
          
    //   //   }
    //   // 
    //   })
      
    // }
    
    _clear() {
        this._parentElement.innerHTML='';  
    }
    
    
    
    spinner() {
        const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
      this._parentElement.innerHTML = '';
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    
    
    renderError(message=this._erroMessage) {
      const markup=` <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
              this._clear();
              this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderMessage(message=this._message) {
      const markup=` <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>`;
              this._clear();
              this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    
    addHandlerRender(handler) {
    [
      'hashchange',
      'load'
    ].forEach(ev=>window.addEventListener(ev, handler));
    }
}