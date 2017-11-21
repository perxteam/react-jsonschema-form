import React, { Component, PropTypes } from "react"
import Uploader from 'react-uploader'


class FileUploadWidget extends Component {
  handleChange = (value) => {
    const { onChange } = this.props
    onChange(value.map(item => item.id))
  }

  render() {
    const {
      id,
      value,
      options,
    } = this.props
    return (
      <div>
        <Uploader
          onChange={this.handleChange}
          actualDelete={false}
          {...options}
        />
      </div>
    )
  }
}

export default FileUploadWidget
