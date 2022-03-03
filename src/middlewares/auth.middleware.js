import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    jwt.verify(bearerToken,process.env.SECRET_CODE, (err, verifiedToken) => {
      if (err) {
        throw {
          code:HttpStatus.BAD_REQUEST,
          message: 'Token for Authorization is Incorrect'
        };
      }else{
        req.body['data'] = verifiedToken;
        next();
    }
  }
    );
  } catch (error) {
    next(error);
  }
};



export const Auth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    jwt.verify(bearerToken,process.env.SECRET_CODE2 , (err, verifiedToken) => {
      if (err) {
        throw {
          code:HttpStatus.BAD_REQUEST,
          message: 'Token for Authorization is Incorrect'
        };
      }else{
        req.body['data'] = verifiedToken;
        next();
    }
  }
    );
  } catch (error) {
    next(error);
  }
};