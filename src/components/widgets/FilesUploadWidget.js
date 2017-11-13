import React, { Component, PropTypes } from "react"
import R from 'ramda'
import fetch from 'isomorphic-fetch'
import { noop } from '../../utils'


class Uploader extends Component {
  state = {
    files: [],
    totalSize: 0,
    errorMessage: undefined,
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
        const { totalSize, errorMessage } = this.state
        const size = totalSize - file.size
        this.setState({ totalSize: size, files })
        const { totalFilesSizeLimit } = this.props
        if (totalFilesSizeLimit && size <= totalFilesSizeLimit * 1024) {
          this.setState({ errorMessage: false })
          return
        }
        this.props.onChange(files)
      }
    })

  onAddSubmit = response => {
    response.json()
      .then(data => {
        this.setState(R.over(R.lensProp('files'), R.append(data)), () => {
          this.props.onChange(this.state.files)
        })
      })
  }

  onError = response => {
    console.warn('error response', response)
  }

  handleUpload = event => {
    const newfiles = event.target.files
    const {
      onChangeFilesSelection,
      totalFilesCount,
      totalFilesCountError,
      totalFilesSizeLimitError,
    } = this.props
    onChangeFilesSelection(newfiles)
    let { files, totalSize, errorMessage } = this.state
    Array.prototype.every.call(newfiles, (file, index) => {
      const {
        apiUrl,
        method,
        headers,
        fetchConfig,
        totalFilesSizeLimit,
        totalFilesSizeLimitError,
      } = this.props

      if (files.length + index + 1 > totalFilesCount) {
        errorMessage = totalFilesCountError.replace(/\{\}/, totalFilesCount)
        return false
      }

      const size = totalSize + file.size
      if (totalFilesSizeLimit && size > totalFilesSizeLimit * 1024) {
        errorMessage = totalFilesSizeLimitError
        return false
      }

      totalSize = size
      console.log('new total files size', totalSize)
      if (errorMessage) {
        errorMessage = undefined
      }

      const formData = new FormData
      formData.append('file', file)

      return  fetch(apiUrl, {
        method,
        headers,
        body: formData,
        ...fetchConfig,
      })
        .then(this.onAddSubmit)
        .catch(this.onError)
    })
    this.setState({ errorMessage, totalSize })
    this.resetFileInput()
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
      errorMessage,
    } = this.state
    return (
      <div className='files-uploader'>
        <input
          ref={(el) => { this.fileInput = el }}
          type="file"
          multiple={isMultiple}
          onChange={this.handleUpload}
          className="files-uploader__file-field"
          style={{ display: 'none' }}
        />
        <div
          className="files-uploader__add-file-button"
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
            <div className="files-uploader__files-list files-list">
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
          errorMessage && (
            <div className="files-uploader__max-size-warning">{errorMessage}</div>
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
	// Количество файлов которое пользователь может приложить
  totalFilesCount: PropTypes.number,
	// Сообщение об ошибке при превышении totalFilesCount
  totalFilesCountError: PropTypes.string,
  // Минимальный размер одного файла (в Кб)
  fileSizeMin: PropTypes.number,
  // Максимальный размер одного файла (в Кб)
  fileSizeMax: PropTypes.number,
  // Максимальный общий размер приложенных файлов (В Кб)
  totalFilesSizeLimit: PropTypes.number,
	// Разрешенные расширения через запятую
	fileExtensions: PropTypes.string,
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
  totalFilesCount: 10,
  totalFilesCountError: 'Вы не можете загрузить более {} файлов',
  fileSizeMin: 0,
  fileSizeMax: 10000,
  totalFilesSizeLimit: 20000,
  totalFilesSizeLimitError: 'Превышен лимит',
	fileExtensions: undefined,
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
            'X-CSRFToken': 'YCeGTvYzzGGW8u4ITCjqdgwKByUofzmbDtVRH2oIHejKgzkw8pFwtwYkSW84FDjJ',
            'Cookie': 'csrftoken=YCeGTvYzzGGW8u4ITCjqdgwKByUofzmbDtVRH2oIHejKgzkw8pFwtwYkSW84FDjJ',
          }}
          fetchConfig={{
            credentials: 'include',
          }}
          totalFilesSizeLimit={100}
        />
      </div>
    )
  }
}

export default FileWidget
