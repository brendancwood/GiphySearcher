import React, {PropTypes, Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as giphyActions from '../actions/giphy-actions'
import GifList from './GifList'
import SearchInput from './SearchInput'

class LandingContainer extends Component {
  componentDidMount() {
    this.props.actions.getTrending()
  }

  componentWillUnmount() {
  }

  render() {
    if (!this.props.giphy.isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <SearchInput onSearch={this.props.actions.searchGiphy} />
        <GifList gifs={this.props.giphy.gifs.trending.data} />
      </div>
    )
  }
}

LandingContainer.propTypes = {
  giphy: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps({giphy}) {
  return {giphy}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(giphyActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)
