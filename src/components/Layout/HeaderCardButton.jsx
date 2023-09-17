import React from "react";
import CardIcon from "../Cart/CartIcon";
import classes from "./HeaderCardButton.module.css";

function HeaderCardButton(props) {
  return (
    <button onClick={props.showCartHandler} className={classes.button}>
      <span className={classes.icon}>
        <CardIcon />
      </span>
      <span> Your Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  );
}

export default HeaderCardButton;
