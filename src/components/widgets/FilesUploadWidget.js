import React, { Component, PropTypes } from "react"
import R from 'ramda'
import Uploader from 'react-uploader'


class FileUploadWidget extends Component {
  handleChange = (value) => {
    const { onChange } = this.props
    onChange(R.compose(
      R.ifElse(R.isEmpty, R.always(undefined), R.identity),
      R.map(R.prop('id'))
    )(value))
  }

  errorProcessor = ({ key, args }) => {
    const { formContext: { i18nInstance } } = this.props
    return i18nInstance.t(`validation:widget.${key}`, args)
  }

  render() {
    const {
      id,
      value,
      options,
      formContext: { cssPrefix, formId, i18nInstance },
    } = this.props

    const miscFormData = formId
      ? { 'form_id': formId }
      : undefined
    return (
      <div>
        <Uploader
          onChange={this.handleChange}
          value={value}
          cssPrefix={cssPrefix}
          actualDelete={false}
          miscFormData={miscFormData}
          errorProcessor={i18nInstance && this.errorProcessor}
          {...options}
        />
      </div>
    )
  }
}

export default FileUploadWidget
