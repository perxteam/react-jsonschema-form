import React, {PropTypes} from "react";

function ButtonWidget(props) {
  const {
    value,
    label,
    readonly,
    autofocus,
    onChange,
    options,  // eslint-disable-line
    schema,   // eslint-disable-line
    formContext,  // eslint-disable-line
    registry, // eslint-disable-line
    ...inputProps
  } = props;

  const { cssPrefix } = formContext
  const mask = options.mask || ''
  const classNames = [
    formContext.preview ? "ant-btn" : `${cssPrefix}__btn ${cssPrefix}__btn-primary`,
    options.classNames,
  ].join(" ").trim();
  return (
    <button
      className={classNames || undefined}
      onClick={options.type === 'reset' ? props.registry.resetForm : undefined}
      type={options.type}
    >
      {label || 'Button'}
    </button>
  )
}

export default ButtonWidget;
