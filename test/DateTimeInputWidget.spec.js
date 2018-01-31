import React from 'react'
import R from 'ramda'
import { assert } from 'chai'
import { spy } from 'sinon'
import { mount, shallow, configure } from 'enzyme'
import Form from "../src";
import moment from 'moment'
import Adapter from 'enzyme-adapter-react-15';
import simulant from 'simulant'
import ReactTestUtils from 'react-dom/test-utils'
import { formatDateCustom } from '../src/utils'

configure({ adapter: new Adapter() });

function createFormComponent(props, node) {
  const options = {}
  if (node) {
    options.attachTo = node
  }
  return mount(
    <Form
      {...props}
      safeRenderCompletion={true}
    />,
    Object.keys(options).length ? options : undefined
  )
}

const schema = {
  type: "object",
  properties: {
    foo: {
      type: "string",
      title: "DateTime",
    },
  }
}

const uiSchema = {
  foo: {
    "ui:widget": "dateTime",
    "ui:dateTimeWidgetType": "dateTime",
  },
}

const defaultFormat = 'DD.MM.YYYY HH:mm'

const utils = {
  mouseUp() {
    const event = simulant('mouseup')
    const target = document.body
    simulant.fire( target, event )
  },
  focus(component) {
    component.find('DateTimeInputWidget').find('InputElement').simulate('focus')
  },
  selectDay(component, day) {
    component.find('.rdtDay').not('.rdtOld').at(day - 1).simulate('click')
  },
  toggleTimeView(component) {
    component.find('.rdtTimeToggle').simulate('click')
  },
  increaseHour(component) {
    component.find('.rdtCounter .rdtBtn').at(0).simulate('mouseDown')
  },
  decreaseHour(component) {
    component.find('.rdtCounter .rdtBtn').at(1).simulate('mouseDown')
  },
  increaseMinute(component) {
    component.find('.rdtCounter .rdtBtn').at(2).simulate('mouseDown')
  },
  decreaseMinute(component) {
    component.find('.rdtCounter .rdtBtn').at(3).simulate('mouseDown')
  },
  manualInput(component, value) {
    const input = component.find('DateTimeInputWidget InputElement').instance()
    const target = component.find('DateTimeInputWidget InputElement input').getDOMNode()

    target.focus()
    ReactTestUtils.Simulate.focus(target);

    input.setCursorPos(0);
    target.value = value
    input.setCursorPos(value.length);

    ReactTestUtils.Simulate.change(target)
    ReactTestUtils.Simulate.change(target)
    console.log('value:', target.value)
  },
  continueInput(component, value) {
    const input = component.find('DateTimeInputWidget InputElement').instance()
    const target = component.find('DateTimeInputWidget InputElement input').getDOMNode()
    const pos = input.getCursorPos();
    console.log('position', pos)

//    target.focus()
//    ReactTestUtils.Simulate.focus(target);
//
//    input.setCursorPos(0);
    target.value = value
    input.setCursorPos(value.length);

    ReactTestUtils.Simulate.change(target)
    ReactTestUtils.Simulate.change(target)
    console.log('value:', target.value)
  },
}

describe('Testing component "DateTimeInput"', function () {
  it('should have default placeholder in format: "ДД.ММ.ГГГГ чч:мм"', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    assert.equal(wrapper.find('InputElement').prop('placeholder'), 'ДД.ММ.ГГГГ чч:мм')
  })

  it('should have date & time picker by default', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    assert.equal(wrapper.find('.rdtTimeToggle').length, 1)
    assert.equal(wrapper.find('.rdtDays').length, 1)
  })

  it('should not change initial state after mount', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    assert.equal(wrapper.state().formData.foo, undefined)
  })

  it('should change state with masked string after calendar opened', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    utils.focus(wrapper)
    assert.equal(wrapper.state().formData.foo, '__.__.____ __:__')
  })

  it('should set state to datetime string when calendar day select', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    utils.selectDay(wrapper, 1)
    const firstDayOfCurrentMonth = moment().date(1).hour(0).minute(0).format(defaultFormat)
    assert.equal(wrapper.state().formData.foo, firstDayOfCurrentMonth)
  })

  it('should set time in state according to TimeView controls', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    utils.focus(wrapper)
    utils.selectDay(wrapper, 1)
    utils.toggleTimeView(wrapper)

    // Set time to 2 hours 10 minutes (minutes step set to 5 in DateTimeInputWidget.js)
    // Toggle "up" contorls
    utils.increaseHour(wrapper)
    utils.increaseHour(wrapper)
    utils.increaseHour(wrapper)
    utils.mouseUp()
    utils.increaseMinute(wrapper)
    utils.increaseMinute(wrapper)
    utils.increaseMinute(wrapper)
    utils.increaseMinute(wrapper)
    utils.mouseUp()
    // Toggle "down" contorls
    utils.decreaseHour(wrapper)
    utils.mouseUp()
    utils.decreaseMinute(wrapper)
    utils.decreaseMinute(wrapper)
    utils.mouseUp()

    const firstDayOfCurrentMonth = moment().date(1).hour(2).minute(10).format(defaultFormat)
    assert.equal(wrapper.state().formData.foo, firstDayOfCurrentMonth)
  })

  it('should afford to set datetime by manual input', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    utils.focus(wrapper)
    utils.manualInput(wrapper, '221120')
    assert.equal(wrapper.state().formData.foo, '22.11.20__ __:__')
  })

  it('should prevent from incorrect datetime input', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    utils.focus(wrapper)
    utils.manualInput(wrapper, '428352120')
    assert.equal(wrapper.state().formData.foo, '28.12.____ __:__')
    utils.continueInput(wrapper, '11')
    console.log('state', wrapper.state().formData.foo)
  })
})
