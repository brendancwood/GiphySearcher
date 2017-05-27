import React, { PropTypes, Component } from 'react'
import '../styles/main.css'

class UploadForm extends Component {
  constructor(props) {
    super(props)
    this.state = {file: null}
    this.submit = this.submit.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.cancel = this.cancel.bind(this)
  }

  cancel() {
    this.setState({file: null})
  }

  handleUpload(e) {
    const file = e.target.files[0]
    if (!file) {
      return
    } else {
      this.setState({file}, () => {
        const reader = new FileReader()
        reader.onload = function (e) {
          const img = document.getElementById('uploaded-file')
          img.src = e.target.result
        }
        reader.readAsDataURL(file)
      })
    }
  }

  submit() {
    this.props.onSubmit(this.state.file)
  }

  render() {
    if (!this.state.file) {
      return (
        <label className="custom-file">
          <input type="file" accept="image/gif" onChange={this.handleUpload} />
          <span className="custom-file-control"></span>
        </label>
      )
    } else {
      return (
        <div>
          <img role="presentation" id="uploaded-file" className="push-bottom-20" src="" />
          <div className="push-top-20 text-center">
            <button className="btn btn-danger push-right-20 pointer" onClick={this.cancel}>Cancel</button>
            <button disabled={!this.state.file} className="btn btn-success pointer" onClick={this.submit}>Upload Gif</button>
          </div>
        </div>
      )
    }
  }
}

UploadForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default UploadForm
