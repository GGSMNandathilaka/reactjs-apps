import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";

// rendering data for the table body
// columns
class TableBody extends Component {
  renderCells = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  renderLink = (item, column) => {
    return column.parentLink + "/" + item._id;
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {column.isLink ? (
                  <Link to={this.renderLink(item, column)}>
                    {this.renderCells(item, column)}
                  </Link>
                ) : (
                  this.renderCells(item, column)
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
