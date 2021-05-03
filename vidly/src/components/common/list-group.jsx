import React from "react";

const ListGroup = (props) => {
  const { genres, currentGenre, onGenreSelected } = props;
  return (
    <ul className="list-group">
      {genres.map((g) => (
        <li
          key={g._id}
          className={
            g._id === currentGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreSelected(g._id)}
        >
          {g.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
