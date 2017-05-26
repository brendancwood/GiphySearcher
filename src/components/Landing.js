import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as giphyActions from '../actions/giphy_actions'
import GifList from './GifList'
import SearchInput from './SearchInput'
import { APP_MODES } from '../utils/constants'

class LandingContainer extends Component {
  componentDidMount() {
    this.props.actions.getTrending()
  }

  componentWillUnmount() {
  }

  render() {
    console.log(this.props)
    const data = this.props.app_state.mode === APP_MODES.TRENDING ?
      this.props.trending.data : this.props.search[this.props.search.currentTerm]
    console.log('data', data)
    return (
      <div>
        <SearchInput onSearch={this.props.actions.searchGiphy} />
        <GifList showLoader={this.props.app_state.isLoading} gifs={data.data} />
      </div>
    )
  }
}

LandingContainer.propTypes = {
  app_state: PropTypes.object.isRequired,
  trending : PropTypes.object.isRequired,
  search   : PropTypes.object.isRequired,
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

