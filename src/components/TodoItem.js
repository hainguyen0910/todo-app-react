import React, { Component } from "react";
import classNames from "classnames";
import "./todoItem.css";
import checkImg from "../img/check.svg";
import checkCompleteImg from "../img/check-complete.svg";

class TodoItem extends Component {
  render() {
    const { item, onClick } = this.props;
    let urlImg = checkImg;
    if (item.isComplete) urlImg = checkCompleteImg;
    return (
      <div
        className={classNames("TodoItem", {
          "TodoItem-complete": item.isComplete,
        })}
      >
        <img onClick={onClick} src={urlImg} width={32} height={32}></img>
        <p className = "truncate">{this.props.item.title}</p>
      </div>
    );
  }
}

export default TodoItem;
