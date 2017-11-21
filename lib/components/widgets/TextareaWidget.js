"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextareaWidget(_ref) {
  var schema = _ref.schema,
      id = _ref.id,
      placeholder = _ref.placeholder,
      value = _ref.value,
      required = _ref.required,
      disabled = _ref.disabled,
      readonly = _ref.readonly,
      autofocus = _ref.autofocus,
      options = _ref.options,
      onChange = _ref.onChange,
      formContext = _ref.formContext,
      onBlur = _ref.onBlur;

  var _onChange = function _onChange(_ref2) {
    var value = _ref2.target.value;

    return onChange(value === "" ? undefined : value);
  };

  var cssPrefix = formContext.cssPrefix;

  var classNames = [cssPrefix + "__form-control", formContext.preview ? "ant-input" : "", options.inputClassNames].join(" ").trim();
  return _react2.default.createElement("textarea", {
    id: id,
    name: id,
    className: classNames,
    value: typeof value === "undefined" ? "" : value,
    placeholder: placeholder,
    required: required,
    disabled: disabled,
    readOnly: readonly,
    autoFocus: autofocus,
    onBlur: onBlur && function (event) {
      return onBlur(id, event.target.value);
    },
    onChange: _onChange });
}

TextareaWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  TextareaWidget.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    id: _react.PropTypes.string.isRequired,
    placeholder: _react.PropTypes.string,
    value: _react.PropTypes.string,
    required: _react.PropTypes.bool,
    autofocus: _react.PropTypes.bool,
    onChange: _react.PropTypes.func,
    onBlur: _react.PropTypes.func
  };
}

exports.default = TextareaWidget;