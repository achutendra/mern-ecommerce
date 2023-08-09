import express from "express";
import {registerController, loginController, forgotPasswordController , testController, updateProfileController} from "../controllers/authController.js";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// REGISTER || METHOD POST
router.post('/register', registerController);

// LOGIN || METHOD POST
router.post('/login', loginController);

// FORGOT Password || POST
router.post('/forgot-password', forgotPasswordController, () => {
    // console.log("i am here at forgot password route ")
});

// test route
router.get('/test', requiredSignIn, isAdmin, testController);

// user protected route
router.get('/user-auth', requiredSignIn, (req, res) => {
    res.status(200).send({ok: true});
    // console.log("i am here at authroute")
});

// admin protected route
router.get('/admin-auth', requiredSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
    // console.log("i am here at authroute")
});

// update profile
router.put('/profile', requiredSignIn, updateProfileController);

export default router;