import React, {PropTypes} from "react";


function CheckboxWidget({
  schema,
  id,
  value,
  required,
  disabled,
  label,
  autofocus,
  onChange,
  onBlur,
  formContext,
}) {
  if (formContext.preview) {
    const { Checkbox } = formContext
    if (!'Checkbox' in formContext) return null
    return (
      <Checkbox
        id={id}
        name={id}
        checked={typeof value === "undefined" ? false : value}
        required={required}
        disabled={disabled}
        autoFocus={autofocus}
        onChange={(event) => {
          onChange(event.target.checked)
        }}
        onBlur={() => console.log('checkbox onBlur')}
      >
        <span dangerouslySetInnerHTML={{
            __html: label,
          }}
        />
      </Checkbox>
    )
  }
  return (
    <div className={`checkbox ${disabled ? "disabled" : ""}`}>
      <label>
        <input type="checkbox"
          id={id}
          checked={typeof value === "undefined" ? false : value}
          required={required}
          disabled={disabled}
          autoFocus={autofocus}
          onChange={(event) => {
            onChange(event.target.checked)
          }}
        />
        <span dangerouslySetInnerHTML={{
            __html: label,
          }}
        />
      </label>
    </div>
  );
}

CheckboxWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  CheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default CheckboxWidget;
