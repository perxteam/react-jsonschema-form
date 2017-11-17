'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTelephoneInput = require('@oledm/react-telephone-input');

var _reactTelephoneInput2 = _interopRequireDefault(_reactTelephoneInput);

require('@oledm/react-telephone-input/lib/withStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneInputWidget = function (_React$Component) {
  _inherits(PhoneInputWidget, _React$Component);

  function PhoneInputWidget() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PhoneInputWidget);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PhoneInputWidget.__proto__ || Object.getPrototypeOf(PhoneInputWidget)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (value) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          schema = _this$props.schema;

      var match = value && value.match(/(^\+\w* )(.*)/);
      var prefix = match && match[1];
      var parsedValue = match && match[2];
      if (value === prefix) {
        onChange(undefined);
      } else if (parsedValue) {
        onChange(value);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PhoneInputWidget, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _this2 = this;

      // This is required only when widget is in constructor-mode (opposite preview-mode).
      if (nextProps.options.country !== this.props.options.country) {
        setTimeout(function () {
          _this2.forceUpdate();
        }, 0);
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          schema = _props.schema,
          id = _props.id,
          options = _props.options,
          value = _props.value,
          required = _props.required,
          disabled = _props.disabled,
          readonly = _props.readonly,
          multiple = _props.multiple,
          autofocus = _props.autofocus,
          onBlur = _props.onBlur,
          placeholder = _props.placeholder,
          formContext = _props.formContext;
      //    console.log('Countries available:', options.onlyCountries)
      //        flagsImagePath={`${options.apiRoot}/assets/images/flags.png`}
      //        onChangeCountry={(country) => {
      //          console.log('country from widget', country)
      //        }}

      return _react2.default.createElement(_reactTelephoneInput2.default, {
        value: value,
        name: id,
        defaultCountry: options.country,
        flagsImagePath: options.apiRoot + '/assets/images/flags.png',
        onlyCountries: options.onlyCountries,
        onBlur: onBlur && function (value) {
          return onBlur(id, event);
        },
        onFocus: function onFocus() {
          return formContext.setTouched(id);
        },
        onChange: this.onChange
      });
    }
  }]);

  return PhoneInputWidget;
}(_react2.default.Component);

//PhoneInputWidget.defaultProps = {
//  autofocus: false,
//};
//
//if (process.env.NODE_ENV !== "production") {
//  PhoneInputWidget.propTypes = {
//    schema: PropTypes.object.isRequired,
//    id: PropTypes.string.isRequired,
//    options: PropTypes.shape({
//      enumOptions: PropTypes.array,
//    }).isRequired,
//    value: PropTypes.any,
//    required: PropTypes.bool,
//    multiple: PropTypes.bool,
//    autofocus: PropTypes.bool,
//    onChange: PropTypes.func,
//    onBlur: PropTypes.func,
//  };
//}

exports.default = PhoneInputWidget;