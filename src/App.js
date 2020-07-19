import React, { Component } from "react";
import classNames from "classnames";
import "./App.css";
import TodoItem from "./components/TodoItem";
import checkAllImg from "./img/check-all.svg";

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoItems: JSON.parse(this.getData()) || [],
      filter: null,
    };
    this.onKeyEnterInIput = this.onKeyEnterInIput.bind(this);
    this.onClickedAll = this.onClickedAll.bind(this);
    this.onClickDeleteAll = this.onClickDeleteAll.bind(this);
  }

  onItemClicked(item) {
    return (event) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState(
        {
          todoItems: [
            ...todoItems.slice(0, index),
            {
              ...item,
              isComplete: !isComplete,
            },
            ...todoItems.slice(index + 1),
          ],
        },
        this.saveData
      );
    };
  }

  getData() {
    return localStorage.getItem("TodoItems", this.todoItems);
  }

  saveData() {
    localStorage.setItem("TodoItems", JSON.stringify(this.state.todoItems));
  }

  onKeyEnterInIput(event) {
    let text = event.target.value;
    if (!text) return;
    text = text.trim();
    if (!text) return;
    if (event.keyCode === 13) {
      this.setState(
        {
          todoItems: [
            { title: text, isComplete: false },
            ...this.state.todoItems,
          ],
        },
        this.saveData
      );
      event.target.value = "";
    }
  }

  onClickedAll() {
    this.setState({
      todoItems: [...this.state.todoItems].map((i) => {
        return {
          title: i.title,
          isComplete: true,
        };
      }),
    });
  }
  onClickDeleteAll(event) {
    this.setState(
      {
        todoItems: [...this.state.todoItems].filter((item) => {
          return item.isComplete === false;
        }),
      },
      this.saveData
    );
  }

  onClickFilterAll(type) {
    let check = false;
    if (type == "completed") check = true;
    console.log(check, this.state.filter);
    if (
      (check == this.state.filter && this.state.filter !== null) ||
      type == "all"
    )
      check = null;
    return this.setState({
      filter: check,
    });
  }

  render() {
    const { todoItems, filter } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-input">
            <img
              src={checkAllImg}
              width={32}
              height={32}
              onClick={this.onClickedAll}
            ></img>
            <input
              type="text"
              placeholder="Add a new item"
              onKeyUp={this.onKeyEnterInIput}
            ></input>
          </div>
          {todoItems.length > 0 &&
            todoItems
              .filter((i) => {
                return filter != null ? i.isComplete == filter : i;
              })
              .map((item, index) => (
                <TodoItem
                  key={index}
                  item={item}
                  onClick={this.onItemClicked(item)}
                />
              ))}
          {todoItems.length === 0 && "Nothing here!"}
          {todoItems.length > 0 && (
            <div className="btn-del-filter">
              <p className="btn-del" onClick={this.onClickDeleteAll}>
                Delete Completed
              </p>
              <p
                className={classNames("btn-filter", {
                  active: filter == null,
                })}
                onClick={() => {
                  this.onClickFilterAll("all");
                }}
              >
                All
              </p>
              <p
                className={classNames("btn-filter", {
                  active: filter == true,
                })}
                onClick={() => {
                  this.onClickFilterAll("completed");
                }}
              >
                Completed
              </p>
              <p
                className={classNames("btn-filter", {
                  active: filter == false,
                })}
                onClick={() => {
                  this.onClickFilterAll("unfinish");
                }}
              >
                Unfinish
              </p>
            </div>
          )}
        </header>
      </div>
    );
  }
}
export default App;
