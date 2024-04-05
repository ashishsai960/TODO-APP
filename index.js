// Getting All Required Fields
const inputElement = document.getElementById("input");
const emptyView = document.getElementById("empty-view");
const addTodoButton = document.getElementById("add-todo");
const inputBorder = document.getElementById("input-border");
const listContainer = document.getElementById("todo-list");
const themeIcon = document.getElementById("icon-image");
const footerName = document.getElementById("span");

let counter = 0;
let todoList = [];

document.addEventListener("DOMContentLoaded", () => {
	loadTodosFromStorage();
});

inputElement.addEventListener("input", () => {
	// on typing todo displaying Add Todo button and changing border color of input
	addTodoButton.classList.add("block");
	inputBorder.classList.add("input-border-change");
});

inputElement.addEventListener("keydown", (event) => {
	if (event.keyCode === 13 && inputElement.value !== "") {
		emptyView.classList.add("none");
		getInputValue();
	}
});

themeIcon.addEventListener("click", () => {
	const mainDiv = document.getElementById("todo-app-main-container");
	const todoContainer = document.getElementById("todo-container");

	if (themeIcon.src.endsWith("light-mode.svg")) {
		themeIcon.src = "dark-mode.svg";
		mainDiv.classList.add("todo-app-main-container-lg");
		todoContainer.style.backgroundColor = "White";
		inputElement.classList.add("input-lg");
		inputBorder.style.borderColor = "#24273d";
		addTodoButton.classList.add("add-todo-button-lg");
		document.getElementById("empty-line").style.color = "Black";
		footerName.style.color = "black";
	} else {
		themeIcon.src = "light-mode.svg";
		inputBorder.style.borderColor = "#4f5668";
		mainDiv.classList.remove("todo-app-main-container-lg");
		todoContainer.style.backgroundColor = "#24273d";
		inputElement.classList.remove("input-lg");
		addTodoButton.classList.remove("add-todo-button-lg");
		document.getElementById("empty-line").style.color =
			"rgb(237, 234, 234)";
		footerName.style.color = "white";
	}
	updateRenderedFiles();
});

function loadTodosFromStorage() {
	let localTodoList = JSON.parse(localStorage.getItem("todoList"));
	for (let item of localTodoList) {
		todoList.push(item);
	}
	renderLocalTodos();
}

function renderLocalTodos() {
	todoList.forEach((item) => {
		const todoItemDiv = createTodoItem(item);
		listContainer.insertBefore(todoItemDiv, listContainer.firstChild);
	});
}

function createTodoItem(item) {
	emptyView.classList.add("none");
	const todoItemDiv = document.createElement("div");
	todoItemDiv.id = item.id;
	todoItemDiv.classList.add("todo-item-div");

	const todoItem = document.createElement("li");
	todoItem.id = item.id;
	todoItem.className = "todoItem";
	todoItem.textContent = item["todo"];

	const checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.id = item.id;
	checkBox.checked = item.isChecked;
	checkBox.className = "checkbox";

	if (checkBox.checked) {
		if (themeIcon.src.endsWith("dark-mode.svg")) {
			todoItem.classList.add("text-decoration-lg");
		} else {
			todoItem.classList.add("text-decoration");
		}
	} else {
		todoItem.classList.remove("text-decoration-lg", "text-decoration");
	}

	checkBox.addEventListener("click", function () {
		handleClickFunction(checkBox, todoItem, (newTodo = item.todo));
	});

	const removeIcon = document.createElement("img");
	removeIcon.src = "close1.svg";
	removeIcon.className = "removeIcon";

	todoItemDiv.appendChild(checkBox);
	todoItemDiv.appendChild(todoItem);
	todoItemDiv.appendChild(removeIcon);

	removeIcon.addEventListener("click", function () {
		handleRemoveIcon(todoItemDiv);
	});
	counter += 1;

	return todoItemDiv;
}

function updateRenderedFiles() {
	const divItems = document.querySelectorAll(".todo-item-div");
	divItems.forEach((item) => {
		changeThemeForRenderedItems(item);
	});
}

function changeThemeForRenderedItems(item) {
	if (themeIcon.src.endsWith("dark-mode.svg")) {
		item.classList.add("todo-item-div-lg");
		item.children[1].classList.add("todoItem-lg");
		item.children[2].src = "icons/close.svg";
	} else {
		item.classList.remove("todo-item-div-lg");
		item.children[1].classList.remove("todoItem-lg");
		item.children[2].src = "icons/close1.svg";
	}
}

function handleRemoveIcon(todoItemDiv) {
	listContainer.removeChild(todoItemDiv);
	if (listContainer.children.length === 0) {
		emptyView.classList.remove("none");
	}
	todoList.pop(counter);
	localStorage.setItem("todoList", JSON.stringify(todoList));
	counter -= 1;
}

function handleClickFunction(checkBox, todoItem, newTodo) {
	const itemIndex = todoList.findIndex((item) => item.todo === newTodo);
	if (checkBox.checked) {
		if (themeIcon.src.endsWith("dark-mode.svg")) {
			todoItem.classList.add("text-decoration-lg");
		} else {
			todoItem.classList.add("text-decoration");
		}

		todoList[itemIndex].isChecked = true;
		localStorage.setItem("todoList", JSON.stringify(todoList));
	} else {
		todoItem.classList.remove("text-decoration-lg", "text-decoration");
		todoList[itemIndex].isChecked = false;
		localStorage.setItem("todoList", JSON.stringify(todoList));
	}
}

function getInputValue() {
	emptyView.classList.add("none");

	// getting input value
	const newTodo = inputElement.value;

	// after clicking Add Todo button removing button form field
	addTodoButton.classList.remove("block");

	// after clicking Add Todo button changing border color
	inputBorder.classList.remove("input-border-change");

	// Clearing The Input Field....
	inputElement.value = "";

	const todoItemDiv = document.createElement("div");
	todoItemDiv.id = counter;
	todoItemDiv.classList.add("todo-item-div");

	const todoItem = document.createElement("li");
	todoItem.id = "todoItem";
	todoItem.className = "todoItem";
	todoItem.textContent = newTodo;

	const listItem = {
		id: counter,
		todo: newTodo,
		isChecked: false,
	};
	todoList.push(listItem);

	const checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.id = counter;
	checkBox.className = "checkbox";

	checkBox.addEventListener("click", function () {
		handleClickFunction(checkBox, todoItem, newTodo);
	});

	const removeIcon = document.createElement("img");
	removeIcon.src = "close1.svg";
	removeIcon.className = "removeIcon";

	removeIcon.addEventListener("click", function () {
		handleRemoveIcon(todoItemDiv);
	});

	todoItemDiv.appendChild(checkBox);
	todoItemDiv.appendChild(todoItem);
	todoItemDiv.appendChild(removeIcon);
	listContainer.insertBefore(todoItemDiv, listContainer.firstChild);
	counter += 1;
	localStorage.setItem("todoList", JSON.stringify(todoList));
}
