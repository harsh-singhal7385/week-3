import fetch from 'cross-fetch';

let result = [], data_arr = []
let obj = {}
let owner, repo_name
let name_start, full_name, private_repo , login, name_val, followersCount, followingCount, licenseName, score, numberOfBranch
let BASE_URL = "https://api.github.com/search/repositories?q="

function getData(base_url){

fetch(base_url)
.then((res)=>{
    return res.json()
})
.then((data)=>{
    return data.items
})
.then((data)=>{
    
    for(let val of data){
        name_start = val.name
        full_name = val.full_name
        private_repo = val.private
        login = val.owner.login
        name_val = val.owner.url
        followersCount = val.owner.url
        followingCount = val.owner.url

        if( val.licenseName === undefined || val.licenseName === null || isNaN(val.licenseName)){
            licenseName = "Not provided by Author"
        }
        
        if( val.score === undefined || val.score === null || isNaN(val.score)){
            score = 0
        }else{
            score = val.score
        }

        if( val.numberOfBranch === undefined || val.numberOfBranch === null || isNaN(val.numberOfBranch)){
            numberOfBranch = 0
        }
               
        
        obj = {
            "name" : name_start, 
            "full_name" : full_name , 
            "private"  : private_repo,  
            "owner" : {
            "login" : login,  
            "name" : name_val,
            "followersCount" : followersCount,  
            "followingCount" : followingCount, 
            },
            "licenseName" : licenseName, 
            "score" : score, 
            "numberOfBranch" : numberOfBranch 

        }

        result.push(obj)
        
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
    owner = "harsh-singhal7385"    // enter owner name of repo
    repo_name = "week-3"          // enter repo name of owner
    // owner = "nodejs"   // enter owner name of repo
    // repo_name = "node"          // enter repo name of owner
    
    BASE_URL = BASE_URL + owner + "/" + repo_name
    await getData(BASE_URL)
}


Q4()  // calling Q3()