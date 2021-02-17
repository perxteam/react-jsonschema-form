"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _reactTelephoneInput = require("react-telephone-input");

var _reactTelephoneInput2 = _interopRequireDefault(_reactTelephoneInput);

require("react-telephone-input/lib/withStyles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneInputWidget = function (_React$Component) {
  _inherits(PhoneInputWidget, _React$Component);

  function PhoneInputWidget(props) {
    _classCallCheck(this, PhoneInputWidget);

    var _this = _possibleConstructorReturn(this, (PhoneInputWidget.__proto__ || Object.getPrototypeOf(PhoneInputWidget)).call(this, props));

    _this.getPrefixCheck = function (code) {
      var onlyCountries = _this.props.options.onlyCountries;

      var _R$compose = _ramda2.default.compose(_ramda2.default.pick(["dialCode", "format"]), _ramda2.default.find(_ramda2.default.propEq("iso2", code)))(onlyCountries),
          dialCode = _R$compose.dialCode,
          format = _R$compose.format;

      var prefix = Array.from(dialCode).reduce(function (result, current) {
        return result.replace(".", current);
      }, format).match(/(^\+\d+ ?).*/)[1];

      return new RegExp("(^\\" + prefix + ")(.*)");
    };

    _this.onChange = function (value) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          id = _this$props.id,
          formContext = _this$props.formContext;
      var prefixCheck = _this.state.prefixCheck;

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

    var country = props.options.country;


    _this.state = {
      prefixCheck: _this.getPrefixCheck(country),
      countryCode: country
    };
    return _this;
  }

  _createClass(PhoneInputWidget, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var onChange = this.props.onChange;
      var formContext = nextProps.formContext,
          _nextProps$schema = nextProps.schema,
          masterFieldId = _nextProps$schema.masterFieldId,
          _nextProps$schema$cou = _nextProps$schema.countries,
          countries = _nextProps$schema$cou === undefined ? [] : _nextProps$schema$cou;


      var nextCountryName = formContext.formData[masterFieldId];
      var nextCountry = countries.find(function (curr) {
        return curr.name === nextCountryName;
      });

      if (nextCountry && nextCountry.code !== this.state.countryCode) {
        this.setState({
          prefixCheck: this.getPrefixCheck(nextCountry.code),
          countryCode: nextCountry.code
        });

        onChange(undefined);
      }
    }
  }, {
    key: "shouldComponentUpdate",
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
    key: "render",
    value: function render() {
      var _props = this.props,
          schema = _props.schema,
          id = _props.id,
          options = _props.options,
          value = _props.value,
          onBlur = _props.onBlur,
          placeholder = _props.placeholder,
          formContext = _props.formContext;
      var countryCode = this.state.countryCode;
      var cssPrefix = formContext.cssPrefix;

      return _react2.default.createElement(_reactTelephoneInput2.default, {
        value: value,
        name: id,
        className: cssPrefix + "__phone-input",
        pattern: schema.mask
        // defaultCountry={options.country}
        , defaultCountry: countryCode,
        flagsImagePath: options.apiRoot + "/assets/images/flags.png",
        onlyCountries: options.onlyCountries,
        onBlur: onBlur && function (value) {
          return onBlur(id, event);
        },
        onFocus: function onFocus() {
          return formContext.setTouched(id);
        },
        placeholder: placeholder,
        onChange: this.onChange });
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