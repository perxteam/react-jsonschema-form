'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactUploader = require('react-uploader');

var _reactUploader2 = _interopRequireDefault(_reactUploader);

require('react-uploader/lib/css/main.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileUploadWidget = function (_Component) {
  _inherits(FileUploadWidget, _Component);

  function FileUploadWidget() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FileUploadWidget);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileUploadWidget.__proto__ || Object.getPrototypeOf(FileUploadWidget)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (value) {
      var onChange = _this.props.onChange;

      onChange(value.map(function (item) {
        return item.id;
      }));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FileUploadWidget, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          value = _props.value,
          options = _props.options;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactUploader2.default, _extends({
          onChange: this.handleChange,
          headers: {
            'X-CSRFToken': 'gRNeMHWm7q5dnKkMnheghjA7u2kenRbXdO9yYG2vOYv6ZfmkyydO2yXlLwIayB9s',
            'Cookie': 'csrftoken=gRNeMHWm7q5dnKkMnheghjA7u2kenRbXdO9yYG2vOYv6ZfmkyydO2yXlLwIayB9s'
          },
          fetchConfig: {
            credentials: 'include'
          }
        }, options))
      );
    }
  }]);

  return FileUploadWidget;
}(_react.Component);

exports.default = FileUploadWidget;