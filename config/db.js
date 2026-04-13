const mysql=require("mysql2");

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Srinivash@1009",
    database:"agriconnect"
});

db.connect((err)=>{
    if(err){
        console.error("Error connection failed:",err);
    }   else{
        console.log("Connected to database successfully!");
    }
});

module.exports=db;