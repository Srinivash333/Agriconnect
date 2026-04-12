const users=[];

exports.showSignup=(req,res)=>{
    res.render("auth/signup");
};

exports.showLogin=(req,res)=>{
    res.render("auth/login");
};

exports.signUser=(req,res)=>{
    const {name,email,password,role}=req.body;
    const user={name,email,password,role};
    users.push(user);
    res.send("Signup successful! Go to login.");      
}

exports.loginUser=(req,res)=>{
    const {email,password}=req.body;
    const user=users.find(u=>u.email===email && u.password===password);

    if(!user){
        return res.send("Invalid credentials. Please try again.");
    }

    //Role System
    if(user.role==="farmer"){
        res.redirect("/farmer/dashboard");
    }
    else if(user.role==="admin"){
        res.redirect("/admin/dashboard");
    } 
}; 