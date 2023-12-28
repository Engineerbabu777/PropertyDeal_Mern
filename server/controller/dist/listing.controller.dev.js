"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListings = exports.getListing = exports.updateListing = exports.deleteListing = exports.createListing = void 0;

var _listingModel = _interopRequireDefault(require("../models/listing.model.js"));

var _error = require("../utils/error.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createListing = function createListing(req, res, next) {
  var listing;
  return regeneratorRuntime.async(function createListing$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_listingModel["default"].create(req.body));

        case 3:
          listing = _context.sent;
          return _context.abrupt("return", res.status(201).json(listing));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          // Handle errors by passing them to the next middleware
          next(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // DELETE A LISTING


exports.createListing = createListing;

var deleteListing = function deleteListing(req, res, next) {
  var listing;
  return regeneratorRuntime.async(function deleteListing$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_listingModel["default"].findById(req.params.id));

        case 2:
          listing = _context2.sent;

          if (listing) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", next((0, _error.errorHandler)(404, 'Listing not found!')));

        case 5:
          if (!(req.user.id !== listing.userRef)) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", next((0, _error.errorHandler)(401, 'You can only delete your own listings!')));

        case 7:
          _context2.prev = 7;
          _context2.next = 10;
          return regeneratorRuntime.awrap(_listingModel["default"].findByIdAndDelete(req.params.id));

        case 10:
          // Respond with a success message
          res.status(200).json('Listing has been deleted!');
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](7);
          // Handle errors by passing them to the next middleware
          next(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[7, 13]]);
}; // UPDATE A LISTING


exports.deleteListing = deleteListing;

var updateListing = function updateListing(req, res, next) {
  var listing, updatedListing;
  return regeneratorRuntime.async(function updateListing$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_listingModel["default"].findById(req.params.id));

        case 2:
          listing = _context3.sent;

          if (listing) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", next((0, _error.errorHandler)(404, 'Listing not found!')));

        case 5:
          if (!(req.user.id !== listing.userRef)) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", next((0, _error.errorHandler)(401, 'You can only update your own listings!')));

        case 7:
          _context3.prev = 7;
          _context3.next = 10;
          return regeneratorRuntime.awrap(_listingModel["default"].findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }));

        case 10:
          updatedListing = _context3.sent;
          // Respond with the updated listing
          res.status(200).json(updatedListing);
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](7);
          // Handle errors by passing them to the next middleware
          next(_context3.t0);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[7, 14]]);
}; // GET A LISTING BY ID


exports.updateListing = updateListing;

var getListing = function getListing(req, res, next) {
  var listing;
  return regeneratorRuntime.async(function getListing$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_listingModel["default"].findById(req.params.id));

        case 3:
          listing = _context4.sent;

          if (listing) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", next((0, _error.errorHandler)(404, 'Listing not found!')));

        case 6:
          // Respond with the found listing
          res.status(200).json(listing);
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          // Handle errors by passing them to the next middleware
          next(_context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.getListing = getListing;

var getListings = function getListings(req, res, next) {
  var limit, startIndex, offer, furnished, parking, type, searchTerm, sort, order, listings;
  return regeneratorRuntime.async(function getListings$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          limit = parseInt(req.query.limit) || 1;
          startIndex = parseInt(req.query.startIndex) || 0;
          offer = req.query.offer;

          if (offer === undefined || offer === 'false') {
            offer = {
              $in: [false, true]
            };
          }

          furnished = req.query.furnished;

          if (furnished === undefined || furnished === 'false') {
            furnished = {
              $in: [false, true]
            };
          }

          parking = req.query.parking;

          if (parking === undefined || parking === 'false') {
            parking = {
              $in: [false, true]
            };
          }

          type = req.query.type;

          if (type === undefined || type === 'all') {
            type = {
              $in: ['sale', 'rent']
            };
          }

          searchTerm = req.query.searchTerm || '';
          sort = req.query.sort || 'createdAt';
          order = req.query.order || 'desc';
          _context5.next = 16;
          return regeneratorRuntime.awrap(_listingModel["default"].find({
            name: {
              $regex: searchTerm,
              $options: 'i'
            },
            offer: offer,
            furnished: furnished,
            parking: parking,
            type: type
          }).sort(_defineProperty({}, sort, order)).limit(limit).skip(startIndex));

        case 16:
          listings = _context5.sent;
          return _context5.abrupt("return", res.status(200).json(listings));

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.getListings = getListings;