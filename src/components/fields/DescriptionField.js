import React, {PropTypes} from "react";

function DescriptionField(props) {
  const {id, description, formContext} = props;
  if (!description) {
    // See #312: Ensure compatibility with old versions of React.
    return <div/>;
  }
  const { cssPrefix } = formContext
  if (typeof description === "string") {
    return <p id={id} className={`${cssPrefix}__field-description`}>{description}</p>;
  } else {
    return <div id={id} className={`${cssPrefix}__field-description`}>{description}</div>;
  }
}

if (process.env.NODE_ENV !== "production") {
  DescriptionField.propTypes = {
    id: PropTypes.string,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ])
  };
}

export default DescriptionField;
