import React, {PropTypes, Component} from 'react'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import UploadForm from './UploadForm'

class SearchInput extends Component {
  constructor(props) {
    super(props)

    this.state = {term: '', isShowingModal: false}

    this.inputHandler = this.inputHandler.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.showModalClick = this.showModalClick.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.uploadGif = this.uploadGif.bind(this)
  }

  closeModal() {
    this.setState({isShowingModal: false})
  }

  showModalClick() {
    this.setState({isShowingModal: true})
  }

  onSearch() {
    this.props.onSearch(this.state.term)
    this.setState({term: ''})
  }

  inputHandler(e) {
    this.setState({term: e.target.value})
  }

  uploadGif(file) {
    this.props.onUpload(file)
    this.setState({isShowingModal: false})
  }

  handleKeyPress(e) {
    if (e.which === 13) {
      // pressed enter, search
      this.onSearch()
    }
  }

  render() {
    return (
        <div className="row search-bar">
          <div className="col-lg-6 offset-lg-3 col-md-12">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                value={this.state.term}
                onKeyPress={this.handleKeyPress}
                onChange={this.inputHandler} placeholder="Search Giphy..." />
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button" onClick={this.onSearch}>Search</button>
              </span>
              <span className="input-group-btn">
                <button className="btn btn-info" type="button" onClick={this.showModalClick}>Upload</button>
              </span>
            </div>
        </div>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.closeModal}>
            <ModalDialog onClose={this.closeModal}>
              <UploadForm onSubmit={this.uploadGif} />
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    )
  }
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchInput
