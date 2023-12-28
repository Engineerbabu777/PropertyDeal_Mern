"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _error = require("./error.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// MIDDLEWARE TO VERIFY AUTHORIZATION TOKEN
var verifyToken = function verifyToken(req, res, next) {
  // EXTRACT TOKEN FROM THE AUTHORIZATION HEADER
  var token = req.headers.authorization; // LOG THE TOKEN AND REQUEST COOKIES FOR DEBUGGING

  console.log({
    token: token,
    requestCookies: req.cookies
  }); // CHECK IF TOKEN IS MISSING

  if (!token) return next((0, _error.errorHandler)(401, 'Unauthorized')); // VERIFY THE TOKEN USING THE SECRET KEY

  _jsonwebtoken["default"].verify(token, 'hvdsgvyuwtwdyutbvas', function (err, user) {
    // HANDLE TOKEN VERIFICATION ERRORS
    if (err) return next((0, _error.errorHandler)(403, 'Forbidden')); // ATTACH THE USER OBJECT FROM THE TOKEN TO THE REQUEST OBJECT

    req.user = user; // CONTINUE TO THE NEXT MIDDLEWARE OR ROUTE HANDLER

    next();
  });
};

exports.verifyToken = verifyToken;