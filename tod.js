(function () {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    const todoContainer = document.querySelector(".todo");

    const top = document.createElement("div");
    top.className = "top";

    const inputTask = document.createElement("input");
    inputTask.type = "text";
    inputTask.placeholder = "Enter a task...";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.className = "add-btn";

    const todoList = document.createElement("div");
    todoList.className = "list";

    top.append(inputTask, addBtn);
    todoContainer.append(top, todoList);
    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    function renderTask(task) {
        const todoItem = document.createElement("div");
        todoItem.className = "item";

        const text = document.createElement("p");
        text.textContent = task;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {

            const index = todos.indexOf(task);

            if (index !== -1) {
                todos.splice(index, 1);
                saveTodos();
            }

            todoItem.remove();

        });

        todoItem.append(text, deleteBtn);
        todoList.prepend(todoItem);

    }

    function addTodo() {

        const task = inputTask.value.trim();

        if (task === "") return;

        todos.unshift(task);
        saveTodos();

        renderTask(task);

        inputTask.value = "";
        inputTask.focus();

    }

    addBtn.addEventListener("click", addTodo);

    inputTask.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            addTodo();
        }
    });

    todos.forEach(function (task) {
        renderTask(task);
    });

})();