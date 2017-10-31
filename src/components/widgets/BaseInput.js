import React, {PropTypes} from "react";


function BaseInput(props) {
  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  const {
    id,
    value,
    readonly,
    autofocus,
    onBlur,
    options,  // eslint-disable-line
    schema,   // eslint-disable-line
    formContext,  // eslint-disable-line
    registry, // eslint-disable-line
    ...inputProps
  } = props;
//  console.log('Input context', formContext, 'props', props)
  const classNames = [
    "form-control",
    formContext.preview ? "ant-input ant-input-lg" : "",
    options.inputClassNames,
  ].join(" ").trim();
  const _onChange = ({target: {value}}) => {
    formContext.setDirty(id)
    formContext.setTouched(id)
    return props.onChange(value === "" ? undefined : value);
  };
  return (
    <input
      {...inputProps}
      name={id}
      className={classNames}
      readOnly={readonly}
      autoFocus={autofocus}
      value={typeof value === "undefined" ? "" : value}
      onChange={_onChange}
      onBlur={onBlur && (event => onBlur(id, event.target.value))}
      onFocus={() => formContext.setTouched(id)}
    />
  );
}

BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  };
}

export default BaseInput;
