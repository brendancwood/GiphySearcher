import React, { PropTypes, Component } from 'react'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';

class Gif extends Component {
  constructor(props) {
    super(props)
    this.state = {isShowingModal: false}
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClick() {
    this.setState({isShowingModal: true})
  }

  handleClose() {
    this.setState({isShowingModal: false})
  }

  formatDate(date) {
    date = date.substring(0, 10)
    const year = date.substring(0,4)
    const month = date.substring(5,7)
    const day = date.substring(8,10)
    return `${ month }/${ day }/${ year }`
  }

  render() {
    // const gif = this.props

    return (
      <div className="gif-box" onClick={this.handleClick}>
        <img role="presentation" className="img-fluid gif-image" src={this.props.gif.images.fixed_height_downsampled.url} />
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>

              <img role="presentation" className="img-fluid gif-image push-bottom-20" src={this.props.gif.images.fixed_height_downsampled.url} />

              {this.props.gif.user &&
                <div>
                  <p><img className="profile-url" role="presentation" src={this.props.gif.user.avatar_url} />{this.props.gif.user.username}</p>
                </div>
              }
              <p>Rating: {this.props.gif.rating}</p>
              <p>Uploaded: {this.formatDate(this.props.gif.import_datetime)}</p>

              {
                parseInt(this.props.gif.trending_datetime.substring(0,1), 10) !== 0 &&
                <p>Trended On: {this.formatDate(this.props.gif.trending_datetime)}</p>
              }

            </ModalDialog>
          </ModalContainer>
        }
      </div>

    )
  }
}

Gif.propTypes = {
  gif: PropTypes.object.isRequired
}

export default Gif
