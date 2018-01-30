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

  it('should not change initial state after mount', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    assert.equal(wrapper.state().formData.foo, undefined)
  })

  it('should have date & time picker by default', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    assert.equal(wrapper.find('.rdtTimeToggle').length, 1)
    assert.equal(wrapper.find('.rdtDays').length, 1)
  })

})
