'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _chai = require('chai');

var _sinon = require('sinon');

var _enzyme = require('enzyme');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Form = require('components/Form');

var _Form2 = _interopRequireDefault(_Form);

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

function createFormComponent(props) {
  return (0, _enzyme.mount)(_react2.default.createElement(_Form2.default, _extends({}, props, {
    safeRenderCompletion: true
  })));
}

var schema = {
  type: "object",
  properties: {
    foo: {
      "type": "string",
      "title": "Обращение",
      "enum": ["one", "two", "three"],
      "enumNames": ["Уважаемый", "Уважаемая", "Уважаемые"]
    }
  }
};

var uiSchema = {
  foo: {
    "ui:widget": "select",
    "ui:options": {
      placeholder: "Test"
    }
  }
};

describe('Testing component "Select"', function () {
  it('should provide no options when no enumNames provided', function () {
    var schemaWithoutEnums = _ramda2.default.compose(_ramda2.default.dissocPath(['properties', 'foo', 'enum']), _ramda2.default.dissocPath(['properties', 'foo', 'enumNames']))(schema);
    var wrapper = createFormComponent({ schema: schemaWithoutEnums, uiSchema: uiSchema });
    _chai.assert.equal(wrapper.find('select option').length, 0);
  });

  it('should provide options according to enumNames', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    _chai.assert.equal(wrapper.find('select option').length, 3);
  });

  it('should not change initial state after mount', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    _chai.assert.equal(wrapper.state().formData.foo, undefined);
  });

  it('should handle change selection', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    wrapper.find('Select2').props().onChange({ target: { value: 'two' } });
    _chai.assert.equal(wrapper.state().formData.foo, 'two');
  });

  it('should pass placeholder property down to Select2', function () {
    var wrapper = createFormComponent({ schema: schema, uiSchema: uiSchema });
    _chai.assert.equal(wrapper.find('Select2').prop('options').placeholder, 'Test');
  });
});