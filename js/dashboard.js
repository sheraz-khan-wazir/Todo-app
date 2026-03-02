
// 1️⃣ Protected Route
var currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
    window.location.href = "login.html";
}

// Show email
document.getElementById("user-email").textContent = currentUser.email;

// Logout
document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
});


// 2️⃣ Load Tasks

var todos = JSON.parse(localStorage.getItem("todos")) || [];
var currentFilter = "all";

var taskList = document.getElementById("task-list");
var emptyState = document.getElementById("empty-state");


// 3️⃣ Add Task

document.getElementById("add-task-btn").addEventListener("click", function () {

    var title = document.getElementById("task-title").value.trim();
    var desc = document.getElementById("task-desc").value.trim();

    if (title === "") {
        alert("Enter task title");
        return;
    }

    var newTask = {
        id: Date.now().toString(),
        title: title,
        description: desc,
        isCompleted: false,
        userId: currentUser.id
    };

    todos.push(newTask);
    localStorage.setItem("todos", JSON.stringify(todos));

    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";

    renderTasks();
});


// 4️⃣ Render Tasks

function renderTasks() {

    taskList.innerHTML = "";

    var userTasks = todos.filter(function (task) {
        return task.userId === currentUser.id;
    });

    // Apply filter
    if (currentFilter === "pending") {
        userTasks = userTasks.filter(function (task) {
            return task.isCompleted === false;
        });
    }

    if (currentFilter === "completed") {
        userTasks = userTasks.filter(function (task) {
            return task.isCompleted === true;
        });
    }

    if (userTasks.length === 0) {
        emptyState.style.display = "block";
    } else {
        emptyState.style.display = "none";
    }

    userTasks.forEach(function (task) {

        var div = document.createElement("div");
        div.className = "task-card";

        if (task.isCompleted) {
            div.classList.add("completed");
        }

        div.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description || ""}</p>
            <div class="task-buttons">
                <button onclick="toggleTask('${task.id}')">✔</button>
                <button onclick="openEditSection('${task.id}')">✏</button>
                <button onclick="deleteTask('${task.id}')">🗑</button>
            </div>
        `;

        taskList.appendChild(div);
    });

    updateStats();
}


// 5️⃣ Toggle Complete

function toggleTask(id) {

    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].isCompleted = !todos[i].isCompleted;
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    renderTasks();
}


// 6️⃣ Delete Task

function deleteTask(id) {

    todos = todos.filter(function (task) {
        return task.id !== id;
    });

    localStorage.setItem("todos", JSON.stringify(todos));
    renderTasks();
}


// 7️⃣ Edit Section

function openEditSection(id) {

    var task = todos.find(function (t) {
        return t.id === id;
    });

    document.getElementById("edit-task-id").value = task.id;
    document.getElementById("edit-task-title").value = task.title;
    document.getElementById("edit-task-desc").value = task.description;

    document.getElementById("edit-section").style.display = "block";
}

function closeEditSection() {
    document.getElementById("edit-section").style.display = "none";
}

function saveEditTask() {

    var id = document.getElementById("edit-task-id").value;
    var newTitle = document.getElementById("edit-task-title").value.trim();
    var newDesc = document.getElementById("edit-task-desc").value.trim();

    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos[i].title = newTitle;
            todos[i].description = newDesc;
        }
    }

    localStorage.setItem("todos", JSON.stringify(todos));

    closeEditSection();
    renderTasks();
}

// ==========================
// 8️⃣ Filters
// ==========================
var filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {

        filterButtons.forEach(function (b) {
            b.classList.remove("active");
        });

        this.classList.add("active");
        currentFilter = this.getAttribute("data-filter");

        renderTasks();
    });
});

// ==========================
// 9️⃣ Update Stats
// ==========================
function updateStats() {

    var userTasks = todos.filter(function (task) {
        return task.userId === currentUser.id;
    });

    var total = userTasks.length;

    var completed = userTasks.filter(function (task) {
        return task.isCompleted;
    }).length;

    var pending = total - completed;

    document.getElementById("stat-total").textContent = total;
    document.getElementById("stat-pending").textContent = pending;
    document.getElementById("stat-completed").textContent = completed;
}

// Initial Load
renderTasks();
