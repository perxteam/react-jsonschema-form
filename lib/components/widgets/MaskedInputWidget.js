"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactInputMask = require("react-input-mask");

var _reactInputMask2 = _interopRequireDefault(_reactInputMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function MaskedInputWidget(props) {
  var id = props.id,
      value = props.value,
      readonly = props.readonly,
      autofocus = props.autofocus,
      _onChange = props.onChange,
      options = props.options,
      schema = props.schema,
      formContext = props.formContext,
      registry = props.registry,
      inputProps = _objectWithoutProperties(props, ["id", "value", "readonly", "autofocus", "onChange", "options", "schema", "formContext", "registry"]);

  var cssPrefix = formContext.cssPrefix;

  var classNames = [cssPrefix + "__form-control", formContext.preview ? "ant-input ant-input-lg" : "", options.inputClassNames].join(" ").trim();
  var mask = options.mask || '';

  return _react2.default.createElement(_reactInputMask2.default, _extends({}, inputProps, {
    name: id,
    type: "text",
    mask: mask,
    className: classNames,
    maskChar: null,
    readOnly: readonly,
    autoFocus: autofocus,
    value: typeof value === "undefined" ? "" : value,
    onChange: function onChange(event) {
      return _onChange(event.target.value);
    }
  }));
}

exports.default = MaskedInputWidget;