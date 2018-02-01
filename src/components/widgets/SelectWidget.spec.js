import React from 'react'
import R from 'ramda'
import { assert } from 'chai'
import { spy } from 'sinon'
import { mount, shallow, configure } from 'enzyme'
import $ from 'jquery'
import Form from "components/Form";
import Adapter from 'enzyme-adapter-react-15';

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
      "type": "string",
      "title": "Обращение",
      "enum": [ "one", "two", "three" ],
      "enumNames": [ "Уважаемый", "Уважаемая", "Уважаемые" ],
    },
  }
}

const uiSchema = {
  foo: {
    "ui:widget": "select",
      "ui:options": {
        placeholder: "Test"
      }
  },
}

describe('Testing component "Select"', function () {
  it('should provide no options when no enumNames provided', function () {
    const schemaWithoutEnums = R.compose(
      R.dissocPath(['properties', 'foo', 'enum']),
      R.dissocPath(['properties', 'foo', 'enumNames']),
    )(schema)
    const wrapper = createFormComponent({ schema: schemaWithoutEnums, uiSchema })
    assert.equal(wrapper.find('select option').length, 0)
  })

  it('should provide options according to enumNames', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    assert.equal(wrapper.find('select option').length, 3)
  })

  it('should not change initial state after mount', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    assert.equal(wrapper.state().formData.foo, undefined)
  })

  it('should handle change selection', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    wrapper.find('Select2').props().onChange({ target: { value: 'two'}})
    assert.equal(wrapper.state().formData.foo, 'two')
  })

  it('should pass placeholder property down to Select2', function () {
    const wrapper = createFormComponent({ schema, uiSchema })
    assert.equal(wrapper.find('Select2').prop('options').placeholder, 'Test')
  })
})
