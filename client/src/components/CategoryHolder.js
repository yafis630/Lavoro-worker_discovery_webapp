import React from "react";
import { Link } from "react-router-dom";

const CategoryHolder = (props) => {
  return (
    <div className="category-holder">
      <h2>
        <Link to={`/workers/${props.name}`}>{props.name}</Link>
      </h2>
    </div>
  );
};

export default CategoryHolder;
