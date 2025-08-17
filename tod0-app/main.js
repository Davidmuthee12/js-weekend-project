"use strict";
document.addEventListener("DOMContentLoaded", () => {
  // ---------- App State ----------
  // We keep all tasks in memory, then persist to localStorage.
  // Each task: { id: number, text: string, completed: boolean, createdAt: number }
  let todos = [];
  let filter = "all"; // "all" | "active" | "completed"

  const STORAGE_KEY = "todos-v1"; // change if you want to reset saved data

  // ---------- DOM References ----------
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const taskCount = document.getElementById("taskCount");

  const filterAllBtn = document.getElementById("filterAll");
  const filterActiveBtn = document.getElementById("filterActive");
  const filterCompletedBtn = document.getElementById("filterCompleted");
  const clearCompletedBtn = document.getElementById("clearCompleted");

  // ---------- Utilities ----------
  function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  function getFilteredTodos() {
    // STEP: return the array based on current filter
    // - "all"       -> return todos as-is
    // - "active"    -> return todos where completed === false
    // - "completed" -> return todos where completed === true
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }

  function setActiveFilterButton() {
    // STEP: visually mark the active filter button
    // 1) Remove 'active' class from all three
    // 2) Add 'active' to the one matching current filter
    [filterAllBtn, filterActiveBtn, filterCompletedBtn].forEach((b) =>
      b.classList.remove("active")
    );
    if (filter === "all") filterAllBtn.classList.add("active");
    if (filter === "active") filterActiveBtn.classList.add("active");
    if (filter === "completed") filterCompletedBtn.classList.add("active");
  }

  // ---------- Core Actions ----------
  function addTask(text) {
    // STEP 1: Build a task object
    const task = {
      id: generateId(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    todos.push(task);
    saveTodos();
    renderTasks();
  }

  function toggleTask(id) {
    const task = todos.find((t) => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    saveTodos();
    renderTasks();
  }

  function deleteTask(id) {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    renderTasks();
  }

  function clearCompleted() {
    todos = todos.filter((t) => !t.completed);
    saveTodos();
    renderTasks();
  }

  function setFilter(newFilter) {
    filter = newFilter;
    setActiveFilterButton();
    renderTasks();
  }

  // ---------- Rendering ----------
  function renderTasks() {
    // BUG FIX: This is the most critical fix. Instead of using innerHTML
    // which destroys event listeners, we rebuild the list from scratch
    // using createElement and appendChild. This is a much more robust pattern.
    taskList.innerHTML = "";
    const visibleTodos = getFilteredTodos();

    visibleTodos.forEach((task) => {
      const li = document.createElement("li");
      li.dataset.id = task.id;
      li.className =
        "flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm transition-transform transform hover:scale-105";
      if (task.completed) {
        li.classList.add("completed");
      }

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className =
        "form-checkbox h-5 w-5 text-blue-600 rounded-md transition-colors duration-200";
      checkbox.checked = task.completed;

      const span = document.createElement("span");
      span.className = "text-gray-800 flex-grow ml-4 font-medium";
      span.textContent = task.text;

      const deleteButton = document.createElement("button");
      deleteButton.className =
        "delete text-red-500 hover:text-red-700 ml-4 font-bold text-lg";
      deleteButton.textContent = "✖";

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });

    // Update the task count
    const remaining = todos.filter((t) => !t.completed).length;
    taskCount.textContent = `${remaining} task${
      remaining !== 1 ? "s" : ""
    } left`;
  }

  // ---------- Persistence ----------
  function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function loadTodos() {
    const raw = localStorage.getItem(STORAGE_KEY);
    try {
      todos = raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.warn("corrupt todos in storage, resetting", error);
      todos = [];
    }
    setActiveFilterButton();
    renderTasks();
  }

  // ---------- Event Wiring ----------
  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;
    addTask(text);
    taskInput.value = "";
    taskInput.focus();
  });

  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTaskBtn.click();
    }
  });

  taskList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = Number(li.dataset.id);
    if (e.target.matches("input[type='checkbox']")) {
      toggleTask(id);
    }
    if (e.target.matches(".delete")) {
      deleteTask(id);
    }
  });

  // Filter buttons
  filterAllBtn.addEventListener("click", () => {
    setFilter("all");
  });
  filterActiveBtn.addEventListener("click", () => {
    setFilter("active");
  });
  filterCompletedBtn.addEventListener("click", () => {
    setFilter("completed");
  });

  clearCompletedBtn.addEventListener("click", () => {
    clearCompleted();
  });

  // ---------- Bootstrap the app ----------
  loadTodos();
});
