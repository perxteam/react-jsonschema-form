"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.toErrorList = toErrorList;
exports.validateFormDataOnSubmit = validateFormDataOnSubmit;
exports.default = validateFormData;

var _lodash = require("lodash.topath");

var _lodash2 = _interopRequireDefault(_lodash);

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _jsonschema = require("jsonschema");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function toErrorSchema(errors) {
  // Transforms a jsonschema validation errors list:
  // [
  //   {property: "instance.level1.level2[2].level3", message: "err a"},
  //   {property: "instance.level1.level2[2].level3", message: "err b"},
  //   {property: "instance.level1.level2[4].level3", message: "err b"},
  // ]
  // Into an error tree:
  // {
  //   level1: {
  //     level2: {
  //       2: {level3: {errors: ["err a", "err b"]}},
  //       4: {level3: {errors: ["err b"]}},
  //     }
  //   }
  // };
  if (!errors.length) {
    return {};
  }
  //  console.log('toErrorSchema', errors)
  var res = errors.reduce(function (errorSchema, error) {
    //    console.log('current error', error)
    var property = error.property,
        message = error.message,
        argument = error.argument;

    var path = (0, _lodash2.default)(property);
    var parent = errorSchema;
    //    console.log('path', path)
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = path.slice(1)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var segment = _step.value;

        //      console.log('segment', segment)
        if (!(segment in parent)) {
          parent[segment] = {};
        }
        parent = parent[segment];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (path.length === 1 && argument) {
      if (!(argument in parent)) {
        parent[argument] = {};
      }
      parent = parent[argument];
    }

    if (Array.isArray(parent.__errors)) {
      // We store the list of errors for this node in a property named __errors
      // to avoid name collision with a possible sub schema field named
      // "errors" (see `validate.createErrorHandler`).
      parent.__errors = parent.__errors.concat(message);
    } else {
      parent.__errors = [message];
    }
    //    console.log('errors', errors, 'parent', parent)
    return errorSchema;
  }, {});
  //  console.warn('result', res)
  return res;
}

function toErrorList(errorSchema) {
  var fieldName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "root";

  // XXX: We should transform fieldName as a full field path string.
  //  console.log('toErrorList field', fieldName, 'errorSchema', errorSchema)
  var errorList = [];
  if ("__errors" in errorSchema) {
    errorList = errorList.concat(errorSchema.__errors.map(function (stack) {
      return {
        stack: fieldName + ": " + stack
      };
    }));
  }
  return Object.keys(errorSchema).reduce(function (acc, key) {
    if (key !== "__errors") {
      acc = acc.concat(toErrorList(errorSchema[key], key));
    }
    return acc;
  }, errorList);
}

function createErrorHandler(formData) {
  var handler = {
    // We store the list of errors for this node in a property named __errors
    // to avoid name collision with a possible sub schema field named
    // "errors" (see `utils.toErrorSchema`).
    __errors: [],
    addError: function addError(message) {
      this.__errors.push(message);
    }
  };
  if ((0, _utils.isObject)(formData)) {
    return Object.keys(formData).reduce(function (acc, key) {
      return _extends({}, acc, _defineProperty({}, key, createErrorHandler(formData[key])));
    }, handler);
  }
  return handler;
}

function unwrapErrorHandler(errorHandler) {
  return Object.keys(errorHandler).reduce(function (acc, key) {
    if (key === "addError") {
      return acc;
    } else if (key === "__errors") {
      return _extends({}, acc, _defineProperty({}, key, errorHandler[key]));
    }
    return _extends({}, acc, _defineProperty({}, key, unwrapErrorHandler(errorHandler[key])));
  }, {});
}

/**
 * This function processes the formData with a user `validate` contributed
 * function, which receives the form data and an `errorHandler` object that
 * will be used to add custom validation errors for each field.
 */

function validateFormDataOnSubmit(formData, schema, customValidate, transformErrors) {
  var _jsonValidate = (0, _jsonschema.validate)(formData, schema),
      errors = _jsonValidate.errors;
  //  console.log('validate 1', formData, 'errors', errors)


  if (typeof transformErrors === "function") {
    errors = transformErrors(errors);
  }
  //  console.log('validate 2', formData, 'errors', errors)
  var errorSchema = toErrorSchema(errors);
  //  console.log('validate 2 errorSchema', errorSchema)

  if (typeof customValidate !== "function") {
    //    console.log('return errors', {errors, errorSchema})
    return { errors: errors, errorSchema: errorSchema };
  }

  var errorHandler = customValidate(formData, createErrorHandler(formData));
  var userErrorSchema = unwrapErrorHandler(errorHandler);
  var newErrorSchema = (0, _utils.mergeObjects)(errorSchema, userErrorSchema, true);
  // XXX: The errors list produced is not fully compliant with the format
  // exposed by the jsonschema lib, which contains full field paths and other
  // properties.
  var newErrors = toErrorList(newErrorSchema);

  //  console.log('return errors', {errors: newErrors, errorSchema: newErrorSchema})
  return { errors: newErrors, errorSchema: newErrorSchema };
}

function validateFormData(formData, schema, customValidate, transformErrors, context) {
  var needValidateFields = [];
  Object.keys(context.formControlState).forEach(function (key) {
    var value = context.formControlState[key];
    //    console.log('key', key, 'value from formData', formData[key], 'value from context', value)
    if (value) {
      needValidateFields = needValidateFields.concat(key);
    }
  });
  //  console.log('needValidateFields', needValidateFields)

  //  const filteredFormData = {}
  //  needValidateFields.forEach((field) => {
  //    filteredFormData[field] = formData[field]
  //  })
  var filteredSchema = _ramda2.default.evolve({
    required: _ramda2.default.intersection(needValidateFields)
  })(schema);
  //  console.warn('filteredSchema', filteredSchema)

  var _jsonValidate2 = (0, _jsonschema.validate)(formData, filteredSchema),
      errors = _jsonValidate2.errors;
  //  console.log('validate 1', formData, 'schema', schema, 'errors', errors, 'context', context)

  if (typeof transformErrors === "function") {
    errors = transformErrors(errors);
  }
  //  console.log('validate 2', formData, 'errors', errors)
  var errorSchema = toErrorSchema(errors);
  //  console.log('validate 2 errorSchema', errorSchema)

  if (typeof customValidate !== "function") {
    //    console.log('return errors', {errors, errorSchema})
    return { errors: errors, errorSchema: errorSchema };
  }

  var errorHandler = customValidate(formData, createErrorHandler(formData));
  var userErrorSchema = unwrapErrorHandler(errorHandler);
  var newErrorSchema = (0, _utils.mergeObjects)(errorSchema, userErrorSchema, true);
  // XXX: The errors list produced is not fully compliant with the format
  // exposed by the jsonschema lib, which contains full field paths and other
  // properties.
  var newErrors = toErrorList(newErrorSchema);

  //  console.log('return errors', {errors: newErrors, errorSchema: newErrorSchema})
  return { errors: newErrors, errorSchema: newErrorSchema };
}