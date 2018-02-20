const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

const calculator = {

    currentOperator: "",
    currentTotal: 0,
    displayValue: '0',
    operatorClicked: false,
    
    add: function(a, b) {
        this.currentTotal = a + b;
    },

    subtract: function(a, b) {
        this.currentTotal = a - b;
    },

    multiply: function(a, b) {
        this.currentTotal = a * b;
    },

    divide: function(a, b) {
        this.currentTotal = a / b;
    },

    clear: function() {
        this.currentTotal = 0;
        this.displayValue = "0";
    },

    operate: function(operator, a, b) {
        switch (operator) {
            case "add":
                this.add(a, b);
                break;
            case "subtract":
                this.subtract(a, b);
                break;
            case "multiply":
                this.multiply(a, b);
                break;
            case "divide":
                this.divide(a, b);
                break;
            case "clear":
                this.clear();
                break;
            case "equals":
                this.operate(this.currentOperator, a, b);
                this.displayValue = this.currentTotal;
                break;
            case "sign":
                break;
            case "decimal":
                if (this.displayValue.indexOf(".") == -1) {
                    this.displayValue += ".";
                }
                break;
            default:
                if (b == "0" || this.operatorClicked) {
                    this.displayValue = operator;
                    this.operatorClicked = false;
                } else {
                    this.displayValue += operator;
                }
                break;
        }
    },
};

display.textContent = calculator.displayValue;

buttons.forEach((button) => {
    button.addEventListener("click", buttonClickHandler);
});

function buttonClickHandler(e) {
    if (this.classList.contains("operation") && this.dataset.label != "clear" && this.dataset.label != "sign") {
        calculator.currentOperator = this.dataset.label;
        calculator.operatorClicked = true;
    }
    calculator.operate(this.dataset.label, calculator.currentTotal, parseFloat(calculator.displayValue));
    display.textContent = calculator.displayValue;
    handleDisplay();
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