import React, { Component, PropTypes } from "react"
import Uploader from 'react-uploader'


class FileWidget extends Component {
  handleChange = (value) => {
    const { onChange } = this.props
    onChange(JSON.stringify(value.map(item => item.id)))
  }

  render() {
    const {
      id,
      value,
    } = this.props
    console.log('props', this.props)
    return (
      <div>
        <Uploader
          onChange={this.handleChange}
          apiUrl="http://127.0.0.1:8001/attachments-upload/"
          headers={{
            'X-CSRFToken': 'gRNeMHWm7q5dnKkMnheghjA7u2kenRbXdO9yYG2vOYv6ZfmkyydO2yXlLwIayB9s',
            'Cookie': 'csrftoken=gRNeMHWm7q5dnKkMnheghjA7u2kenRbXdO9yYG2vOYv6ZfmkyydO2yXlLwIayB9s',
          }}
          fetchConfig={{
            credentials: 'include',
          }}
          totalFilesSizeLimit={1000}
          totalFilesCount={5}
          fileSizeMin={0}
          fileSizeMax={1000}
          fileExtensions='go, log'
        />
      </div>
    )
  }
}

export default FileWidget
