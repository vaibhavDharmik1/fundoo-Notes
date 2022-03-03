import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const userRegistration = async (req, res, next) => {
  try {
    const data = await UserService.userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'login successfully'
    });
  } catch (error) {
    next(error);
  }
};

// forgetPassword
export const forgetPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgetPassword(req.body)
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: "password send to email"
    })
  } catch (error) {
    next(error);
  }
};

//  Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    req.body.userID = req.body.data.id; 
    const data = await UserService.resetPassword(req.body);
    res.status(HttpStatus.OK).json({
    code: HttpStatus.OK,
    data: data,
    message: 'Password Reset Successful'
    });
  }catch (error) {
    next(error)
  }
};