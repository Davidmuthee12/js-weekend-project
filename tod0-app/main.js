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
    // STEP: create a reasonably unique id.
    // Option A (simple): return Date.now() + Math.floor(Math.random() * 1000);
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  function getFilteredTodos() {
    // STEP: return the array based on current filter
    // - "all"       -> return todos as-is
    // - "active"    -> return todos where completed === false
    // - "completed" -> return todos where completed === true
    if (filter === "active") return todos.filter(t => !t.completed);
    if (filter === "completed") return todos.filter(t => t.completed);
    return todos;
  }

  function setActiveFilterButton() {
    // STEP: visually mark the active filter button
    // 1) Remove 'active' class from all three
    // 2) Add 'active' to the one matching current filter
    [filterAllBtn, filterActiveBtn, filterCompletedBtn].forEach(b => b.classList.remove("active"));
    if (filter === "all") filterAllBtn.classList.add("active");
    if (filter === "active") filterActiveBtn.classList.add("active");
    if (filter === "completed") filterCompletedBtn.classList.add("active");
  }

  // ---------- Core Actions ----------
  function addTask(text) {
    // STEP 1: Build a task object
    // const task = { id: generateId(), text, completed: false, createdAt: Date.now() };

    // STEP 2: Push into todos[]
    // todos.push(task);

    // STEP 3: Persist and re-render
    // saveTodos();
    // renderTasks();
  }

  function toggleTask(id) {
    // STEP 1: Find task by id
    // const task = todos.find(t => t.id === id);
    // if (!task) return;

    // STEP 2: Flip completed boolean
    // task.completed = !task.completed;

    // STEP 3: Persist and re-render
    // saveTodos();
    // renderTasks();
  }

  function deleteTask(id) {
    // STEP 1: Remove the task with matching id
    // todos = todos.filter(t => t.id !== id);

    // STEP 2: Persist and re-render
    // saveTodos();
    // renderTasks();
  }

  function clearCompleted() {
    // STEP 1: Keep only tasks where completed === false
    // todos = todos.filter(t => !t.completed);

    // STEP 2: Persist and re-render
    // saveTodos();
    // renderTasks();
  }

  function setFilter(newFilter) {
    // STEP 1: Update the filter variable
    // filter = newFilter;

    // STEP 2: Update active button styling
    // setActiveFilterButton();

    // STEP 3: Re-render with new filter
    // renderTasks();
  }

  // ---------- Rendering ----------
  function renderTasks() {
    // STEP 1: Clear the current list (remove all children)
    // taskList.innerHTML = "";

    // STEP 2: Compute the list to display using getFilteredTodos()
    // const visible = getFilteredTodos();

    // STEP 3: For each task, build a <li> with:
    //   - dataset.id = task.id
    //   - a checkbox (checked = task.completed)
    //   - a <span> for the text
    //   - a button.delete for the X icon
    //
    // Example:
    // visible.forEach(task => {
    //   const li = document.createElement("li");
    //   li.dataset.id = String(task.id);
    //   if (task.completed) li.classList.add("completed");
    //
    //   const checkbox = document.createElement("input");
    //   checkbox.type = "checkbox";
    //   checkbox.checked = task.completed;
    //
    //   const span = document.createElement("span");
    //   span.textContent = task.text;
    //
    //   const delBtn = document.createElement("button");
    //   delBtn.className = "delete";
    //   delBtn.textContent = "✖";
    //
    //   li.appendChild(checkbox);
    //   li.appendChild(span);
    //   li.appendChild(delBtn);
    //   taskList.appendChild(li);
    // });

    // STEP 4: Update the "tasks left" count (active tasks only)
    // const remaining = todos.filter(t => !t.completed).length;
    // taskCount.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} left`;
  }

  // ---------- Persistence ----------
  function saveTodos() {
    // STEP: Convert todos to JSON and store
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function loadTodos() {
    // STEP 1: Read from localStorage
    // const raw = localStorage.getItem(STORAGE_KEY);

    // STEP 2: If something saved, parse it safely
    // try {
    //   todos = raw ? JSON.parse(raw) : [];
    // } catch (e) {
    //   console.warn("Corrupt todos in storage, resetting.", e);
    //   todos = [];
    // }

    // STEP 3: Initial UI render + filter buttons state
    // setActiveFilterButton();
    // renderTasks();
  }

  // ---------- Event Wiring ----------
  addTaskBtn.addEventListener("click", () => {
    // STEP 1: Grab and sanitize input value
    // const text = taskInput.value.trim();
    // if (!text) return; // ignore empty

    // STEP 2: Call addTask(text)
    // addTask(text);

    // STEP 3: Clear input & refocus for faster entry
    // taskInput.value = "";
    // taskInput.focus();
  });

  // Pressing Enter in the input should add the task
  taskInput.addEventListener("keydown", (e) => {
    // if (e.key === "Enter") {
    //   addTaskBtn.click();
    // }
  });

  // Use event delegation for checkbox toggles & delete clicks
  taskList.addEventListener("click", (e) => {
    // STEP: Determine what was clicked
    // const li = e.target.closest("li");
    // if (!li) return;
    // const id = Number(li.dataset.id); // dataset is string

    // if (e.target.matches("input[type='checkbox']")) {
    //   toggleTask(id);
    // }

    // if (e.target.matches(".delete")) {
    //   deleteTask(id);
    // }
  });

  // Filter buttons
  filterAllBtn.addEventListener("click", () => {
    // setFilter("all");
  });
  filterActiveBtn.addEventListener("click", () => {
    // setFilter("active");
  });
  filterCompletedBtn.addEventListener("click", () => {
    // setFilter("completed");
  });

  // Clear Completed
  clearCompletedBtn.addEventListener("click", () => {
    // clearCompleted();
  });

  // ---------- Bootstrap the app ----------
  loadTodos();
});
