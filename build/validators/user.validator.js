"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = exports.newNoteValidator = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));

var newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    firstname: _joi["default"].string().min(4).required(),
    lastname: _joi["default"].string().min(4).required(),
    emailID: _joi["default"].string().min(6).required(),
    password: _joi["default"].string().min(6).required()
  });

  var _schema$validate = schema.validate(req.body),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    // next(error);
    res.status(_httpStatusCodes["default"].BAD_REQUEST).json({
      code: _httpStatusCodes["default"].BAD_REQUEST,
      data: error,
      message: 'Enter Valid Details'
    });
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.newUserValidator = newUserValidator;

var newNoteValidator = function newNoteValidator(req, res, next) {
  var schema = _joi["default"].object({
    Title: _joi["default"].string().min(4).required(),
    Description: _joi["default"].string().min(4).required(),
    Color: _joi["default"].string(),
    isArchived: _joi["default"]["boolean"](),
    isDeleted: _joi["default"]["boolean"]()
  });

  var _schema$validate2 = schema.validate(req.body),
      error = _schema$validate2.error,
      value = _schema$validate2.value;

  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};

exports.newNoteValidator = newNoteValidator;