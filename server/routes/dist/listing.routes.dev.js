"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _listingController = require("../controller/listing.controller.js");

var _verifyUser = require("../utils/verifyUser.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/create', _verifyUser.verifyToken, _listingController.createListing);
router["delete"]('/delete/:id', _verifyUser.verifyToken, _listingController.deleteListing);
router.post('/update/:id', _verifyUser.verifyToken, _listingController.updateListing);
router.get('/get/:id', _listingController.getListing);
var _default = router;
exports["default"] = _default;