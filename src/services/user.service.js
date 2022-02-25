import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const userRegistration = async (body) => {
  console.log("requestbody", body)
  const saltRounds = 10;
  const hasedPassword = bcrypt.hashSync(body.password,saltRounds);
  body.password = hasedPassword;
  const data = await User.create(body);
  console.log("response", data)
  return data;
};

// User login 
export const login = async (body) => {
  const user = await User.findOne({ emailID: body.emailID });
  console.log("userdetails", user)
  if (user === null) {
    throw new Error('User does not exist');
  } else {
    const validPassword = await bcrypt.compare(body.password, user.password);
    console.log("result after validation", validPassword)
    if (validPassword) {
      const token = jwt.sign(
        { emailID: user.emailID, id: user._id },
        process.env.SECRET_CODE
      );
      return token;
    } else {
      throw new Error('password is invalid');
    }
  }
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
