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
    const gif = this.props.gif

    return (
      <div className="gif-box" onClick={this.handleClick}>
        <img role="presentation" className="img-fluid gif-image" src={gif.images.downsized_large.url} />
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>

              <img role="presentation" className="gif-image push-bottom-20" src={gif.images.fixed_height_downsampled.url} />

              {this.props.gif.user &&
                <div>
                  <p><img className="profile-url" role="presentation" src={gif.user.avatar_url} />{gif.user.username}</p>
                </div>
              }
              <p>Rating: {gif.rating}</p>
              <p>Uploaded: {this.formatDate(gif.import_datetime)}</p>

              {
                parseInt(gif.trending_datetime.substring(0,1), 10) !== 0 &&
                <p>Trended On: {this.formatDate(gif.trending_datetime)}</p>
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
