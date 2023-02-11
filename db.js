let express =require('express')
let mysql =require('mysql')

let connection  =mysql.createConnection({
    host:'34.133.240.13',
    user:'mohsin',
    password:'abc',
    database:'mohsin'
})

connection.connect((err)=>{
    if(err){
        console.log('there is error in connection'+err)
    }else{
        console.log('database has been connect')
    }
    })
    module.exports =connection