import React, { Component, PropTypes } from "react"
import R from 'ramda'
import fetch from 'isomorphic-fetch'
import { noop } from '../../utils'


class Uploader extends Component {
  state = {
    files: [],
    totalSize: 0,
    showMaxFilesSizeWarning: false,
  }

  addFile = () => {
    this.fileInput.click()
  }

  removeFile = file => () => {
    const {
      apiUrl,
      method,
      headers,
      fetchConfig,
    } = this.props

    fetch(`${apiUrl}${file.id}/`, {
      method: 'DELETE',
      headers,
      ...fetchConfig,
    })
      .then(this.onRemovedSubmit(file))
      .catch(this.onError)
  }

  onRemovedSubmit = file => response => response.json()
    .then(data => {
      if (data.result === 'success') {
        const files = R.reject(R.propEq('id', file.id), this.state.files)
        this.setState(R.assoc('files', files))
        console.log('removed file size', file.size)
        // TODO reduce totalSize after file has been removed

//    const { totalSize, showMaxFilesSizeWarning } = this.state
//    const size = totalSize + file.size
//    if (totalFilesSizeLimit && size > totalFilesSizeLimit) {
//      this.setState({ showMaxFilesSizeWarning: true })
//      return
//    }
//
//    this.setState({ totalSize: size })
//    if (showMaxFilesSizeWarning) {
//      this.setState({ showMaxFilesSizeWarning: false })
//    }

        this.props.onChange(files)
      }
    })

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
    const files = event.target.files
    this.props.onChangeFilesSelection(files)
    Array.prototype.forEach.call(files, this.upload)
    this.resetFileInput()
  }

  upload = file => {
    const {
      apiUrl,
      method,
      headers,
      fetchConfig,
      totalFilesSizeLimit,
    } = this.props

    const { totalSize, showMaxFilesSizeWarning } = this.state
    const size = totalSize + file.size
    if (totalFilesSizeLimit && size > totalFilesSizeLimit) {
      this.setState({ showMaxFilesSizeWarning: true })
      return
    }

    this.setState({ totalSize: size })
    if (showMaxFilesSizeWarning) {
      this.setState({ showMaxFilesSizeWarning: false })
    }

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

  resetFileInput = () => {
      this.fileInput.value = ''
      if(!/safari/i.test(navigator.userAgent)){
          this.fileInput.type = ''
          this.fileInput.type = 'file'
      }
  }

  render() {
    const {
      isMultiple,
      addButtonLabel,
      removeButtonLabel,
      showFilesList,
    } = this.props
    const {
      files,
      showMaxFilesSizeWarning,
    } = this.state
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
        {
          showFilesList && (
            <div className="files-list">
              {
                files.map(file =>
                  <div className="files-list__item" key={file.id}>
                    <span className="files-list-item-name">{file.name}</span>
                    <button
                      className="files-list-item-remove"
                      type="button"
                      onClick={this.removeFile(file)}
                    >{removeButtonLabel}</button>
                  </div>
                )
              }
            </div>
          )
        }
        {
          showMaxFilesSizeWarning && (
            <div className="files-uploader-max-size-warning">Превышен лимит</div>
          )
        }
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
  onChangeFilesSelection: PropTypes.func,
  showFilesList: PropTypes.bool,
  totalFilesSizeLimit: PropTypes.number,
}

Uploader.defaultProps = {
  isMultiple: true,
  method: 'POST',
  headers: {},
  fetchConfig: {},
  addButtonLabel: 'Добавить файлы',
  removeButtonLabel: 'Удалить',
  onChangeFilesSelection: noop,
  showFilesList: true,
  totalFilesSizeLimit: undefined,
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
            'X-CSRFToken': '8Zvveu29RivcjUVEr18fRq4vLrcycxxLup9wNn5UHoSDps4SyiEOnvKv3jlf7Dp8',
            'Cookie': 'csrftoken=8Zvveu29RivcjUVEr18fRq4vLrcycxxLup9wNn5UHoSDps4SyiEOnvKv3jlf7Dp8',
          }}
          fetchConfig={{
            credentials: 'include',
          }}
          totalFilesSizeLimit={1000000}
        />
      </div>
    )
  }
}

export default FileWidget
