const express=require("express");
const path=require("path");

const app=express();

//middleeware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Static files
app.use(express.static(path.join(__dirname,"public")));

//View engine setup
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//Routes
const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

//Farmer Dashboard
app.get("/farmer/dashboard", (req, res) => {
  res.render("farmer/dashboard");
});


//Worker Dashboard
app.get("/worker/dashboard", (req, res) => {
  res.render("worker/dashboard");
});

app.get("/jobs", (req, res) => {
  res.render("worker/jobs");
});




//Test route
app.get("/",(req,res)=>{
    res.send("Agriconnect server is Running");
});

module.exports=app;
