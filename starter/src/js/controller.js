
import *  as model from './model.js';
import {MODAL_CLOSE_SEC} from './config.js';
import recipView from './views/recipView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookMarkView from './views/bookMarksview.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime'; // for async await
// if (module.hot) {
//   module.hot.accept();
// }

// const recipeContainer = document.querySelector('.recipe');
// console.log(recipeContainer);



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllRecepie=async function() {
  try {
    const id=window.location.hash.slice(1);
    if(!id) return;
    
    recipView.spinner();
    // result view to update selected recipe
    resultView.updateData(model.getSearchResult());
    // book mark view to update selected recipe
    bookMarkView.updateData(model.state.bookmarks);

    await model.loadRecipe(id);
    recipView.render(model.state.recipe);

   
    } catch (err) {
      recipView.renderError();
      console.error(err);
    }
  };
 


const controllSearchResults=async function() {
  try {
    resultView.spinner();
    const query=searchView.getQuery();
    if(!query) return;
    await model.loadSearchResult(query);
    resultView.render(model.getSearchResult());
    paginationView.render(model.state.search);
    // console.log(model.state.search);

  }catch(err) {
    resultView.renderError(err);
  }
}
 
const paginationControl= function(goTo) {
  resultView.render(model.getSearchResult(goTo));
  paginationView.render(model.state.search);
}

const updateSevingController=function(newSrvings) {
  model.updateServings(newSrvings);
  // recipView.render(model.state.recipe);//we dont use this because it will render the whole recipe again
  // instead we will update the data of the recipe
  recipView.updateData(model.state.recipe);
  

}

const bookMarkControll=function() {
  !model.state.recipe.bookmarked ? model.addBookmark(model.state.recipe) : model.unBookmark(model.state.recipe.id);
  recipView.updateData(model.state.recipe);
  bookMarkView.render(model.state.bookmarks);

}
const controlBookmarks= function() {
  bookMarkView.render(model.state.bookmarks);
}

const addRecipeController=async function(newRecipe) {
try {
  console.log(newRecipe ,'new recipe');
addRecipeView.spinner();  

await model.uploadRecipe(newRecipe);

recipView.render(model.state.recipe);

addRecipeView.renderMessage();

bookMarkView.render(model.state.bookmarks);

window.history.pushState(null, '', `#${model.state.recipe.id}`);



setTimeout(function() {
  addRecipeView.toggleWindow();
},2.5* 1000);
}catch(err) {
  console.error(err);
  addRecipeView.renderError(err);
}
 
}



const init = function() {
  bookMarkView.addHandler(controlBookmarks);
  recipView.addHandlerRender(controllRecepie);
  recipView.addHandlerUpdateServings(updateSevingController);
  recipView.addBookMarkHandler(bookMarkControll);
  searchView.searchHandler(controllSearchResults);
  paginationView.addHandler(paginationControl);
  addRecipeView.addHandlerUpload(addRecipeController);

}

init();




