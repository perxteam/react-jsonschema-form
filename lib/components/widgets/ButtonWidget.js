"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function ButtonWidget(props) {
  var value = props.value,
      label = props.label,
      readonly = props.readonly,
      autofocus = props.autofocus,
      onChange = props.onChange,
      options = props.options,
      schema = props.schema,
      formContext = props.formContext,
      registry = props.registry,
      inputProps = _objectWithoutProperties(props, ["value", "label", "readonly", "autofocus", "onChange", "options", "schema", "formContext", "registry"]);

  var mask = options.mask || '';
  var classNames = [formContext.preview ? "ant-btn" : "btn btn-primary", options.classNames].join(" ").trim();
  return _react2.default.createElement(
    "button",
    {
      className: classNames || undefined,
      onClick: options.type === 'reset' ? props.registry.resetForm : undefined,
      type: options.type
    },
    label || 'Button'
  );
}

exports.default = ButtonWidget;