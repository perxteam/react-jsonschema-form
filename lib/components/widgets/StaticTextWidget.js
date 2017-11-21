"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function StaticTextWidget(props) {
  var value = props.value,
      readonly = props.readonly,
      autofocus = props.autofocus,
      onChange = props.onChange,
      options = props.options,
      schema = props.schema,
      formContext = props.formContext,
      registry = props.registry,
      inputProps = _objectWithoutProperties(props, ["value", "readonly", "autofocus", "onChange", "options", "schema", "formContext", "registry"]);

  var mask = options.mask || '';
  return _react2.default.createElement("div", {
    className: options.classNames,
    dangerouslySetInnerHTML: { __html: options.content }
  });
}

exports.default = StaticTextWidget;