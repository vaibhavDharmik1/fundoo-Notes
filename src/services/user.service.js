import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mailSend } from '../utils/helper';
import { sender } from '../utils/rabbitmq';
import { producer } from '../utils/rabbitmq';

//create new user
export const userRegistration = async (body) => {
  const user = await User.findOne({ emailID: body.emailID })
  if (user == null) {
  const saltRounds = 10;
  const hasedPassword = bcrypt.hashSync(body.password, saltRounds);
  body.password = hasedPassword;
  const data = await User.create(body);
  sender(data);
  return data;
  }else{
  throw new Error('EmailID already exist')
  }
};

// User login
export const login = async (body) => {
  const user = await User.findOne({ emailID: body.emailID });
  if (user === null) {
    throw new Error('User does not exist');
  } else {
    const validPassword = bcrypt.compareSync(body.password, user.password);
    if (validPassword) {

      const token = jwt.sign({'emailID': user.emailID,'id':user._id},
      process.env.SECRET_CODE);
       return token;
    } else {
      throw new Error('password is invalid');
    }
  }
};

// forget Password
export const forgetPassword = async (body) => {
  const user = await User.findOne({ email: body.email });

  if ( user.emailID != null) {
    const token = jwt.sign({'email': user.emailID,'id':user._id},process.env.SECRET_CODE2);
    const sendingEmail = await mailSend(user.emailID, token)
    return token;
  } else {
    throw new Error ('email does not match');
  }
};

// ResetPassword
export const resetPassword = async (body) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(body.password, salt);
  body.password = hashPassword;
  const data = await User.findByIdAndUpdate({_id: body.userID },
    {$set: {password: body.password}}, {new: true} );
  return data;
};