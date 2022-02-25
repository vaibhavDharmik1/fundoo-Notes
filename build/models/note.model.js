"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var noteSchema = new _mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Color: {
    type: String
  },
  //  userID:{
  //      type:String,
  //      required: true,
  //  },
  isArchived: {
    type: Boolean
  },
  isDeleted: {
    type: Boolean
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)('Note', noteSchema);

exports["default"] = _default;