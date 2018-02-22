const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentTotal = 0;
let operationJustClicked = false;
let currentOperation;

display.textContent = "0";

buttons.forEach((button) => {
    button.addEventListener("click", buttonClickHandler);
});

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function clear() {
    currentTotal = 0;
    currentOperation = "";
    display.textContent = "0";
}

function operate(operator, a, b) {
    switch (operator) {
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            if (b == 0) {
                display.textContent = "Error";
            } else {
                return divide(a, b);
            }
        case "equals":
            if (currentOperation != operator) {
                const result = operate(currentOperation, currentTotal, parseFloat(display.textContent));
                currentOperation = "";
                return result;
            } else {
                currentOperation = "";
                return display.textContent;
            }
        default:
            return;
    }
}

function buttonClickHandler() {
    if (!this.classList.contains("operation")) {
        if (operationJustClicked) {
            currentTotal = parseFloat(display.textContent);
            display.textContent = "0";
            operationJustClicked = false;
        }

        if (this.dataset.label == "decimal") {
            if (display.textContent.indexOf(".") == -1) {
                display.textContent = parseFloat(display.textContent) + ".";
            }
        } else if (display.textContent == "0") {
            display.textContent = this.dataset.label;
        } else {
            if (display.textContent.indexOf("e") != -1) {
                display.textContent = parseFloat(display.textContent) + this.dataset.label;
            } else {
                display.textContent += this.dataset.label;
            }
        }     
        
        handleDisplay();
    } else {
        switch (this.dataset.label) {
            case "clear":
                clear();
                break;
            case "sign":
                break;
            default:
                if (currentOperation && !operationJustClicked) {
                    display.textContent = operate(currentOperation, currentTotal, parseFloat(display.textContent));
                }

                currentOperation = this.dataset.label;
                operationJustClicked = true;
                break;
        }
    }
}

function handleDisplay() {
    const currentFontSize = parseInt(window.getComputedStyle(display).fontSize);
    if (display.textContent.length > 6) {
        if (currentFontSize > 20) {
            display.style.fontSize = currentFontSize * 0.85 + "px";
        }
        if (display.textContent.length > 17) {
            display.textContent = parseFloat(display.textContent).toExponential(5);
        }
    } else {
        display.style.fontSize = "48px";
    }
}