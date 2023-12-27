"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = require("../controller/auth.controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/signup", _authController.signup);
router.post("/signin", _authController.signin);
router.post('/google', _authController.google);
router.get('/signout', _authController.signOut);
var _default = router;
exports["default"] = _default;