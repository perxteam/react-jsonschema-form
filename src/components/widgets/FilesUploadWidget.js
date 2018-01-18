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
    const {
      formContext: { i18nInstance },
    } = this.props
    console.log('errorProcessor', key, 'args', args)
    console.log('i18nInstance', i18nInstance)
    return 'aaaaaa'
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
          errorProcessor={this.errorProcessor}
          {...options}
        />
      </div>
    )
  }
}

export default FileUploadWidget
