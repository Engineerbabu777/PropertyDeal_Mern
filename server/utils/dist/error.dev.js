"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;

var errorHandler = function errorHandler(statusCode, message) {
  var error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

exports.errorHandler = errorHandler;