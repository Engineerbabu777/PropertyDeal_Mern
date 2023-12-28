"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var listingSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  regularPrice: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  furnished: {
    type: Boolean,
    required: true
  },
  parking: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  offer: {
    type: Boolean,
    required: true
  },
  imageUrls: {
    type: Array,
    required: true
  },
  userRef: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var Listing = _mongoose["default"].model('Listing', listingSchema);

var _default = Listing;
exports["default"] = _default;