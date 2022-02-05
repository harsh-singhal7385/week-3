import fetch from 'cross-fetch';

let result = [], data_arr = []
let obj = {}
let actors = [] , genres = [] , title
let actor_movies = new Set() , genres_movies = new Set()
let actor_obj = {}
let genre_obj = {}
let length_actors, length_genres

let final_actor,final_genre

function getData(){

fetch('https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json')
.then((res)=>{
    return res.json()
})
.then((data)=>{

    final_actor = getActorsList(data)
    final_genre = getGenresList(data)

    obj = {
        actors: final_actor,
        Genres: final_genre
    }
    return obj
    
}).then((output)=>{
    console.log(output)                        // actual output
})
.catch((error)=>{
    console.log(error)
})

}


function getActorsList(data){
    
    for(let val of data){
        actors = val.cast
        length_actors = actors.length
        title = val.title
        
        for(let valu of actors){
            if(valu !== null || valu !== undefined || isNaN(valu)){
                actor_movies.add(valu)
            }
        }
    }
    
    actor_obj = {}
    for (let getactor in actor_movies) {
        actor_obj[actor_movies[getactor]] = []
    }
    
    data.map((getmovie) => {
        getmovie.cast.map((getactor) => {
            let mymovielist = actor_obj[getactor]
            if (typeof(mymovielist) !== 'undefined') {
                mymovielist.push(getmovie.title)
                actor_obj[getactor] = mymovielist
            }
        
        })
    })
    
    let desired_output = []
    for (const [key_output, value_output] of Object.entries(actor_obj)) {
        desired_output.push({
            "Name": key_output,
            "Movies": value_output
        })
    }
    return desired_output
}

function getGenresList(data){

    for(let val of data){
        genres = val.cast
        length_genres = genres.length
        title = val.title
        
        for(let valu of genres){
            if(valu !== null || valu !== undefined || isNaN(valu)){
                genres_movies.add(valu)
            }
        }
    }
    
    genre_obj = {}
    for (let getgenre in genres_movies) {
        genre_obj[genres_movies[getgenre]] = []
    }
    
    data.map((getmovie) => {
        getmovie.cast.map((getgenre) => {
            let mymovielist = genre_obj[getgenre]
            if (typeof(mymovielist) !== 'undefined') {
                mymovielist.push(getmovie.title)
                genre_obj[getgenre] = mymovielist
            }
        
        })
    })
    
    let expected_output = []
    for (const [key_output, value_output] of Object.entries(genre_obj)) {
        expected_output.push({
            "Type": key_output,
            "Movies": value_output
        })
    }

    return expected_output
}
async function Q1(){

    await getData()
}


Q1()  // calling Q3()