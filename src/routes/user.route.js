import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { Auth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to create a new user
router.post('/userregister', newUserValidator, userController.userRegistration);

// route to login
router.post('/login', userController.login);

// forget password

router.post('/forgetpassword', userController.forgetPassword);

// Reset password
router.put('/reset/:_id',Auth, userController.resetPassword);



export default router;