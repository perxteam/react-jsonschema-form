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
      options,
    } = this.props
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
          {...options}
        />
      </div>
    )
  }
}

export default FileWidget
