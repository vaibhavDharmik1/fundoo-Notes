import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    emailID: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    // next(error);
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: error,
      message: 'Enter Valid Details'
    });
  } else {
    req.validatedBody = value;
    next();
  }
  
};
export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
  Title: Joi.string().min(4).required(),
  Description: Joi.string().min(4).required(),
  Color: Joi.string(),
  isArchived: Joi.boolean(),
  isDeleted: Joi.boolean(),
});
const { error, value } = schema.validate(req.body);
if (error) {
  next(error);
} else {
  req.validatedBody = value;
  next();
}
};
