const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You need to write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        inputBox.value = "";
        saveTasks();
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    }
}, false);

function deleteTask() {
    const checkedTasks = document.querySelectorAll(".checked");
    if (checkedTasks.length === 0) {
        alert("Please select at least one task to delete!");
    } else {
        if (checkedTasks.length === 1) {
            checkedTasks.forEach(task => {
                task.remove();
            });
            saveTasks();
        }
    }
}

function saveTask() {
    saveTasks();
    alert("Tasks saved successfully!");
}

function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
    }
}

inputBox.addEventListener("keypress", function (event) {
    if (event.key === "add-button") {
        addTask();
    }
});

listContainer.addEventListener("dblclick", function (e) {
    if (e.target.tagName === "LI") {
        const li = e.target;
        const currentText = li.innerText;

        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.className = "edit-input";

        li.innerHTML = "";
        li.appendChild(input);
        input.focus();

        input.addEventListener("blur", saveEdit);
        input.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                saveEdit();
            }
        });

        function saveEdit() {
            const newValue = input.value.trim();
        
            if (newValue === "") {
                alert("Task cannot be empty!");
                li.textContent = currentText;
                saveTasks();
                return;
            }
        
            li.textContent = newValue;
            saveTasks();
        }
    }
});
