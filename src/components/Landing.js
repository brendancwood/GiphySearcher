import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as giphyActions from '../actions/giphy_actions'
import GifList from './GifList'
import SearchInput from './SearchInput'
import UploadBanner from './UploadBanner'
import InfiniteScroller from './InfiniteScroller'
import { APP_MODES } from '../utils/constants'

class LandingContainer extends Component {
  constructor(props) {
    super(props)

    this.uploadGif = this.uploadGif.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.props.actions.getTrending()
  }

  uploadGif(file) {
    this.props.actions.uploadGif(file)
  }

  handleScroll(paginationData) {
    if (this.props.search.currentTerm == null && paginationData == null) return;

    this.props.actions.getNextPage(this.props.search.currentTerm, paginationData)
  }
  render() {
    const data = this.props.app_state.mode === APP_MODES.TRENDING ?
      this.props.trending.data : this.props.search[this.props.search.currentTerm]

    return (
      <div>
        <UploadBanner uploadData={this.props.uploads} />
        <SearchInput onSearch={this.props.actions.searchGiphy} onUpload={this.uploadGif} />
        <GifList showLoader={this.props.app_state.isLoading} gifs={data.data} />
        <InfiniteScroller
          isLoading={this.props.app_state.isLoading}
          onScroll={this.handleScroll}
          paginationData={data.pagination} />
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

function mapStateToProps({app_state, trending, search, uploads}) {
  return {app_state, trending, search, uploads}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(giphyActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)

