import React, { Component } from "react";

class LikeComponent extends Component {
  render() {
    if (this.props.liked) {
      return (
        <div
          className="button"
          id="more"
          onClick={() => this.props.onLike(this.props.movie)}
        >
          <i className="fa fa-heart" aria-hidden="true"></i>
        </div>
      );
    }
    return (
      <div
        className="button"
        id="more"
        onClick={() => this.props.onLike(this.props.movie)}
      >
        <i className="fa fa-heart-o" aria-hidden="true"></i>
      </div>
    );
  }
}

export default LikeComponent;
