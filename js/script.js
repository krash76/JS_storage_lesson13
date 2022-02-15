"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");

let todoData = [] ;
let getStorageResult = JSON.parse(localStorage.getItem("todoDataStorage"));

const render = function() {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  todoData.forEach((item) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.innerHTML = `<span class="text-todo"> ${item.text}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>`;
    if (item.completed === false) {
      todoList.append(li);
    } else {
      todoCompleted.append(li);
    }
    li.querySelector(".todo-complete").addEventListener("click", () => {
      item.completed = !item.completed;
      render();
    })
    li.querySelector(".todo-remove").addEventListener("click", () => {
      li.querySelector(".todo-remove").closest("li").remove();
      todoData.splice(todoData.indexOf(item), 1);
      render();
    })
  }); 
  localStorage.setItem("todoDataStorage", JSON.stringify(todoData));
};

todoControl.addEventListener("submit", (event) => {
  event.preventDefault();
  if (headerInput.value.trim() !== "") { 
    let newTodo = {
      text: headerInput.value,
      completed: false
    };
    todoData.push(newTodo);
    headerInput.value = "";
    render();
  }
});

if (getStorageResult !== null) {
todoData = getStorageResult;
render();
};

//localStorage.clear();
