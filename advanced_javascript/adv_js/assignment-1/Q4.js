let data_arr = []
import fetch from 'cross-fetch';
let result = []
let flights
let obj = {}
let cancelled , ontime , delayed ,diverted ,total ,count

function getData(){
count = 0
fetch('https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json')
.then((res)=>{
    return res.json()
})
.then((data)=>{
    
    for(let val of data){
      flights = val.Statistics.Flights
      cancelled = flights['Cancelled']
      delayed = flights['Delayed']
      ontime = flights['On Time']
      diverted = flights['Diverted']
      total = flights['Total']
      
      if((cancelled + delayed + ontime + diverted )==(total)){
        obj = {
                "Airport_name" : val.Airport.Name,
                "Airport_code" :val.Airport.Code,
                "Airport_status_total" : true
            }
      }else{
        obj = {
            "Airport_name" : val.Airport.Name,
            "Airport_code" :val.Airport.Code,
            "Airport_status_total" : false
        }
        count+=1
        
      }
      result.push(obj)
    }
   
    return result
}).then((output)=>{
    console.log(output)                        // actual output
    // console.log(output.length)
})
.catch((error)=>{
        console.log(error)

})

}

async function Q4(){
    await getData()
}


Q4()  // calling Q3()