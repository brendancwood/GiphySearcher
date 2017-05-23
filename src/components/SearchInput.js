import React, {PropTypes, Component} from 'react'

class SearchInput extends Component {
  constructor(props) {
    super(props)

    this.state = {term: ''}

    this.inputHandler = this.inputHandler.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  onSearch() {
    this.props.onSearch(this.state.term)
    this.setState({term: ''})
  }

  inputHandler(e) {
    this.setState({term: e.target.value})
  }

  handleKeyPress(e) {
    if (e.which === 13) {
      // pressed enter, search
      this.onSearch()
    }
  }

  render() {
    return (
      <div>
        <input
          className="form-input"
          type="text"
          value={this.state.term}
          onKeyPress={this.handleKeyPress}
          onChange={this.inputHandler} placeholder="Search Giphy..." />
        <button onClick={this.onSearch}>Add Gif</button>
      </div>
    )
  }
}

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchInput
