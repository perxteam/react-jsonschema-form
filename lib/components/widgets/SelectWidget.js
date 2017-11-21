"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue(_ref, value) {
  var type = _ref.type,
      items = _ref.items;

  if (value === "") {
    return undefined;
  } else if (type === "array" && items && ["number", "integer"].includes(items.type)) {
    return value.map(_utils.asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return (0, _utils.asNumber)(value);
  }
  return value;
}

function getValue(event, multiple) {
  if (multiple) {
    return [].slice.call(event.target.options).filter(function (o) {
      return o.selected;
    }).map(function (o) {
      return o.value;
    });
  } else {
    return event.target.value;
  }
}

function SelectWidget(_ref2) {
  var schema = _ref2.schema,
      id = _ref2.id,
      options = _ref2.options,
      value = _ref2.value,
      required = _ref2.required,
      disabled = _ref2.disabled,
      readonly = _ref2.readonly,
      multiple = _ref2.multiple,
      autofocus = _ref2.autofocus,
      _onChange = _ref2.onChange,
      onBlur = _ref2.onBlur,
      placeholder = _ref2.placeholder,
      formContext = _ref2.formContext;
  var enumOptions = options.enumOptions;

  var emptyValue = multiple ? [] : "";
  if (formContext && formContext.preview) {
    var Select = formContext.Select;

    var Option = Select.Option;
    return _react2.default.createElement(
      Select,
      {
        placeholder: placeholder,
        onChange: function onChange(value) {
          formContext.setDirty(id);
          formContext.setTouched(id);
          _onChange(processValue(schema, value));
        },
        value: value,
        required: required,
        disabled: disabled,
        readOnly: readonly,
        autoFocus: autofocus,
        id: id,
        size: "large",
        onFocus: function onFocus() {
          return formContext.setTouched(id);
        }
      },
      enumOptions.map(function (_ref3, i) {
        var value = _ref3.value,
            label = _ref3.label;
        return _react2.default.createElement(
          Option,
          { key: i, value: value },
          label
        );
      })
    );
  }

  var cssPrefix = formContext.cssPrefix;

  return _react2.default.createElement(
    "select",
    {
      id: id,
      multiple: multiple,
      placeholder: placeholder,
      className: cssPrefix + "__form-control",
      value: typeof value === "undefined" ? emptyValue : value,
      required: required,
      disabled: disabled,
      readOnly: readonly,
      autoFocus: autofocus,
      onBlur: onBlur && function (event) {
        var newValue = getValue(event, multiple);
        onBlur(id, processValue(schema, newValue));
      },
      onFocus: function onFocus() {
        return formContext.setTouched(id);
      },
      onChange: function onChange(event) {
        formContext.setDirty(id);
        formContext.setTouched(id);
        var newValue = getValue(event, multiple);
        _onChange(processValue(schema, newValue));
      } },
    !multiple && !schema.default && _react2.default.createElement(
      "option",
      { value: "" },
      placeholder
    ),
    enumOptions.map(function (_ref4, i) {
      var value = _ref4.value,
          label = _ref4.label;

      return _react2.default.createElement(
        "option",
        { key: i, value: value },
        label
      );
    })
  );
}

SelectWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    id: _react.PropTypes.string.isRequired,
    options: _react.PropTypes.shape({
      enumOptions: _react.PropTypes.array
    }).isRequired,
    value: _react.PropTypes.any,
    required: _react.PropTypes.bool,
    multiple: _react.PropTypes.bool,
    autofocus: _react.PropTypes.bool,
    onChange: _react.PropTypes.func,
    onBlur: _react.PropTypes.func
  };
}

exports.default = SelectWidget;