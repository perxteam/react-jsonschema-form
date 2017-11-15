import React, {PropTypes} from "react";


function TextareaWidget({
  schema,
  id,
  placeholder,
  value,
  required,
  disabled,
  readonly,
  autofocus,
  options,
  onChange,
  formContext,
  onBlur,
}) {
  const _onChange = ({target: {value}}) => {
    return onChange(value === "" ? undefined : value);
  };

  const classNames = [
    "form-control",
    formContext.preview ? "ant-input" : "",
    options.inputClassNames,
  ].join(" ").trim();
  return (
    <textarea
      id={id}
      name={id}
      className={classNames}
      value={typeof value === "undefined" ? "" : value}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      readOnly={readonly}
      autoFocus={autofocus}
      onBlur={onBlur && (event => onBlur(id, event.target.value))}
      onChange={_onChange}/>
  );
}

TextareaWidget.defaultProps = {
  autofocus: false
};

if (process.env.NODE_ENV !== "production") {
  TextareaWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  };
}

export default TextareaWidget;
