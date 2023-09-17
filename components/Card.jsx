import React from "react";
import classes from "@styles/card.module.css";

const Card = ({}) => {
  return (
    <div className={classes.book}>
      <p>Employee Details</p>
      <div className={classes.cover}>
        <p>Employee Photo</p>
      </div>
    </div>
  );
};

export default Card;
