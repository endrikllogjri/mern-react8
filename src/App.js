import React, { useState } from "react";
import "./App.css";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    if(newTodo.length === 0){
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false
    }
    setTodos([...todos,todoItem]);
    setNewTodo("");
  };

  const handleTodoDelete = (delIdx) =>{
    const filteredTodos = todos.filter((todo, i) =>{
      return i !== delIdx;
    });
    setTodos(filteredTodos);
  };

  const handleTodoComplete = (idx) =>{
    const updatedTodos = todos.map((todo, i) => {
      if (idx === i){
        todo.complete = !todo.complete;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }



  return (
    <div className="App">
      <form className="container"
        onSubmit={(event) => {
          handleNewTodoSubmit(event);
        }}
      >
        <input
          onChange={(event) => {
            setNewTodo(event.target.value);
          }}
          type="text"
          value={newTodo}
        />
        <div>
          <button className="button">Add</button>
        </div>
      </form>
      {
        todos.map((todo, i)=> {
          const todoClasses = [];
          if(todo.complete) {
           todoClasses.push('line');
          }
          return (
            <div className="text"
             key={i}>
              <span className={todoClasses.join("")}> {todo.text} </span>
              <input onChange={(event) => {
                handleTodoComplete(i);
              }}
               checked={todo.complete} type="checkbox"/>
              <button
               onClick={(event) => {
                handleTodoDelete(i);
              }}>Delete</button>
            </div>
          );
        })
      }
    </div>
  );
}

export default App;
