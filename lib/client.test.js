"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _client = require("./client");
(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var username, password, libreClient, data;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        username = 'USERNAME';
        password = 'PASSWORD';
        libreClient = (0, _client.LibreLinkUpClient)({
          username: username,
          password: password,
          connectionIdentifier: 'IDENTIFIER'
        });
        _context.next = 5;
        return libreClient.read();
      case 5:
        data = _context.sent;
        console.log(data);
      case 7:
      case "end":
        return _context.stop();
    }
  }, _callee);
}))();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY2xpZW50IiwicmVxdWlyZSIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImxpYnJlQ2xpZW50IiwiZGF0YSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJMaWJyZUxpbmtVcENsaWVudCIsImNvbm5lY3Rpb25JZGVudGlmaWVyIiwicmVhZCIsInNlbnQiLCJjb25zb2xlIiwibG9nIiwic3RvcCJdLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQudGVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaWJyZUxpbmtVcENsaWVudCB9IGZyb20gJy4vY2xpZW50JztcblxuKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgdXNlcm5hbWUgPSAnVVNFUk5BTUUnO1xuICBjb25zdCBwYXNzd29yZCA9ICdQQVNTV09SRCc7XG4gIGNvbnN0IGxpYnJlQ2xpZW50ID0gTGlicmVMaW5rVXBDbGllbnQoe1xuICAgIHVzZXJuYW1lLFxuICAgIHBhc3N3b3JkLFxuICAgIGNvbm5lY3Rpb25JZGVudGlmaWVyOiAnSURFTlRJRklFUicsXG4gIH0pO1xuXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBsaWJyZUNsaWVudC5yZWFkKCk7XG4gIGNvbnNvbGUubG9nKGRhdGEpO1xufSkoKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFFQSxJQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUMsU0FBQUMsUUFBQTtFQUFBLElBQUFDLFFBQUEsRUFBQUMsUUFBQSxFQUFBQyxXQUFBLEVBQUFDLElBQUE7RUFBQSxPQUFBTixZQUFBLFlBQUFPLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtJQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO01BQUE7UUFDT1IsUUFBUSxHQUFHLFVBQVU7UUFDckJDLFFBQVEsR0FBRyxVQUFVO1FBQ3JCQyxXQUFXLEdBQUcsSUFBQU8seUJBQWlCLEVBQUM7VUFDcENULFFBQVEsRUFBUkEsUUFBUTtVQUNSQyxRQUFRLEVBQVJBLFFBQVE7VUFDUlMsb0JBQW9CLEVBQUU7UUFDeEIsQ0FBQyxDQUFDO1FBQUFKLFFBQUEsQ0FBQUUsSUFBQTtRQUFBLE9BRWlCTixXQUFXLENBQUNTLElBQUksQ0FBQyxDQUFDO01BQUE7UUFBL0JSLElBQUksR0FBQUcsUUFBQSxDQUFBTSxJQUFBO1FBQ1ZDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDWCxJQUFJLENBQUM7TUFBQztNQUFBO1FBQUEsT0FBQUcsUUFBQSxDQUFBUyxJQUFBO0lBQUE7RUFBQSxHQUFBaEIsT0FBQTtBQUFBLENBQ25CLEdBQUUsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==