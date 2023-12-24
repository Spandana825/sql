const {faker}=require("@faker-js/faker");
const mysql=require('mysql2');
const express=require("express");
const app=express();
const path=require("path");
const methodoverride=require("method-override");
app.use(methodoverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'delta_app',
    password:'Spandana@28'
});
// let a="alter table user rename column ids to id";
// let q="insert into user(id,username,email,password)values ?";
// // let ans=[["25hj3","rt05hy","rt5jjku","rtyu57hgj6rf"],
// // ["8hj47","rdthjdye","rdhjkyrdt4yrw","gdbjnkr4e"],];
// let data=[];
let createRandomUser=()=> {
    return[
       faker.string.uuid(),
      faker.internet.userName(),
   faker.internet.email(),
      
       faker.internet.password(),
      
    ];
};
// for(let i=0;i<=100;i++)
// {
//     data.push(createRandomUser());
// }

// try{
//     connection.query(q,[data],(err,result)=>{
//         if(err)throw err;
//         console.log(result);
//     });

// }
// catch(err){
//     console.log(err);
// }
app.get("/user",(req,res)=>{
    let q="select *from user";
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            res.render("showusers.ejs",{result})
          
            
        });
    
    }
    catch(err){
        console.log(err);
        res.send("som error");
    };
})
app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`select *from user where id='${id}'`
   
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            let user=result[0];
            res.render("edit.ejs",{user});
          
            
        });
    
    }
    catch(err){
        console.log(err);
        res.send("som error");
    };
});
app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {password:formpass,username:newusername}=req.body;
    let q=`select *from user where id='${id}'`
   
    try{
        connection.query(q,(err,result)=>{
            if(err)throw err;
            let user=result[0];
            if(formpass!=user.password){
                res.send("wrong password");
            }
            else{
                let q2=`update user set username='${newusername}' where id='${id}'`;
                connection.query(q2,(err,result)=>{
                    if(err)throw err;
                   res.redirect("/user");
                });
            }
            
          
            
        });
    
    }
    catch(err){
        console.log(err);
        res.send("som error");
    };


});
app.get("/",(req,res)=>{
    let e="select count(*) from user";
    try{
            connection.query(e,(err,result)=>{
                if(err)throw err;
                let count=result[0]["count(*)"];
              
                res.render("home.ejs",{count});
            });
        
        }
        catch(err){
            console.log(err);
            res.send("som error");
        };

    
});
app.listen("8080",()=>{
    
    console.log("app is lieiuh ");

    
})



// connection.end();
  
    // console.log(createRandomUser());



    // cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
    // .\mysql -u root -p
    // 