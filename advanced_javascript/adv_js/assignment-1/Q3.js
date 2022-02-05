let data_arr = []
import fetch from 'cross-fetch';
let result = []
let year, category, laureates
function getData(){

fetch('http://api.nobelprize.org/v1/prize.json')
.then((res)=>{
    return res.json()
})
.then((data)=>{
      data_arr = data.prizes
      return data_arr
})
.then((data)=>{
    for(let val of data){
        year = Number(val.year)
        category = val.category
        
        if((year >= 2000 && year <= 2019) && (category=="chemistry")){
            laureates = val.laureates
            for(let ans of laureates){
                result.push(ans)
            }
        }
    }
    return result
}).then((output)=>{
    console.log(output)                        // actual output
    console.log(output.length)
})
.catch((error)=>{
        console.log(error)

})

}

async function Q3(){
    await getData()
}


Q3()  // calling Q3()