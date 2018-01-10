import React from 'react'
import { assert } from 'chai'
import { spy } from 'sinon'
import { mount, shallow } from 'enzyme'
import $ from 'jquery'
import Form from "../src";

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
      "type": "string",
      "title": "Обращение",
      "enum": [ "Mr", "Mrs" ],
      "enumNames": [ "Уважаемый", "Уважаемая" ],
    },
  }
}
const uiSchema = {
  foo: {
    "ui:widget": "select",
  },
}

describe('Testing component "Select"', function () {
  it('should return null when no tree-data provided', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
//    console.log('wrapper 1', wrapper.debug())
//    console.log('select2', wrapper.find('Select2'))
//    const $select = $(wrapper.find('Select2 select').getDOMNode());
//    console.log('select', $select)
//    $select.select2('open');

//    console.log('state', wrapper.state().formData)
//    wrapper.find('select').simulate('change', { target: { value: 'Mrs'}});
//    wrapper.find('Select2').props().onChange('aa')

//    console.log('props', wrapper.find('Select2').props())
//    console.log('state', wrapper.state().formData)
//    console.log('new value:', wrapper.find('select').props())
    const event = new Event()
    wrapper.find('Select2').props().onChange(event)





//    wrapper.find('Select2').dive()
//    wrapper.find('Select2').simulate('click')
//    console.log('wrapper 2', wrapper.debug())
//    console.log('wrapper 2', wrapper.html())
//    console.log('select', wrapper.find('.select2-container'))
//    assert.equal(wrapper.type(), null)
  })

})
