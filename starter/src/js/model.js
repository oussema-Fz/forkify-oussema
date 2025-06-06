import {async} from 'regenerator-runtime/runtime'; // Importing async from regenerator-runtime
import {ajax} from './helper.js';
import {API_URL,Result_Per_Page,KEY} from './config.js';



export const state={
    recipe:{},
    search: {
        query: '',
        results: [],
    resultpage:Result_Per_Page,
    page: 1
    },
    bookmarks: []
}

const getRecipe=function(data) {
    const {recipe}=data.data;
    return {
        id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
            ...(recipe.key && {key : recipe.key}), // optional chaining
    }
}

export const loadRecipe=async function (id) {
   try {
       
        const data=await ajax(`${API_URL}/${id}?key=${KEY}`);
            
            state.recipe= getRecipe(data); // destructuring the recipe object from the data object
           
        
   // check if the recipe is already bookmarked

    state.bookmarks.some(bk=>bk.id===id) ? state.recipe.bookmarked=true : state.recipe.bookmarked=false;

    }catch(err) {
        throw err;

    }
};
export const loadSearchResult=async function(query) {
    try {
        state.search.query=query;
        const data =await ajax(`${API_URL}?search=${query}&key=${KEY}`);
        state.search.results= data.data.recipes.map(rec => {
        return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceUrl: rec.source_url,
        image: rec.image_url,
        ...(rec.key && {key : rec.key})
        }
       });        
       state.search.page=1; // reset page to 1 after new search
    }catch(err) {
        console.error(err);
        throw err;
    }
}

export const getSearchResult=function(page =state.search.page) {
state.search.page=page;
const start=(page-1)*state.search.resultpage;
const end=page * state.search.resultpage;
return state.search.results.slice(start,end);
}

export const updateServings=function(newSrvings) {
   state.recipe.ingredients.forEach(ing=> {
     if (ing.quantity) ing.quantity = (ing.quantity * newSrvings) / state.recipe.servings;
    }
   );    // newQuantity=oldQuantity * newServings/oldServings   // newQuantity=ing.quantity * newSrvings/state.recipe.servings
    state.recipe.servings=newSrvings;
    
    
};
const persistBokkMarks=function() {
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks));
}

export const addBookmark=function(recipe) {
state.bookmarks.push(recipe);
//mark the recpe as bookmark
if(recipe.id===state.recipe.id) {
    recipe.bookmarked=true;
}
persistBokkMarks();
}
//always when we need to delete someting we use the id
export const unBookmark=function(id) {

const index=state.bookmarks.findIndex(el=>el.id===id);
state.bookmarks.splice(index,1); // remove the bookmark from the bookmarks array
  if(id===state.recipe.id) {
    state.recipe.bookmarked=false; // remove the bookmark from the recipe
  }
  persistBokkMarks();
}

export const uploadRecipe=async function(newRecipe) {
try {
     const result=Object.entries(newRecipe).filter(rec=>rec[0].startsWith('ingredient-') && rec[1] !== '')
     .reduce((acc, [key, val]) => {
        const [, index, field] = key.split('-'); // "ingredient-1-quantity" -> ["ingredient", "1", "quantity"]
        if (!acc[index] || typeof acc[index] !== 'object') acc[index] = {}   
        acc[index][field] = val;
         console.log(acc);
        return acc;

     },{});
 
     const ingredients=Object.values(result).map(ing=>{
        const res= [ing.quantity ? +ing.quantity : 1, ing.unit ? ing.unit : '', ing.description ? ing.description : ''];
        const [quantity, unit, description] = res;
        return {
            quantity: quantity ? +quantity : 1,
            unit: unit ? unit : '',
            description: description ? description : '',
        }
     });
     const recipe= {
       
                title: newRecipe.title,
                source_url: newRecipe.sourceUrl,
                image_url: newRecipe.image,
                publisher: newRecipe.publisher,
                cooking_time: newRecipe.cookingTime,
                servings: newRecipe.servings,
                ingredients
            }
         const data=await ajax(`${API_URL}?key=${KEY}`,recipe);
    console.log(data); // send the data to the api
    // upload the recepie to to teh state
    state.recipe=getRecipe(data);
    addBookmark(state.recipe) // add the recipe to the bookmarks
   
}
catch(err) {
    console.error(err);
   throw err;  
}

     
    // .map(([_,val])=> {
    //     console.log(val);
    //    const ing=val.split(',').map(ing=>ing.trim());
    //    console.log(ing); 
    //    const [quantity,unit,description]=ing; 
    //            return {
    //                quantity:quantity?(+quantity):1,
    //                unit:unit?unit:'',
    //                description:description?description:'',
    //             }
    //  }); // get the ingredients from the newRecipe object
  
     
// .filter(entry=>entry[0].startsWith('ingredient')&& entry[1] !== '')
//     .map(([_,val])=>{
//         console.log(val);
//         const ingr=val.split(',').map(ing=>ing.trim()); // remove all spaces and split the string by comma
//         console.log(ingr,'hhhhhhh');
//         // if(ingr.length !==3) throw new Error('Wrong ingredient format! Please use the correct format.');
      
//         const [quantity,unit,description]=ingr; 
//         return {
//             quantity:quantity?(+quantity):1,
//             unit:unit?unit:'',
//             description:description?description:'',
//         }
//     });
  
//     //make the initial format to send dta to the api
//     const recipe= {
       
//         title: newRecipe.title,
//         source_url: newRecipe.sourceUrl,
//         image_url: newRecipe.image,
//         publisher: newRecipe.publisher,
//         cooking_time: newRecipe.cookingTime,
//         servings: newRecipe.servings,
//         ingredients
//     }
//     const data=await ajax(`${API_URL}?key=${KEY}`,recipe);
//     console.log(data); // send the data to the api
//     // upload the recepie to to teh state
//     state.recipe=getRecipe(data);
//     addBookmark(state.recipe) // add the recipe to the bookmarks
   
// }catch(err) {
//     console.error(err);
//    throw err;  
// }


const init=function() {
   const stoarage= localStorage.getItem('bookmarks');
   if(stoarage) state.bookmarks=JSON.parse(stoarage); // convert the string to an object
}
init();

const clearBooKmarks=function() {
    localStorage.clear('bookmarks');
}
// clearBooKmarks(); // clear the bookmarks from the local storage
}

