import React, { Component } from "react";

class Paginator extends Component {
  // Define a limit
  // Define a offset
  // No. of items in the list

  render() {
    const { items, limit, pageId, onPageClicked } = this.props;
    const pagesCount = Math.ceil(items.length / limit);
    const pagesArray = [];
    for (let i = 1; i <= pagesCount; i++) {
      pagesArray.push(i);
    }

    return (
      <nav aria-label="...">
        <ul className="pagination pagination-lg">
          {/* <li className="page-item active" aria-current="page">
            <span className="page-link">1</span>
          </li> */}

          {pagesArray.map((p) => (
            <li
              key={p}
              className={this.getPageIdClasses(p, pageId)}
              onClick={() => onPageClicked(p)}
            >
              <a className="page-link" href="#">
                {p}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  getPageIdClasses = (pageId, currentPageId) => {
    let classes = "page-item";
    if (pageId === currentPageId) classes += " active";
    return classes;
  };
}

export default Paginator;
