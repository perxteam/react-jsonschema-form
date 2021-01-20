'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _reactTelephoneInput = require('react-telephone-input');

var _reactTelephoneInput2 = _interopRequireDefault(_reactTelephoneInput);

require('react-telephone-input/lib/withStyles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneInputWidget = function (_React$Component) {
  _inherits(PhoneInputWidget, _React$Component);

  function PhoneInputWidget(props) {
    _classCallCheck(this, PhoneInputWidget);

    var _this = _possibleConstructorReturn(this, (PhoneInputWidget.__proto__ || Object.getPrototypeOf(PhoneInputWidget)).call(this, props));

    _initialiseProps.call(_this);

    var _props$options = props.options,
        country = _props$options.country,
        onlyCountries = _props$options.onlyCountries;

    var _R$compose = _ramda2.default.compose(_ramda2.default.pick(['dialCode', 'format']), _ramda2.default.find(_ramda2.default.propEq('iso2', country)))(onlyCountries),
        dialCode = _R$compose.dialCode,
        format = _R$compose.format;

    var prefix = Array.from(dialCode).reduce(function (result, current) {
      return result.replace('.', current);
    }, format).match(/(^\+\d+ ?).*/)[1];
    _this.state = { prefixCheck: new RegExp('(^\\' + prefix + ')(.*)') };
    return _this;
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
      var cssPrefix = formContext.cssPrefix;

      return _react2.default.createElement(_reactTelephoneInput2.default, {
        value: value,
        name: id,
        className: cssPrefix + '__phone-input',
        pattern: options.pattern,
        defaultCountry: options.country,
        flagsImagePath: options.apiRoot + '/assets/images/flags.png',
        onlyCountries: options.onlyCountries,
        onBlur: onBlur && function (value) {
          return onBlur(id, event);
        },
        onFocus: function onFocus() {
          return formContext.setTouched(id);
        },
        placeholder: placeholder,
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

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.onChange = function (value) {
    var _props2 = _this3.props,
        onChange = _props2.onChange,
        schema = _props2.schema,
        id = _props2.id,
        formContext = _props2.formContext;
    var prefixCheck = _this3.state.prefixCheck;

    var match = value && value.match(prefixCheck);
    var prefix = match && match[1];

    if (prefix && prefix.length) {
      formContext.setDirty(id);
    } else {
      formContext.setTouched(id);
    }

    var parsedValue = match && match[2];
    if (value === prefix) {
      onChange(undefined);
    } else if (parsedValue) {
      onChange(value);
    }
  };
};

exports.default = PhoneInputWidget;