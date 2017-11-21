import React, {PropTypes} from "react";


function RadioWidget({
  schema,
  options,
  value,
  required,
  disabled,
  autofocus,
  onChange,
  formContext,
}) {
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const {enumOptions, inline} = options;
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  if (formContext.preview) {
    const { Radio, cssPrefix } = formContext
    const RadioGroup = Radio.Group
    const radios = enumOptions.map((option, i) => {
      const checked = option.value === value;
      const disabledCls = disabled ? "disabled" : "";
      return (
        <div key={i} className={`${cssPrefix}__radio ${cssPrefix}__${disabledCls}`}>
          <Radio
            checked={checked}
            name={name}
            value={option.value}
            disabled={disabled}
            autoFocus={autofocus && i === 0}
          >
            {option.label}
          </Radio>
        </div>
      );
    })
    return (
      <RadioGroup>
        {radios}
      </RadioGroup>
    )
  }
  const { cssPrefix } = formContext
  return (
    <div className={`${cssPrefix}__field-radio-group`}>{
      enumOptions.map((option, i) => {
        const checked = option.value === value;
        const disabledCls = disabled ? "disabled" : "";
        const radio = (
          <span>
            <input type="radio"
              checked={checked}
              name={name}
              value={option.value}
              disabled={disabled}
              autoFocus={autofocus && i === 0}
              onChange={_ => onChange(option.value)}/>
            <span>{option.label}</span>
          </span>
        );

        return inline ? (
          <label key={i} className={`${cssPrefix}__radio-inline ${cssPrefix}__${disabledCls}`}>
            {radio}
          </label>
        ) : (
          <div key={i} className={`${cssPrefix}__radio ${cssPrefix}__${disabledCls}`}>
            <label>
              {radio}
            </label>
          </div>
        );
      })
    }</div>
  );
}

RadioWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}
export default RadioWidget;
