document.addEventListener("DOMContentLoaded", () => {
  let currentOperand = "";
  let previousOperand = "";
  let operation = null;

  // ------DOM references ------
  const displayEl = document.getElementById("display");
  const previousDisplayEl = document.getElementById("previous-display");
  const numberButtons = document.querySelectorAll(".btn-number");
  const operatorButtons = document.querySelectorAll(".btn-operator");
  const equalButton = document.querySelector(".btn-equal");
  const clearButton = document.querySelector(".btn-clear");

  function formatNumberForDisplay(numberStr) {
    if (
      numberStr === "Error" ||
      numberStr === "Infinity" ||
      numberStr === "-Infinity"
    ) {
      return numberStr;
    }

    const [intPart, decPart] = numberStr.split(".");
    // convert integer part to Number to use toLocaleString
    const intDisplay = intPart ? Number(intPart).toLocaleString() : "0";
    return decPart !== undefined ? `${intDisplay}.${decPart}` : intDisplay;
  }

  function appendNumber(char) {
    if (char === "0" && currentOperand === "0") return;

    if (char === "." && currentOperand.includes(".")) return;

    currentOperand = currentOperand + char;
    updateDisplay();
  }

  function chooseOperation(op) {
    if (currentOperand === "" && previousOperand !== "") {
      operation = op;
      return updateDisplay();
    }

    if (currentOperand === "") return;

    if (previousOperand !== "") {
      compute();
    }

    operation = op;
    previousOperand = currentOperand;
    currentOperand = "";
    updateDisplay();
  }

  function compute() {
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);

    // validate
    if (isNaN(prev) || isNaN(curr)) return;

    let result;
    switch (operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = curr === 0 ? "Error" : prev / curr;
        break;
      default:
        return;
    }
    currentOperand = result.toString();
    previousOperand = "";
    operation = null;
    updateDisplay();
  }

  function clearAll() {
    currentOperand = "";
    previousOperand = "";
    operation = null;
    updateDisplay();
  }

  function deleteLast() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay;
  }

  function updateDisplay() {
    displayEl.innerText = formatNumberForDisplay(currentOperand);

    // Update the top display with the previous operand and the operation.
    if (operation != null) {
      previousDisplayEl.innerText = `${formatNumberForDisplay(
        previousOperand
      )} ${operation}`;
    } else {
      previousDisplayEl.innerText = "";
    }
  }

  //   ------event wiring (buttons) ------
  numberButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      appendNumber(btn.textContent.trim());
    });
  });

  operatorButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const symbol = btn.textContent.trim();
      const op = symbol === "x" ? "*" : symbol === "÷" ? "/" : symbol;
      chooseOperation(op);
    });
  });

  equalButton.addEventListener("click", () => {
    if (previousOperand === "" || currentOperand === "") returns;
    compute();
  });

  clearButton.addEventListener("click", () => {
    clearAll();
  });

  // Optional: hook keyboard input for convenience
  document.addEventListener("keydown", (e) => {
    // STEP: allow digits, operators, Enter, Backspace, and "."
    if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
      appendNumber(e.key);
      return;
    }

    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
      chooseOperation(e.key);
      return;
    }

    if (e.key === "Enter" || e.key === "=") {
      // prevent form submit or accidental page reloads when pressing Enter
      e.preventDefault();
      if (previousOperand !== "" && currentOperand !== "") compute();
      return;
    }

    if (e.key === "Backspace") {
      deleteLast();
      return;
    }

    if (e.key === "Escape") {
      clearAll();
      return;
    }
  });

  // ---------- Initialization ----------
  // If you want to show 0 at start, ensure display is initialized
  updateDisplay();
});
