
import async  from 'regenerator-runtime';
import {TIMEOUT_SEC} from './config';
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


export const ajax=async function(url, uploadData = undefined) {
  try {
  const fetchPro = uploadData ? fetch(url, {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',  
    },
    'body':JSON.stringify(uploadData), // Convert the data to a JSON string
  }): fetch(url);
        
    const response=await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]); 
   const data= await response.json();
   if(!response.ok) throw new Error(`${data.message} (${response.status})`);
   return data;
}   catch(err) {
   throw err;
}


}

// export const getJson=async function(url) {
//     try {
        
//          const response=await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]); 
//         const data= await response.json();
//         if(!response.ok) throw new Error(`${data.message} (${response.status})`);
//         return data;
//      }   catch(err) {
//         throw err;
//      }
   
// }
// export const sendJson=async function(url,uploadData) {
//     try {
     
//         const fetchPro = fetch(url, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body:JSON.stringify(uploadData), // Convert the data to a JSON string
//         });
          
        
//          const response=await Promise.race([fetchPro,timeout(TIMEOUT_SEC)]); 
//         const data= await response.json();
//         if(!response.ok) throw new Error(`${data.message} (${response.status})`);
//         return data;
//      }   catch(err) {
//         throw err;
//      }
   
// }
