'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = exports.formatDateCustom = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/ru');

require('react-datetime/css/react-datetime.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

//export const formatDateCustom = (format) => (date) => date
//  ? moment(new Date(date)).format(format)
//  : undefined
//export const formatDate = formatDateCustom('DD.MM.YYYY HH:mm')
//
//function isValid(current) {
//  const yesterday = Datetime.moment().subtract( 1, 'day' )
//  return current.isAfter(yesterday)
//}

var formatDateCustom = exports.formatDateCustom = function formatDateCustom(format) {
  return function (date) {
    //  console.log('formatDate', date, 'type is', typeof date)
    if (!(0, _moment2.default)(date, format, true).isValid()) return date;
    return date ? (0, _moment2.default)(new Date(date)).format(format) : undefined;
  };
};
var formatDate = exports.formatDate = formatDateCustom('DD.MM.YYYY HH:mm');

function isValid(current) {
  var yesterday = _reactDatetime2.default.moment().subtract(1, 'day');
  return current.isAfter(yesterday);
}

function DateTimeInputWidget(props) {
  var id = props.id,
      value = props.value,
      readonly = props.readonly,
      autofocus = props.autofocus,
      _onChange = props.onChange,
      options = props.options,
      schema = props.schema,
      formContext = props.formContext,
      registry = props.registry,
      inputProps = _objectWithoutProperties(props, ['id', 'value', 'readonly', 'autofocus', 'onChange', 'options', 'schema', 'formContext', 'registry']);

  //  console.log('value', value , 'is date valid:', moment(value, dateTimeFormat, true).isValid(), 'js format', new Date(value))


  return _react2.default.createElement(_reactDatetime2.default, {
    locale: 'ru',
    name: id,
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    value: value,
    timeConstraints: {
      minutes: {
        step: 5
      }
    },
    inputProps: {
      className: formContext && formContext.preview ? 'ant-input ant-input-lg' : 'form-control',
      placeholder: 'ДД.ММ.ГГГГ чч:мм'
    },
    isValidDate: isValid,
    onChange: function onChange(value) {
      _onChange(formatDate(value));
    }
  });
}

exports.default = DateTimeInputWidget;