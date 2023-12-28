"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = require("../controller/user.controller.js");

var _verifyUser = require("../utils/verifyUser.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/update/:id', _verifyUser.verifyToken, _userController.updateUser);
router["delete"]('/delete/:id', _verifyUser.verifyToken, _userController.deleteUser);
router.get('/listings/:id', _verifyUser.verifyToken, _userController.getUserListings);
router.get('/:id', _verifyUser.verifyToken, _userController.getUser);
var _default = router;
exports["default"] = _default;