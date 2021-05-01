import React, { Component } from "react";

class Counter extends Component {
  state = {
    value: this.props.counter.value,
    tags: [],
  };

  render() {
    return (
      <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.handleIncrement()}
          className="btn btn-secondary btn-sm m-2"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-sm btn-danger m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags !!!</p>;

    return (
      <ul>
        {" "}
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}{" "}
      </ul>
    );
  }

  handleIncrement = (product) => {
    console.log("product-id", product);
    this.setState({ value: this.state.value + 1 });
  };

  handleDecrement = () => {
    this.setState({ value: this.state.value - 1 });
  };

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.state.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value: count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default Counter;
