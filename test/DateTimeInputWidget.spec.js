import React from 'react'
import R from 'ramda'
import { assert } from 'chai'
import { spy } from 'sinon'
import { mount, shallow, configure } from 'enzyme'
import Form from "../src";
import moment from 'moment'
import Adapter from 'enzyme-adapter-react-15';
import { formatDateCustom } from '../src/utils'

configure({ adapter: new Adapter() });

function createFormComponent(props) {
  return mount(
    <Form
      {...props}
      safeRenderCompletion={true}
    />
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
    wrapper.find('DateTimeInputWidget').find('InputElement').simulate('focus')
    assert.equal(wrapper.state().formData.foo, '__.__.____ __:__')
  })

  it('should fill state with correct datetime string', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    wrapper.find('DateTimeInputWidget').find('InputElement').simulate('focus')
    wrapper.find('.rdtDay').not('.rdtOld').at(0).simulate('click')
    const defaultFormat = 'DD.MM.YYYY HH:mm'
    const firstDayOfCurrentMonth = moment().date(1).hour(0).minute(0).format(defaultFormat)
    assert.equal(wrapper.state().formData.foo, firstDayOfCurrentMonth)
  })

  it('should change time with 5 minutes step', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    wrapper.find('DateTimeInputWidget').find('InputElement').simulate('focus')
    wrapper.find('.rdtDay').not('.rdtOld').at(0).simulate('click')
    wrapper.find('.rdtTimeToggle').simulate('click')

    console.log('is timeview', wrapper.find('.rdtPicker .rdtTime').length)
    wrapper.find('.rdtCounter .rdtBtn').at(0).simulate('mouseDown')
    wrapper.find('.rdtCounter .rdtBtn').at(1).simulate('mouseDown')
    wrapper.find('.rdtCounter .rdtBtn').at(2).simulate('mouseDown')
    wrapper.find('.rdtCounter .rdtBtn').at(3).simulate('mouseDown')
//    console.log('counters', wrapper.find('.rdtCounter .rdtBtn').at(0).debug())
//    console.log('counters', wrapper.find('DateTimeInputWidget').find('.rdtCount').at(1).text())
//    console.log('counters', wrapper.find('.rdtCounter').at(0).find('.rdtBtn').at(0).props('onMouseDown'))
//    wrapper.find('.rdtCounter').at(0).find('.rdtBtn').at(0).props('onMouseDown')

//    const defaultFormat = 'DD.MM.YYYY HH:mm'
//    const firstDayOfCurrentMonth = moment().date(1).hour(0).minute(0).format(defaultFormat)

    console.log('state', wrapper.state().formData.foo)
//    assert.equal(wrapper.state().formData.foo, firstDayOfCurrentMonth)
  })

})
