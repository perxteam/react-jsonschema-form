'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _reactUploader = require('react-uploader');

var _reactUploader2 = _interopRequireDefault(_reactUploader);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FileUploadWidget.__proto__ || Object.getPrototypeOf(FileUploadWidget)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FileUploadWidget, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          value = _props.value,
          options = _props.options,
          _props$formContext = _props.formContext,
          cssPrefix = _props$formContext.cssPrefix,
          formId = _props$formContext.formId,
          i18nInstance = _props$formContext.i18nInstance;


      var miscFormData = formId ? { 'form_id': formId } : undefined;
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_reactUploader2.default, _extends({
          onChange: this.handleChange,
          value: value,
          cssPrefix: cssPrefix,
          actualDelete: false,
          miscFormData: miscFormData,
          errorProcessor: i18nInstance && this.errorProcessor
        }, options))
      );
    }
  }]);

  return FileUploadWidget;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleChange = function (value) {
    var onChange = _this2.props.onChange;

    onChange(_ramda2.default.compose(_ramda2.default.ifElse(_ramda2.default.isEmpty, _ramda2.default.always(undefined), _ramda2.default.identity), _ramda2.default.map(_ramda2.default.prop('id')))(value));
  };

  this.errorProcessor = function (_ref2) {
    var key = _ref2.key,
        args = _ref2.args;
    var _props$formContext2 = _this2.props.formContext,
        i18nInstance = _props$formContext2.i18nInstance,
        i18nPath = _props$formContext2.i18nPath;

    return i18nInstance.t(i18nPath ? '' + i18nPath + key : key, args);
  };
};

exports.default = FileUploadWidget;