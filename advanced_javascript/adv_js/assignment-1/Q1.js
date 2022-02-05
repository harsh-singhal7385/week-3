const data = require('./battles.json')
let output_obj = {}

attacker_king = {}
defender_king = {}
region = {}
name_obj = {}

let most_active_attacker_king = ""
let most_active_defender_king = ""
let most_active_region = ""
let most_active_name = ""
let most_active_attacker_king_value = ""
let most_active_defender_king_value = ""
let most_active_region_value = ""
let most_active_name_value = ""
let battle_type_arr = []
let battle_type = new Set()


let win = 0
let loss = 0

let average;
let min = 0
let max = 0
let sum = 0
let count = 0
let defender_size = []
    

    for(let a of data){
        
        //////////////////////////////////////////////////////////

        if (a.attacker_king in attacker_king){
            attacker_king[a.attacker_king] += 1
        }else{
            attacker_king[a.attacker_king] = 1
        }
        
        //////////////////////////////////////////////////////////
        
        if (a.defender_king in defender_king){
            defender_king[a.defender_king] += 1
        }else{
            defender_king[a.defender_king] = 1
        }
        
        //////////////////////////////////////////////////////////

        if (a.region in region){
            region[a.region] += 1
        }else{
            region[a.region] = 1
        }
        
        //////////////////////////////////////////////////////////

        if (a.name in name_obj){
            name_obj[a.name] += 1
        }else{
            name_obj[a.name] = 1
        }
        
        //////////////////////////////////////////////////////////
        
        if(a.attacker_outcome == "win"){
            win+=1
        }else if(a.attacker_outcome == "loss"){
            loss+=1
        }else{

        }

        //////////////////////////////////////////////////////////
        if(a.battle_type != ''){
            battle_type.add(a.battle_type)
        }
        
        //////////////////////////////////////////////////////////

        defender_size.push(a.defender_size)

        //////////////////////////////////////////////////////////
    }
    
    for(let i of battle_type.values()){
        battle_type_arr.push(i)
    }
    max = 0

    for(let getMax in attacker_king){
        
        if(max<attacker_king[getMax]){
            max = attacker_king[getMax]
            most_active_attacker_king_value = getMax
        }
    }
    
    most_active_attacker_king = most_active_attacker_king_value
    
    max = 0

    for(let getMax in defender_king){
        if(max<defender_king[getMax]){
            max = defender_king[getMax]
            most_active_defender_king_value = getMax
        }
    }
    
    most_active_defender_king = most_active_defender_king_value
    
    max = 0

    for(let getMax in name_obj){
        if(max<name_obj[getMax]){
            max = name_obj[getMax]
            most_active_name_value = getMax
        }
    }
    
    most_active_name = most_active_name_value
    
    max = 0

    for(let getMax in region){
        if(max<region[getMax]){
            max = region[getMax]
            most_active_region_value = getMax
        }
    }
    
    most_active_region = most_active_region_value

    defender_size_filer = defender_size.filter((value,index,arr)=>{
        if(value!==null){
            return value
        }
    })
    

    
    max = 0
    min = 1000000000000000
    sum = 0
    count = 0
    for(let val of defender_size_filer){
        sum += val
        count+=1
        if(max < val){
            max = val
        }
        
        if(val < min){
            min = val
        }
    }

    average = sum / count

    final_obj = {
        'most_active': {
        'attacker_king' : most_active_attacker_king,
        'defender_king' : most_active_defender_king,
        'region' : most_active_region,
        'name' : most_active_name
        },
        'attacker_outcome': {
        'win' : win, 
        'loss' : loss 
        },
        'battle_type': battle_type_arr,
        'defender_size':{
        'average': average ,
        'min' : min,
        'max' : max
        }
    }

    console.log(final_obj)