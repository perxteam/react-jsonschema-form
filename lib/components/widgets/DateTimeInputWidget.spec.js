'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _chai = require('chai');

var _sinon = require('sinon');

var _enzyme = require('enzyme');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _simulant = require('simulant');

var _simulant2 = _interopRequireDefault(_simulant);

var _testUtils = require('react-dom/test-utils');

var _testUtils2 = _interopRequireDefault(_testUtils);

var _Form = require('components/Form');

var _Form2 = _interopRequireDefault(_Form);

var _utils = require('utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

function createFormComponent(props, node) {
  var options = {};
  if (node) {
    options.attachTo = node;
  }
  return (0, _enzyme.mount)(_react2.default.createElement(_Form2.default, _extends({}, props, {
    safeRenderCompletion: true
  })), Object.keys(options).length ? options : undefined);
}

var schema = {
  type: "object",
  properties: {
    foo: {
      type: "string",
      title: "DateTime"
    }
  }
};

var uiSchema = {
  foo: {
    "ui:widget": "dateTime",
    "ui:dateTimeWidgetType": "dateTime"
  }
};

var defaultFormat = 'DD.MM.YYYY HH:mm';

var utils = {
  mouseUp: function mouseUp() {
    var event = (0, _simulant2.default)('mouseup');
    var target = document.body;
    _simulant2.default.fire(target, event);
  },
  focus: function focus(component) {
    component.find('DateTimeInputWidget').find('InputElement').simulate('focus');
  },
  selectDay: function selectDay(component, day) {
    component.find('.rdtDay').not('.rdtOld').at(day - 1).simulate('click');
  },
  toggleTimeView: function toggleTimeView(component) {
    component.find('.rdtTimeToggle').simulate('click');
  },
  increaseHour: function increaseHour(component) {
    component.find('.rdtCounter .rdtBtn').at(0).simulate('mouseDown');
  },
  decreaseHour: function decreaseHour(component) {
    component.find('.rdtCounter .rdtBtn').at(1).simulate('mouseDown');
  },
  increaseMinute: function increaseMinute(component) {
    component.find('.rdtCounter .rdtBtn').at(2).simulate('mouseDown');
  },
  decreaseMinute: function decreaseMinute(component) {
    component.find('.rdtCounter .rdtBtn').at(3).simulate('mouseDown');
  },
  manualInput: function manualInput(component, value) {
    var input = component.find('DateTimeInputWidget InputElement').instance();
    var target = component.find('DateTimeInputWidget InputElement input').getDOMNode();

    target.focus();
    _testUtils2.default.Simulate.focus(target);

    input.setCursorPos(0);
    target.value = value;
    input.setCursorPos(value.length);

    _testUtils2.default.Simulate.change(target);
    _testUtils2.default.Simulate.change(target);
  },
  continueManualInput: function continueManualInput(component, value) {
    var input = component.find('DateTimeInputWidget InputElement').instance();
    var target = component.find('DateTimeInputWidget InputElement input').getDOMNode();

    target.focus();
    _testUtils2.default.Simulate.focus(target);

    input.setCursorPos(0);
    var currentValue = target.value.match(/\d+/g).map(Number).join('');
    var newValue = currentValue + value;
    target.value = newValue;
    input.setCursorPos(newValue);

    _testUtils2.default.Simulate.change(target);
    _testUtils2.default.Simulate.change(target);
  },
  previousMonth: function previousMonth(component) {
    component.find('DateTimeInputWidget .rdtPrev').simulate('click');
  },
  nextMonth: function nextMonth(component) {
    component.find('DateTimeInputWidget .rdtNext').simulate('click');
  }
};

var splitDaysOnToday = _ramda2.default.compose(_ramda2.default.splitWhen(_ramda2.default.contains('rdtToday')), _ramda2.default.map(function (item) {
  return item.prop('className');
}));

var allIsDisabled = _ramda2.default.all(_ramda2.default.contains('rdtDisabled'));

var checkAllDaysIsDisabled = _ramda2.default.compose(allIsDisabled, _ramda2.default.map(function (item) {
  return item.prop('className');
}));

var checkTodayIsDisabled = _ramda2.default.compose(_ramda2.default.ifElse(_ramda2.default.isNil, _ramda2.default.identity, _ramda2.default.contains('rdtDisabled')), _ramda2.default.find(_ramda2.default.contains('rdtToday')), _ramda2.default.map(function (item) {
  return item.prop('className');
}));

var checkDaysBeforeTodayDisabled = _ramda2.default.compose(allIsDisabled, _ramda2.default.head, splitDaysOnToday);

var checkDaysFromTodayDisabled = _ramda2.default.compose(allIsDisabled, _ramda2.default.last, splitDaysOnToday);

var checkDaysAfterTodayDisabled = _ramda2.default.compose(allIsDisabled, _ramda2.default.drop(1), // omit .rdtToday, which must be enabled despite of ui:dateTimeAvailableDates
_ramda2.default.last, splitDaysOnToday);

describe('Testing component "DateTimeInput"', function () {
  it('should have default placeholder in format: "ДД.ММ.ГГГГ чч:мм"', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    _chai.assert.equal(wrapper.find('InputElement').prop('placeholder'), 'ДД.ММ.ГГГГ чч:мм');
  });

  it('should have date & time picker by default', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    _chai.assert.equal(wrapper.find('.rdtTimeToggle').length, 1);
    _chai.assert.equal(wrapper.find('.rdtDays').length, 1);
  });

  it('should not change initial state after mount', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    _chai.assert.equal(wrapper.state().formData.foo, undefined);
  });

  it('should change state with masked string after calendar opened', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    utils.focus(wrapper);
    _chai.assert.equal(wrapper.state().formData.foo, '__.__.____ __:__');
  });

  it('should set state to datetime string when calendar day select', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    utils.selectDay(wrapper, 1);
    var firstDayOfCurrentMonth = (0, _moment2.default)().date(1).hour(0).minute(0).format(defaultFormat);
    _chai.assert.equal(wrapper.state().formData.foo, firstDayOfCurrentMonth);
  });

  it('should set time in state according to TimeView controls', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    utils.focus(wrapper);
    utils.selectDay(wrapper, 1);
    utils.toggleTimeView(wrapper);

    // Set time to 2 hours 10 minutes (minutes step set to 5 in DateTimeInputWidget.js)
    // Toggle "up" contorls
    utils.increaseHour(wrapper);
    utils.increaseHour(wrapper);
    utils.increaseHour(wrapper);
    utils.mouseUp();
    utils.increaseMinute(wrapper);
    utils.increaseMinute(wrapper);
    utils.increaseMinute(wrapper);
    utils.increaseMinute(wrapper);
    utils.mouseUp();
    // Toggle "down" contorls
    utils.decreaseHour(wrapper);
    utils.mouseUp();
    utils.decreaseMinute(wrapper);
    utils.decreaseMinute(wrapper);
    utils.mouseUp();

    var firstDayOfCurrentMonth = (0, _moment2.default)().date(1).hour(2).minute(10).format(defaultFormat);
    _chai.assert.equal(wrapper.state().formData.foo, firstDayOfCurrentMonth);
  });

  it('should afford to set datetime by manual input', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    utils.focus(wrapper);
    utils.manualInput(wrapper, '221120');
    _chai.assert.equal(wrapper.state().formData.foo, '22.11.20__ __:__');
  });

  it('should prevent from incorrect datetime input', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    utils.manualInput(wrapper, '4953974321');
    _chai.assert.equal(wrapper.state().formData.foo, '31.__.____ __:__');
    wrapper.unmount();

    wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    utils.manualInput(wrapper, '9409');
    _chai.assert.equal(wrapper.state().formData.foo, '09.__.____ __:__');
    wrapper.unmount();

    wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    utils.manualInput(wrapper, '56629');
    _chai.assert.equal(wrapper.state().formData.foo, '29.__.____ __:__');
    wrapper.unmount();

    wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    utils.manualInput(wrapper, '985416');
    _chai.assert.equal(wrapper.state().formData.foo, '16.__.____ __:__');
    wrapper.unmount();

    wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    utils.manualInput(wrapper, '29182');
    _chai.assert.equal(wrapper.state().formData.foo, '29.12.____ __:__');
    utils.continueManualInput(wrapper, '9432132');
    _chai.assert.equal(wrapper.state().formData.foo, '29.12.2132 __:__');

    utils.continueManualInput(wrapper, '932543');
    _chai.assert.equal(wrapper.state().formData.foo, '29.12.2132 23:__');

    utils.continueManualInput(wrapper, '98659');
    _chai.assert.equal(wrapper.state().formData.foo, '29.12.2132 23:59');
  });

  it('should change behaviour when ui:dateTimeWidgetType is "date"', function () {
    var uiSchema = {
      foo: {
        "ui:widget": "dateTime",
        "ui:dateTimeWidgetType": "date"
      }
    };
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    _chai.assert.equal(wrapper.find('.rdtTimeToggle').length, 0);
    _chai.assert.equal(wrapper.find('.rdtDays').length, 1);
    _chai.assert.equal(wrapper.find('InputElement').prop('placeholder'), 'ДД.ММ.ГГГГ');

    utils.manualInput(wrapper, '31122999');
    _chai.assert.equal(wrapper.state().formData.foo, '31.12.2999');
  });

  it('should change behaviour when ui:dateTimeWidgetType is "time"', function () {
    var uiSchema = {
      foo: {
        "ui:widget": "dateTime",
        "ui:dateTimeWidgetType": "time"
      }
    };
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    _chai.assert.equal(wrapper.find('.rdtTime').length, 1);
    _chai.assert.equal(wrapper.find('.rdtDays').length, 0);
    _chai.assert.equal(wrapper.find('.rdtTimeToggle').length, 0);
    _chai.assert.equal(wrapper.find('InputElement').prop('placeholder'), 'ЧЧ:ММ');

    utils.manualInput(wrapper, '2359');
    _chai.assert.equal(wrapper.state().formData.foo, '23:59');
  });

  it('should change placeholder acorrding to "ui:options"->placeholder', function () {
    var placeholder = '223322223';
    var uiSchema = {
      foo: {
        "ui:widget": "dateTime",
        "ui:options": {
          placeholder: placeholder
        }
      }
    };
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    _chai.assert.equal(wrapper.find('InputElement').prop('placeholder'), placeholder);
  });

  it('should disable past dates when "ui:dateTimeAvailableDates" is "future"', function () {
    var uiSchema = {
      foo: {
        "ui:widget": "dateTime",
        "ui:dateTimeAvailableDates": "future"
      }
    };
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    var days = wrapper.find('.rdtDay');
    var isPastDaysDisabled = checkDaysBeforeTodayDisabled(days);
    _chai.assert.equal(isPastDaysDisabled, true);
    var isFutureDaysDisabled = checkDaysFromTodayDisabled(days);
    _chai.assert.equal(isFutureDaysDisabled, false);
    var isTodayDisabled = checkTodayIsDisabled(days);
    _chai.assert.equal(isTodayDisabled, false);

    utils.previousMonth(wrapper);
    days = wrapper.find('.rdtDay');
    var isPastDaysOfPreviousMonthDisabled = checkDaysBeforeTodayDisabled(days);
    _chai.assert.equal(isPastDaysOfPreviousMonthDisabled, true);
    var isFutureDaysOfPreviousMonthDisabled = checkDaysFromTodayDisabled(days);
    _chai.assert.equal(isFutureDaysOfPreviousMonthDisabled, false);
    isTodayDisabled = checkTodayIsDisabled(days);
    _chai.assert.oneOf(isTodayDisabled, [false, undefined]);

    utils.previousMonth(wrapper);
    days = wrapper.find('.rdtDay');
    var isAllDaysOfMonthDisabled = checkAllDaysIsDisabled(days);
    _chai.assert.equal(isAllDaysOfMonthDisabled, true);
    isTodayDisabled = checkTodayIsDisabled(days);
    _chai.assert.equal(isTodayDisabled, undefined);

    utils.nextMonth(wrapper);
    utils.nextMonth(wrapper);
    utils.nextMonth(wrapper);
    days = wrapper.find('.rdtDay');
    var isAllFutureDaysDisabled = checkAllDaysIsDisabled(days);
    _chai.assert.oneOf(isTodayDisabled, [false, undefined]);
  });

  it('should disable future dates when "ui:dateTimeAvailableDates" is "past"', function () {
    var uiSchema = {
      foo: {
        "ui:widget": "dateTime",
        "ui:dateTimeAvailableDates": "past"
      }
    };
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    var days = wrapper.find('.rdtDay');
    var isPastDaysDisabled = checkDaysBeforeTodayDisabled(days);
    _chai.assert.equal(isPastDaysDisabled, false);
    var isFutureDaysDisabled = checkDaysAfterTodayDisabled(days);
    _chai.assert.equal(isFutureDaysDisabled, true);
    var isTodayDisabled = checkTodayIsDisabled(days);
    _chai.assert.equal(isTodayDisabled, false);

    utils.previousMonth(wrapper);
    days = wrapper.find('.rdtDay');
    var isPastDaysOfPreviousMonthDisabled = checkDaysBeforeTodayDisabled(days);
    _chai.assert.equal(isPastDaysOfPreviousMonthDisabled, false);
    var isFutureDaysOfPreviousMonthDisabled = checkDaysAfterTodayDisabled(days);
    _chai.assert.equal(isFutureDaysOfPreviousMonthDisabled, true);
    isTodayDisabled = checkTodayIsDisabled(days);
    _chai.assert.oneOf(isTodayDisabled, [false, undefined]);

    utils.previousMonth(wrapper);
    days = wrapper.find('.rdtDay');
    var isAllDaysOfMonthDisabled = checkAllDaysIsDisabled(days);
    _chai.assert.equal(isAllDaysOfMonthDisabled, false);
    isTodayDisabled = checkTodayIsDisabled(days);
    _chai.assert.equal(isTodayDisabled, undefined);

    utils.nextMonth(wrapper);
    utils.nextMonth(wrapper);
    utils.nextMonth(wrapper);
    days = wrapper.find('.rdtDay');
    var isAllFutureDaysDisabled = checkAllDaysIsDisabled(wrapper.find('.rdtDay'));
    _chai.assert.equal(isAllFutureDaysDisabled, true);
    isTodayDisabled = checkTodayIsDisabled(days);
    _chai.assert.oneOf(isTodayDisabled, [false, undefined]);
  });
});