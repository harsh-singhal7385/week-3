const express = require("express")
require('dotenv').config()
const bodyparser = require('body-parser')
const port = process.env.PORT || 3000
let data = require('./temp.json')
const app = express()
const jwt = require('jsonwebtoken')
app.use(bodyparser.json({entended : true}))
const fs = require('fs')
const { hashSync, compareSync } = require("bcrypt")
let aa;
let salt = 5;
let hash_pass;
let secretkey = "CFEWFWEWEhtfddh984734fdgfdg"
let my_id;

// testing purpose of file handling
// d = JSON.parse(JSON.stringify(data))
// fs.readFile('./temp.json','utf-8',(err,data) => {
//     if (err){
//         console.log(err)
//     }else{
//     // console.log(JSON.parse(JSON.stringify(data.toString())))
//     aa = JSON.parse(data)
//     console.log(aa)
// } 
// })
// fs.writeFile('aaa.json',JSON.stringify(data),(err)=>{
//     console.log("aaaaa")
// })



///////////////////////////////////////////////////////////////////////

app.get("/",(req,res)=>{
    console.log("Welcome to get page")
    console.log(req.headers.token)
    res.status(200).json({
        success:true,
        message:"Welcome to GET home page"
    })
})
app.post("/",(req,res)=>{
    console.log("Welcome to post page")
    res.status(200).json({
        success:true,
        message:"Welcome to POST home page"
    })
})
///////////////////////////////////////////////////////////////////////





app.post('/register',(req,res)=>{
    let data = require("./temp.json")
    let id = data.length
    let body = req.body

    let name_data = body.name
    let email_data = body.email
    let mobile_data = body.mobile
    let password_data = hashSync(body.password,salt)
    hash_pass = password_data
    
    let obj = {
        id : id + 1,
        name : name_data,
        email : email_data,
        mobile : mobile_data,
        password : password_data
    }

    // data = JSON.parse(JSON.stringify(data))
    data.push(obj)
    // data = JSON.stringify(data)
    
    fs.writeFile('./temp.json',JSON.stringify(data),(err)=>{
            if(err)
                console.log("issue in registering user")
            else
                console.log("user registered successfully")
        })
        

    console.log(data)
    
    res.status(200).json({
        message: "data appended successfully",
        success : true
    })

})

app.post('/login',(req,res)=>{
    let body = req.body
    let email  = body.email
    let password = body.password
    let decrypting_pass;
    let flag = 0
    
    
    const data = require("./temp.json")
    
    
    for(let check of data){
        
        // console.log((compareSync(body.password,data.password)))
        if(check.email==email){
            console.log(check.email,body.password)
            flag=1
            console.log("hi")
            my_id = check.id
            break
        }
    }
    
   
    if(flag==1){
        
        
        let token = jwt.sign( {email:body.email} , secretkey , { expiresIn:"2h"} )
        

        console.log("user found")
        res.status(200).json({
            message: "user data found in login",
            success : true
        })
    }else{
        console.log("no user found")
        res.status(200).json({
            message: "no data found in login",
            success : false
        })
    }
   

})

app.get('/getalldata',(req,res)=>{
    let token = req.headers.token.split('')[1]
    let decoded = jwt.verify(token, secretkey); 
    let data = require("./temp.json")
    if(decoded == true){
        res.status(200).json({
            data : data ,
            success : true
        })
    }else{
        res.status(200).json({
            data : "Invalid login / jwt expired , check again" ,
            success : false
        }) 
    }
    
})

app.get('/getdatabyid/:id',(req,res)=>{

    let token = req.headers.token.split('')[1]
    let decoded = jwt.verify(token, secretkey); 
    let data = require("./temp.json")
    if(decoded == true){
        
        let id = req.params.id
        let flag = 0
        let i = 0
        for(let x of data){
            
            if(x.id==id){
                flag=1
                break
            }
            i+=1
        }
        if(flag==1){
            console.log("specific user found")
            res.status(200).json({
                message: {"id": data[i].id,
                            "name" : data[i].name,
                            "mobile": data[i].mobile,
                            "email" : data[i].email            
            
            },
                success : true
            })
        }else{
            console.log("no user found")
            res.status(200).json({
                message: "no id found",
                success : false
            })
        }
        

    }else{
        res.status(200).json({
            data : "Invalid login / jwt expired , check again" ,
            success : false
        }) 
    }
    
    
    
    
  
})

app.get('/selfdata',(req,res)=>{
    let token = req.headers.token.split('')[1]
    let decoded = jwt.verify(token, secretkey); 
    if(decoded == true){
        for(let x of data){
            res.status(200).json({
                message: {
                    "id" : my_id,
                    "name" : x.name,
                    "email" : x.email,
                    "mobile" : x.mobile
                    
                    }    ,  
                success : true 
            })
        }
       
    }else{
        res.status(200).json({
            message: "Session jwt expired"   ,  
            success : false 
        })
    
    }
})


app.post('/passupdate',(req,res)=>{
  
        let token = req.headers.token.split('')[1]
        let decoded = jwt.verify(token, secretkey); 
        let data = require("./temp.json")
        let i = 0
        if(decoded == true){
            let body = req.body
            for(let x of data){
                if((compareSync(body.old_password,x.password))==true){
                    flag=1
                    break
                    }
                    i+=1
            }
        
            if(flag==1){

                data[i].password = hashSync(body.new_pasword,salt)
                fs.writeFile('./temp.json',JSON.stringify(data),(err)=>{
                    if(err)
                        console.log("issue in registering user")
                    else
                        console.log("user registered successfully")
                })

                res.status(200).json({
                    message: "New password accepted"   ,  
                    success : true 
                })  
            }else{
                res.status(200).json({
                    message: "New password not accepted"   ,  
                    success : false 
                })
            }
        } 
})
app.post('/infoupdate',(req,res)=>{
    let token = req.headers.token.split('')[1]
    let decoded = jwt.verify(token, secretkey); 
    let data = require("./temp.json")
    let i = 0
    if(decoded == true){
        let body = req.body
        for(let x of data){

            if(body.email==x.email){
                flag=1
                break
            }
                i+=1
        }
    
        if(flag==1){
            
            data[i].name = body.name
            data[i].email = body.email
            data[i].password = body.password
            
            fs.writeFile('./temp.json',JSON.stringify(data),(err)=>{
                if(err)
                    console.log("issue in registering user")
                else
                    console.log("user registered successfully")
            })


            res.status(200).json({
                message: "New data accepted"   ,  
                success : true 
            })  
        }else{
            res.status(200).json({
                message: "New data not accepted"   ,  
                success : false 
            })
        }
    } 
})




app.listen(port,()=>{
    console.log(port)
})