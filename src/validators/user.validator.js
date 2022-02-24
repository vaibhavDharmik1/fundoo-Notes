import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    emailID: Joi.string().min(6).required().unique(),
    password: Joi.string().min(6).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
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
  // isArchived: Joi.boolean(),
  // isDeleted: Joi.boolean(),
  userID: Joi.string().required()

});
const { error, value } = schema.validate(req.body);
if (error) {
  next(error);
} else {
  req.validatedBody = value;
  next();
}
};
