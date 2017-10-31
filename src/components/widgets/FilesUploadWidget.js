import React, { Component, PropTypes } from "react"
import R from 'ramda'
import fetch from 'isomorphic-fetch'


class Uploader extends Component {
  state = {
    files: [],
  }

//  function resetFileInput() {
//      this.value = ''
//      if(!/safari/i.test(navigator.userAgent)){
//          this.type = ''
//          this.type = 'file'
//      }
//  }

  addFile = () => {
    this.fileInput.click()
  }

  removeFile = id => () => {
    const {
      apiUrl,
      method,
      headers,
      fetchConfig,
    } = this.props

    fetch(`${apiUrl}${id}/`, {
      method: 'DELETE',
      headers,
      ...fetchConfig,
    })
      .then(this.onRemovedSubmit(id))
      .catch(this.onError)
  }

  onRemovedSubmit = id => response => {
    response.json()
      .then(data => {
        if (data.result === 'success') {
          const files = R.reject(R.propEq('id', id), this.state.files)
          this.setState(R.assoc('files', files))
          this.props.onChange(files)
        }
      })
  }

  onAddSubmit = response => {
    response.json()
      .then(data => {
        const files = R.append(data, this.state.files)
        this.setState(R.assoc('files', files))
        this.props.onChange(files)
      })
  }

  onError = response => {
    console.warn('error response', response)
  }

  handleUpload = event => {
    Array.prototype.forEach.call(event.target.files, this.upload)
//    this.resetFileInput()
  }

  upload = file => {
    const {
      apiUrl,
      method,
      headers,
      fetchConfig,
    } = this.props

    const formData = new FormData
    formData.append('file', file)

    fetch(apiUrl, {
      method,
      headers,
      body: formData,
      ...fetchConfig,
    })
      .then(this.onAddSubmit)
      .catch(this.onError)
  }

  render() {
    const {
      isMultiple,
      addButtonLabel,
      removeButtonLabel,
    } = this.props
    return (
      <div>
        <input
          ref={(el) => { this.fileInput = el }}
          type="file"
          multiple={isMultiple}
          onChange={this.handleUpload}
          style={{ display: 'none' }}
        />
        <div
          style={{
            cursor: 'pointer',
            backgroundColor: '#ff9c9c',
            color: 'azure',
            display: 'inline-block',
            padding: 10,
          }}
          onClick={this.addFile}
        >
          {addButtonLabel}
        </div>
        <div className="files-list">
          {
            this.state.files.map(file =>
              <div className="files-list__item" key={file.id}>
                <span className="files-list-item-name">{file.name}</span>
                <button
                  className="files-list-item-remove"
                  type="button"
                  onClick={this.removeFile(file.id)}
                >{removeButtonLabel}</button>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

Uploader.propTypes = {
  onChange: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool,
  apiUrl: PropTypes.string.isRequired,
  method: PropTypes.string,
  headers: PropTypes.object,
  fetchConfig: PropTypes.object,
  addButtonLabel: PropTypes.string,
  removeButtonLabel: PropTypes.string,
}

Uploader.defaultProps = {
  isMultiple: true,
  method: 'POST',
  headers: {},
  fetchConfig: {},
  addButtonLabel: 'Добавить файлы',
  removeButtonLabel: 'Удалить',
}


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
    return (
      <div>
        <Uploader
          onChange={this.handleChange}
          apiUrl="http://127.0.0.1:8001/attachments-upload/"
          headers={{
            'X-CSRFToken': 'tR5Jd6h7Zo6nUujcqGyeDbE7RjZSyCbcZPLiZNZBIsrsxiR3tJIsF87JAJ7Vem31',
            'Cookie': 'csrftoken=yjPLniESMUQFxJYB5oxPSyZtuW5NAwgizTE68l02NTSV2ZOS7PtQwviy88MXUHgw',
          }}
          fetchConfig={{
            credentials: 'include',
          }}
        />
        <input
          type="hidden"
          name={id}
          value={value}
        />
      </div>
    )
  }
}

export default FileWidget
