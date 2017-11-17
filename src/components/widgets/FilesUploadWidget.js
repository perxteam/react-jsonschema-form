import React, { Component, PropTypes } from "react"
import Uploader from 'react-uploader'
import 'react-uploader/lib/css/main.css'


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
          headers={{
            'X-CSRFToken': 'gRNeMHWm7q5dnKkMnheghjA7u2kenRbXdO9yYG2vOYv6ZfmkyydO2yXlLwIayB9s',
            'Cookie': 'csrftoken=gRNeMHWm7q5dnKkMnheghjA7u2kenRbXdO9yYG2vOYv6ZfmkyydO2yXlLwIayB9s',
          }}
          fetchConfig={{
            credentials: 'include',
          }}
          {...options}
        />
      </div>
    )
  }
}

export default FileUploadWidget
