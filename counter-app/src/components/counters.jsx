import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 4 },
      { id: 3, value: 0 },
      { id: 4, value: 10 },
    ],
  };

  handleDelete = (id) => {
    const counters = this.state.counters.filter((counter) => counter.id !== id);
    this.setState({ counters });
  };

  render() {
    return (
      <div>
        {this.state.counters.map((counter, index) => (
          <Counter
            key={counter.id}
            onDelete={this.handleDelete}
            counter={counter}
          ></Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
