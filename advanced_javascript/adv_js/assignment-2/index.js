import fetch from 'cross-fetch';

let result = [], data_arr = []
let obj = {}
let actors = [] , genres = [] , title
let actor_movies = [] , genres_movies = []
let actor_obj = {}
let genre_obj = {}

function getData(){

fetch('https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json')
.then((res)=>{
    return res.json()
})
.then((data)=>{
    return data
})
.then((data)=>{
    
  for(let val of data){
    actors = val.cast
    genres = val.genres
    title = val.title
    if(actors.length > 0){
        for(let valu of actors){
            console.log(valu)
        }
        break
    }
    break
    // if(actors.length > 0){
        
    // }
  }
   
    return result
}).then((output)=>{

    console.log(output)                        // actual output
    
})
.catch((error)=>{
    console.log(error)

})

}

async function Q4(){

    await getData(BASE_URL)
}


Q4()  // calling Q3()