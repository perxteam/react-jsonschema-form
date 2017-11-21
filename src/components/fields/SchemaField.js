import React, {PropTypes} from "react";
import R from 'ramda'

import {
  isMultiSelect,
  retrieveSchema,
  getDefaultRegistry,
  isFilesArray
} from "../../utils";
import UnsupportedField from "./UnsupportedField";

const REQUIRED_FIELD_SYMBOL = "*";
const COMPONENT_TYPES = {
  array:   "ArrayField",
  boolean: "BooleanField",
  integer: "NumberField",
  number:  "NumberField",
  object:  "ObjectField",
  string:  "StringField",
};

function getFieldComponent(schema, uiSchema, fields) {
  const field = uiSchema["ui:field"];
  if (typeof field === "function") {
    return field;
  }
  if (typeof field === "string" && field in fields) {
    return fields[field];
  }
  const componentName = COMPONENT_TYPES[schema.type];
  return componentName in fields ? fields[componentName] : UnsupportedField;
}

function Label(props) {
  const {label, required, id, cssPrefix} = props;
  if (!label) {
    // See #312: Ensure compatibility with old versions of React.
    return <div/>;
  }
  return (
    <label className={`${cssPrefix}__control-label`} htmlFor={id}>
      {required ? label + REQUIRED_FIELD_SYMBOL : label}
    </label>
  );
}

function Help(props) {
  const {help, cssPrefix} = props;
  if (!help) {
    // See #312: Ensure compatibility with old versions of React.
    return <div/>;
  }
  if (typeof help === "string") {
    return <p className={`${cssPrefix}__help-block`}>{help}</p>;
  }
  return <div className={`${cssPrefix}__help-block`}>{help}</div>;
}

function ErrorList(props) {
  const {errors = [], cssPrefix} = props;
  if (errors.length === 0) {
    return <div/>;
  }
  return (
    <div>
      <p/>
      <ul className={`
         ${cssPrefix}__error-detail
         ${cssPrefix}__bs-callout
         ${cssPrefix}__bs-callout-info
      `}>{
        errors.map((error, index) => {
          return <li className={`${cssPrefix}__text-danger`} key={index}>{error}</li>;
        })
      }</ul>
    </div>
  );
}

function DefaultTemplate(props) {
  const {
    id,
    classNames,
    label,
    children,
    errors,
    help,
    description,
    hidden,
    required,
    displayLabel,
    formContext: { cssPrefix },
  } = props;
  if (hidden) {
    return children;
  }

  return (
    <div className={classNames}>
      {displayLabel
          ? <Label label={label} required={required} id={id} cssPrefix={cssPrefix} />
          : null
      }
      {displayLabel && description ? description : null}
      {children}
      {errors}
      {help}
    </div>
  );
}

if (process.env.NODE_ENV !== "production") {
  DefaultTemplate.propTypes = {
    id: PropTypes.string,
    classNames: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    errors: PropTypes.element,
    rawErrors: PropTypes.arrayOf(PropTypes.string),
    help: PropTypes.element,
    rawHelp: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    description: PropTypes.element,
    rawDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    hidden: PropTypes.bool,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    displayLabel: PropTypes.bool,
    fields: PropTypes.object,
    formContext: PropTypes.object,
  };
}

DefaultTemplate.defaultProps = {
  hidden: false,
  readonly: false,
  required: false,
  displayLabel: true,
};

function SchemaField(props) {
  const {uiSchema, errorSchema, idSchema, name, required, registry} = props;
  const {definitions, fields, formContext, FieldTemplate = DefaultTemplate} = registry;
  const schema = retrieveSchema(props.schema, definitions);
  const FieldComponent = getFieldComponent(schema, uiSchema, fields);
  const {DescriptionField} = fields;
  const disabled = Boolean(props.disabled || uiSchema["ui:disabled"]);
  const readonly = Boolean(props.readonly || uiSchema["ui:readonly"]);
  const autofocus = Boolean(props.autofocus || uiSchema["ui:autofocus"]);

  if (Object.keys(schema).length === 0) {
    // See #312: Ensure compatibility with old versions of React.
    return <div/>;
  }

  let displayLabel = true;
  const widget = uiSchema["ui:widget"];
  if (schema.type === "array" && widget !== 'filesAsync') {
    displayLabel = isMultiSelect(schema) || isFilesArray(schema, uiSchema);
  }
  if (schema.type === "object") {
    displayLabel = false;
  }
  if (schema.type === "boolean" && !uiSchema["ui:widget"]) {
    displayLabel = false;
  }
  if (uiSchema["ui:field"]) {
    displayLabel = false;
  }

  const {__errors, ...fieldErrorSchema} = errorSchema;

  const field = (
    <FieldComponent {...props}
      schema={schema}
      disabled={disabled}
      readonly={readonly}
      autofocus={autofocus}
      errorSchema={fieldErrorSchema}
      formContext={formContext}/>
  );

  const {type} = schema;
  const id = idSchema.$id;
  const label = props.schema.title || schema.title || name;
  const description = props.schema.description || schema.description;
  const errors = __errors;
  const help = uiSchema["ui:help"];
  const hidden = uiSchema["ui:widget"] === "hidden";
  const cssPrefix = R.prop('cssPrefix', formContext)

  const classNames = [
    `${cssPrefix}__form-group`,
    `${cssPrefix}__field`,
    `${cssPrefix}__field-${type}`,
//    errors && errors.length > 0 ? "field-error has-error" : "",
//    errors && errors.length > 0 && !formContext.preview ? "field-error has-error" : "",
    errors && errors.length > 0 && !formContext.preview ? "error" : "",
    uiSchema.classNames,
  ].join(" ").trim();

  const fieldProps = {
    description: <DescriptionField id={id + "__description"}
                                   description={description}
                                   formContext={formContext}/>,
    rawDescription: description,
    help: <Help help={help} cssPrefix={cssPrefix} />,
    rawHelp: typeof help === "string" ? help : undefined,
    errors: <ErrorList errors={errors} cssPrefix={cssPrefix} />,
    rawErrors: errors,
    id,
    label,
    hidden,
    required,
    readonly,
    displayLabel,
    classNames,
    formContext,
    fields,
    schema,
    uiSchema,
  };

  return <FieldTemplate {...fieldProps}>{field}</FieldTemplate>;
}

SchemaField.defaultProps = {
  uiSchema: {},
  errorSchema: {},
  idSchema: {},
  registry: getDefaultRegistry(),
  disabled: false,
  readonly: false,
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  SchemaField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    idSchema: PropTypes.object,
    formData: PropTypes.any,
    errorSchema: PropTypes.object,
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
      ])).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired,
      ArrayFieldTemplate: PropTypes.func,
      FieldTemplate: PropTypes.func,
      formContext: PropTypes.object.isRequired,
    })
  };
}

export default SchemaField;
