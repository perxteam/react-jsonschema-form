'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _reactInputMask = require('react-input-mask');

var _reactInputMask2 = _interopRequireDefault(_reactInputMask);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/ru');

require('react-datetime/css/react-datetime.css');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validateDates = function validateDates(availableDates) {
  return function (current) {
    if (availableDates === 'future') {
      var yesterday = _reactDatetime2.default.moment().subtract(1, 'day');
      return current.isAfter(yesterday);
    }
    if (availableDates === 'past') {
      return (0, _moment2.default)(current).isBefore();
    }
    return true;
  };
};

var DateTimeInputWidget = function (_React$Component) {
  _inherits(DateTimeInputWidget, _React$Component);

  function DateTimeInputWidget(props) {
    _classCallCheck(this, DateTimeInputWidget);

    var _this = _possibleConstructorReturn(this, (DateTimeInputWidget.__proto__ || Object.getPrototypeOf(DateTimeInputWidget)).call(this, props));

    _this.renderInput = function (props, openCalendar) {
      var _this$props = _this.props,
          id = _this$props.id,
          value = _this$props.value,
          _onChange = _this$props.onChange,
          onBlur = _this$props.onBlur,
          placeholder = _this$props.placeholder,
          dateTimeWidgetType = _this$props.options.dateTimeWidgetType,
          formContext = _this$props.formContext;

      var _ref = value ? value.split(' ') : [],
          _ref2 = _slicedToArray(_ref, 2),
          _ref2$ = _ref2[0],
          date = _ref2$ === undefined ? '' : _ref2$,
          _ref2$2 = _ref2[1],
          time = _ref2$2 === undefined ? '' : _ref2$2;

      var _ref3 = date ? date.split('.') : [],
          _ref4 = _slicedToArray(_ref3, 3),
          _ref4$ = _ref4[0],
          day = _ref4$ === undefined ? '' : _ref4$,
          _ref4$2 = _ref4[1],
          month = _ref4$2 === undefined ? '' : _ref4$2,
          _ref4$3 = _ref4[2],
          year = _ref4$3 === undefined ? '' : _ref4$3;

      var D = void 0;
      var format = void 0;
      if (day.startsWith('3')) {
        D = '[01]';
      } else if (day.startsWith('0')) {
        D = '[1-9]';
      } else {
        D = '[0-9]';
      }

      var M = void 0;
      if (month.startsWith('1')) {
        M = '[0-2]';
      } else if (month.startsWith('0')) {
        M = '[1-9]';
      } else {
        M = '[0-9]';
      }

      var defaultPlaceholder = void 0;
      var mask = void 0;
      if (!dateTimeWidgetType || dateTimeWidgetType === 'dateTime') {
        defaultPlaceholder = 'ДД.ММ.ГГГГ чч:мм';
        mask = 'dD.mM.y999 12:39';
        format = 'DD.MM.YYYY HH:mm';
      } else if (dateTimeWidgetType === 'date') {
        defaultPlaceholder = 'ДД.ММ.ГГГГ';
        mask = 'dD.mM.y999';
        format = 'DD.MM.YYYY';
      } else if (dateTimeWidgetType === 'time') {
        defaultPlaceholder = 'ЧЧ:ММ';
        mask = '12:39';
        format = 'HH:mm';
      }

      var cssPrefix = formContext.cssPrefix;

      return _react2.default.createElement(_reactInputMask2.default, {
        mask: mask,
        maskChar: '_',
        placeholder: placeholder || defaultPlaceholder,
        className: formContext && formContext.preview ? 'ant-input ant-input-lg' : cssPrefix + '__form-control',
        onChange: function onChange(event) {
          _onChange(event.target.value);
        },
        onBlur: onBlur && function (_ref5) {
          var value = _ref5.target.value;

          if (/\d/.test(value)) {
            formContext.setDirty(id);
            _onChange(value);
          } else {
            _onChange(undefined);
          }
        },
        onFocus: function onFocus(a) {
          formContext.setTouched(id);
        },
        onClick: openCalendar,
        value: value || '',
        formatChars: {
          '9': '[0-9]',
          'd': '[0-3]',
          'D': D,
          'm': '[01]',
          'M': M,
          'y': '[12]',
          '1': '[0-2]',
          '2': time.startsWith('2') ? '[0-3]' : '[0-9]',
          '3': '[0-5]'
        }
      });
    };

    var i18nInstance = props.formContext.i18nInstance;

    var locale = 'ru';
    if (i18nInstance) {
      locale = i18nInstance.language;
    }
    _this.state = { locale: locale };
    return _this;
  }

  _createClass(DateTimeInputWidget, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          id = _props.id,
          value = _props.value,
          readonly = _props.readonly,
          autofocus = _props.autofocus,
          _onChange2 = _props.onChange,
          onBlur = _props.onBlur,
          options = _props.options,
          schema = _props.schema,
          formContext = _props.formContext,
          registry = _props.registry,
          inputProps = _objectWithoutProperties(_props, ['id', 'value', 'readonly', 'autofocus', 'onChange', 'onBlur', 'options', 'schema', 'formContext', 'registry']);

      //  console.log('value', value , 'is date valid:', moment(value, dateTimeFormat, true).isValid(), 'js format', new Date(value))


      var dateTimeWidgetType = options.dateTimeWidgetType,
          dateTimeAvailableDates = options.dateTimeAvailableDates;

      var dateFormat = false,
          timeFormat = false,
          format = void 0,
          viewMode = 'days';
      if (!dateTimeWidgetType || dateTimeWidgetType === 'dateTime') {
        dateFormat = 'DD.MM.YYYY';
        timeFormat = 'HH:mm';
        format = 'DD.MM.YYYY HH:mm';
      } else if (dateTimeWidgetType === 'date') {
        dateFormat = 'DD.MM.YYYY';
        format = 'DD.MM.YYYY';
      } else if (dateTimeWidgetType === 'time') {
        timeFormat = 'HH:mm';
        format = 'HH:mm';
        viewMode = 'time';
      }
      var cssPrefix = formContext.cssPrefix;
      var locale = this.state.locale;

      return _react2.default.createElement(_reactDatetime2.default, {
        locale: locale,
        name: id,
        className: cssPrefix + '__date-time-picker',
        dateFormat: dateFormat,
        timeFormat: timeFormat,
        value: value,
        viewMode: viewMode,
        timeConstraints: {
          minutes: {
            step: 5
          }
        },
        isValidDate: validateDates(dateTimeAvailableDates),
        onBlur: onBlur && function (value) {
          if (/\d/.test(value)) {
            formContext.setDirty(id);
            _onChange2((0, _utils.formatDateCustom)(format)(value));
          } else {
            _onChange2(undefined);
          }
        },
        onChange: function onChange(value) {
          _onChange2((0, _utils.formatDateCustom)(format)(value));
        },
        renderInput: this.renderInput,
        onFocus: function onFocus() {
          formContext.setTouched(id);
        }
      });
    }
  }]);

  return DateTimeInputWidget;
}(_react2.default.Component);

exports.default = DateTimeInputWidget;