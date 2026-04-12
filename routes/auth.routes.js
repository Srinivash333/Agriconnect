const express=require("express");
const router=express.Router();

const authController=require("../controllers/authController");

// show pages

router.get("/signup",authController.showSignup);
router.get("/login",authController.showLogin);

//form actions

router.post("/signup",authController.signUser);
router.post("/login",authController.loginUser);

module.exports=router;