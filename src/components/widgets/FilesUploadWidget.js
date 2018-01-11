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

  render() {
    const {
      id,
      value,
      options,
      formContext: { cssPrefix, formId },
    } = this.props

    const miscFormData = formId
      ? { 'form_id': formId }
      : undefined
    return (
      <div>
        <Uploader
          onChange={this.handleChange}
          cssPrefix={cssPrefix}
          actualDelete={false}
          value={value}
          miscFormData={miscFormData}
          {...options}
        />
      </div>
    )
  }
}

export default FileUploadWidget
