import React, {PropTypes} from "react";
import R from 'ramda'
import ReactTelInput from 'react-telephone-input'
import 'react-telephone-input/lib/withStyles'


class PhoneInputWidget extends React.Component {
  constructor(props) {
    super(props)
    const { options: { country, onlyCountries } } = props
    const { dialCode, format } = R.compose(
      R.pick(['dialCode', 'format']),
      R.find(R.propEq('iso2', country))
    )(onlyCountries)
    const prefix = Array.from(dialCode)
      .reduce((result, current) => result.replace('.', current), format)
      .match(/(^\+\d+ ?).*/)[1]
    this.state = { prefixCheck: new RegExp(`(^\\${prefix})(.*)`) }
  }

  shouldComponentUpdate(nextProps) {
    // This is required only when widget is in constructor-mode (opposite preview-mode).
    if (nextProps.options.country !== this.props.options.country) {
      setTimeout(() => {
        this.forceUpdate()
      }, 0)
    }
    return true
  }

  onChange = (value) => {
    const { onChange, schema, id, formContext } = this.props
    const { prefixCheck } = this.state
    const match = value && value.match(prefixCheck)
    const prefix = match && match[1]

    if (prefix && prefix.length) {
      formContext.setDirty(id)
    } else {
      formContext.setTouched(id)
    }

    const parsedValue = match && match[2]
    if (value === prefix) {
      onChange(undefined)
    } else if (parsedValue) {
      onChange(value)
    }
  }

  render() {
    const {
      schema,
      id,
      options,
      value,
      required,
      disabled,
      readonly,
      multiple,
      autofocus,
      onBlur,
      placeholder,
      formContext,
    } = this.props
    const { cssPrefix } = formContext
    return (
      <ReactTelInput
        value={value}
        name={id}
        className={`${cssPrefix}__phone-input`}
        defaultCountry={options.country}
        flagsImagePath={`${options.apiRoot}/assets/images/flags.png`}
        onlyCountries={options.onlyCountries}
        onBlur={onBlur && (value => onBlur(id, event))}
        onFocus={() => formContext.setTouched(id)}
        placeholder={placeholder}
        onChange={this.onChange}
      />
    )
  }
}

//PhoneInputWidget.defaultProps = {
//  autofocus: false,
//};
//
//if (process.env.NODE_ENV !== "production") {
//  PhoneInputWidget.propTypes = {
//    schema: PropTypes.object.isRequired,
//    id: PropTypes.string.isRequired,
//    options: PropTypes.shape({
//      enumOptions: PropTypes.array,
//    }).isRequired,
//    value: PropTypes.any,
//    required: PropTypes.bool,
//    multiple: PropTypes.bool,
//    autofocus: PropTypes.bool,
//    onChange: PropTypes.func,
//    onBlur: PropTypes.func,
//  };
//}

export default PhoneInputWidget;
