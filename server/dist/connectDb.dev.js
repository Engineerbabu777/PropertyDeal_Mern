"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.databaseConnect = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var databaseConnect = function databaseConnect() {
  return regeneratorRuntime.async(function databaseConnect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(_mongoose["default"].connections.readyState === 1)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", _mongoose["default"].connection.asPromise());

        case 4:
          return _context.abrupt("return", _mongoose["default"].connect(process.env.MONGO_URI || "mongodb+srv://awaismumtaz0099:25213291231919@cluster0.3so1bcq.mongodb.net/realState").then(function () {
            return console.log('Database Connected');
          })["catch"](function (err) {
            return console.log(err);
          }));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.databaseConnect = databaseConnect;