"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ErrorList;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ErrorList(_ref) {
  var errors = _ref.errors,
      cssPrefix = _ref.cssPrefix;

  return _react2.default.createElement(
    "div",
    { className: "\n      " + cssPrefix + "__panel\n      " + cssPrefix + "__panel-danger\n      " + cssPrefix + "__errors\n    " },
    _react2.default.createElement(
      "div",
      { className: cssPrefix + "__panel-heading" },
      _react2.default.createElement(
        "h3",
        { className: "panel-title" },
        "Errors"
      )
    ),
    _react2.default.createElement(
      "ul",
      { className: "list-group" },
      errors.map(function (error, i) {
        return _react2.default.createElement(
          "li",
          { key: i, className: "list-group-item text-danger" },
          error.stack
        );
      })
    )
  );
}