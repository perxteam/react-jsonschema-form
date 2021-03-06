"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function BaseInput(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  var id = props.id,
      value = props.value,
      readonly = props.readonly,
      autofocus = props.autofocus,
      onBlur = props.onBlur,
      options = props.options,
      schema = props.schema,
      formContext = props.formContext,
      registry = props.registry,
      inputProps = _objectWithoutProperties(props, ["id", "value", "readonly", "autofocus", "onBlur", "options", "schema", "formContext", "registry"]);
  //  console.log('Input context', formContext, 'props', props)


  var cssPrefix = formContext.cssPrefix;

  var classNames = [cssPrefix + "__form-control", formContext.preview ? "ant-input ant-input-lg" : "", options.inputClassNames].join(" ").trim();
  var _onChange = function _onChange(_ref) {
    var value = _ref.target.value;

    formContext.setDirty(id);
    formContext.setTouched(id);
    return props.onChange(value === "" ? undefined : value);
  };
  //  TODO prefix all ids
  //  const prefixedId = `${cssPrefix}__${id}`
  return _react2.default.createElement("input", _extends({}, inputProps, {
    id: id,
    name: id,
    className: classNames,
    readOnly: readonly,
    autoFocus: autofocus,
    value: value == null ? "" : value,
    onChange: _onChange,
    onBlur: onBlur && function (event) {
      return onBlur(id, event.target.value);
    },
    onFocus: function onFocus() {
      return formContext.setTouched(id);
    }
  }));
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: _react.PropTypes.string.isRequired,
    placeholder: _react.PropTypes.string,
    value: _react.PropTypes.any,
    required: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    readonly: _react.PropTypes.bool,
    autofocus: _react.PropTypes.bool,
    onChange: _react.PropTypes.func,
    onBlur: _react.PropTypes.func
  };
}

exports.default = BaseInput;