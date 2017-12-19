import React, {PropTypes} from "react";
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css'
import {asNumber} from "../../utils";

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue({type, items}, value) {
  if (value === "") {
    return undefined;
  } else if (type === "array" && items && ["number", "integer"].includes(items.type)) {
    return value.map(asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return asNumber(value);
  }
  return value;
}

function getValue(event, multiple) {
  if (multiple) {
    return [].slice.call(event.target.options)
      .filter(o => o.selected)
      .map(o => o.value);
  } else {
    return event.target.value;
  }
}

function SelectWidget({
  schema,
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  multiple,
  autofocus,
  onChange,
  onBlur,
  placeholder,
  formContext,
}) {
  const {enumOptions} = options;
  const emptyValue = multiple ? [] : "";
  if (formContext && formContext.preview) {
    const { Select } = formContext
    const Option = Select.Option
    return (
      <Select
        placeholder={placeholder}
        onChange={(value) => {
          formContext.setDirty(id)
          formContext.setTouched(id)
          onChange(processValue(schema, value));
        }}
        value={value}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        autoFocus={autofocus}
        id={id}
        size="large"
        onFocus={() => formContext.setTouched(id)}
      >
        {enumOptions.map(({value, label}, i) => <Option key={i} value={value}>{label}</Option>)}
      </Select>
    )
  }

  const { cssPrefix } = formContext
  return (
    <Select2
      data={enumOptions.map(({value: id, label: text}, i) => ({ id, text }))}
      className={`${cssPrefix}__form-control`}
      id={id}
      options={{
        placeholder,
        disabled,
        width: 'style',
        minimumResultsForSearch: Infinity,
      }}
      onChange={(event) => {
        const id = event.target.value
        formContext.setDirty(id)
        formContext.setTouched(id)
        const newValue = getValue(event, multiple);
        onChange(processValue(schema, newValue));
      }}
      value={typeof value === "undefined" ? emptyValue : value}
    />

  );
}

SelectWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };
}

export default SelectWidget;
