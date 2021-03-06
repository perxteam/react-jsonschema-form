"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectField = function (_Component) {
  _inherits(ObjectField, _Component);

  function ObjectField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ObjectField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ObjectField.__proto__ || Object.getPrototypeOf(ObjectField)).call.apply(_ref, [this].concat(args))), _this), _this.onPropertyChange = function (name) {
      return function (value, options) {
        var newFormData = _extends({}, _this.props.formData, _defineProperty({}, name, value));
        _this.props.onChange(newFormData, options);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ObjectField, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return (0, _utils.shouldRender)(this, nextProps, nextState);
    }
  }, {
    key: "isRequired",
    value: function isRequired(name) {
      var schema = this.props.schema;
      return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          uiSchema = _props.uiSchema,
          formData = _props.formData,
          errorSchema = _props.errorSchema,
          idSchema = _props.idSchema,
          name = _props.name,
          required = _props.required,
          disabled = _props.disabled,
          readonly = _props.readonly,
          onBlur = _props.onBlur;
      var _props$registry = this.props.registry,
          definitions = _props$registry.definitions,
          fields = _props$registry.fields,
          formContext = _props$registry.formContext;
      var SchemaField = fields.SchemaField,
          TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;

      var schema = (0, _utils.retrieveSchema)(this.props.schema, definitions);
      var title = schema.title === undefined ? name : schema.title;
      var orderedProperties = void 0;
      try {
        var properties = Object.keys(schema.properties);
        orderedProperties = (0, _utils.orderProperties)(properties, uiSchema["ui:order"]);
      } catch (err) {
        var cssPrefix = formContext.cssPrefix;

        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "p",
            { className: cssPrefix + "__config-error", style: { color: "red" } },
            "Invalid ",
            name || "root",
            " object field configuration:",
            _react2.default.createElement(
              "em",
              null,
              err.message
            ),
            "."
          ),
          _react2.default.createElement(
            "pre",
            null,
            JSON.stringify(schema)
          )
        );
      }
      return _react2.default.createElement(
        "fieldset",
        null,
        title ? _react2.default.createElement(TitleField, {
          id: idSchema.$id + "__title",
          title: title,
          required: required,
          formContext: formContext }) : null,
        schema.description ? _react2.default.createElement(DescriptionField, {
          id: idSchema.$id + "__description",
          description: schema.description,
          formContext: formContext }) : null,
        orderedProperties.map(function (name, index) {
          return _react2.default.createElement(SchemaField, { key: index,
            name: name,
            required: _this2.isRequired(name),
            schema: schema.properties[name],
            uiSchema: uiSchema[name],
            errorSchema: errorSchema[name],
            idSchema: idSchema[name],
            formData: formData[name],
            onChange: _this2.onPropertyChange(name),
            onBlur: onBlur,
            registry: _this2.props.registry,
            disabled: disabled,
            readonly: readonly });
        })
      );
    }
  }]);

  return ObjectField;
}(_react.Component);

ObjectField.defaultProps = {
  uiSchema: {},
  formData: {},
  errorSchema: {},
  idSchema: {},
  registry: (0, _utils.getDefaultRegistry)(),
  required: false,
  disabled: false,
  readonly: false
};


if (process.env.NODE_ENV !== "production") {
  ObjectField.propTypes = {
    schema: _react.PropTypes.object.isRequired,
    uiSchema: _react.PropTypes.object,
    errorSchema: _react.PropTypes.object,
    idSchema: _react.PropTypes.object,
    onChange: _react.PropTypes.func.isRequired,
    formData: _react.PropTypes.object,
    required: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    readonly: _react.PropTypes.bool,
    registry: _react.PropTypes.shape({
      widgets: _react.PropTypes.objectOf(_react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.object])).isRequired,
      fields: _react.PropTypes.objectOf(_react.PropTypes.func).isRequired,
      definitions: _react.PropTypes.object.isRequired,
      formContext: _react.PropTypes.object.isRequired
    })
  };
}

exports.default = ObjectField;