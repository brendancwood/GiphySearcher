import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as giphyActions from '../actions/giphy_actions'
import GifList from './GifList'
import SearchInput from './SearchInput'
import UploadForm from './UploadForm'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { APP_MODES } from '../utils/constants'

class LandingContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {isShowingModal: false}

    this.showModalClick = this.showModalClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.uploadGif = this.uploadGif.bind(this)
  }

  componentDidMount() {
    this.props.actions.getTrending()
  }

  showModalClick() {
    this.setState({isShowingModal: true})
  }

  handleClose() {
    this.setState({isShowingModal: false})
  }

  uploadGif(file) {
    this.setState({isShowingModal: false})
    this.props.actions.uploadGif(file)
  }

  render() {
    const data = this.props.app_state.mode === APP_MODES.TRENDING ?
      this.props.trending.data : this.props.search[this.props.search.currentTerm]

    return (
      <div>
        <SearchInput onSearch={this.props.actions.searchGiphy} onUploadClick={this.showModalClick} />
        <GifList showLoader={this.props.app_state.isLoading} gifs={data.data} />
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <UploadForm onSubmit={this.uploadGif} />
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    )
  }
}

LandingContainer.propTypes = {
  app_state: PropTypes.object.isRequired,
  trending: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps({app_state, trending, search}) {
  return {app_state, trending, search}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(giphyActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)

