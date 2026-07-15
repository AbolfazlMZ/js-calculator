class Calculator {
    constructor() {
        // Get elements
        this.display = document.getElementById("display");
        this.allButtons = document.querySelectorAll(".btn");

        // variable for save firstNumber, secondNumber and operator
        this.firstNumber = "";
        this.secondNumber = "";
        this.operator = "";

        // Add event and get data-btn for calculate handling
        this.allButtons.forEach((button) => {
            button.addEventListener(("click"), (e) => {
                const buttonTask = e.currentTarget.dataset.btn;

                switch (buttonTask) {
                    case "+":
                    case "-":
                    case "*":
                    case "/":
                    case "%":
                        this.operatorSelection(buttonTask);
                        break;

                    case "c": {
                        this.clear();
                        break;
                    }

                    case "delete": {
                        this.backspace();
                        break;
                    }

                    case "=": {
                        this.compute();
                        break;
                    }

                    default: {
                        this.appendNumber(buttonTask);
                        break;
                    }
                }
            });
        });
    }

    // Add Number to current or prev variable
    appendNumber(buttonTask) {
        // If exist one dot in currntNumber and secondNumber is empty, exit
        if (this.firstNumber.includes(".") && buttonTask === "." && !this.secondNumber) return;

        // If exist one dot in secondNumber and firstNumber isn't empty, exit
        if (this.secondNumber.includes(".") && buttonTask === ".") return;

        // If firstNumber is zero, leave it blank.
        if ((this.firstNumber === "0" && !this.operator) || this.firstNumber === "Error") {
            this.firstNumber = "";
        }

        // If in firstNumber exist a operator, next numbers append to previousNumber variable
        if (this.operator) {
            this.secondNumber += buttonTask;
        } else {
            this.firstNumber += buttonTask;
        }

        this.updateDisplay();
    }

    // Updating display
    updateDisplay() {
        this.display.value = this.firstNumber + this.operator + this.secondNumber;
    }

    // Select operator
    operatorSelection(operator) {
        if (this.firstNumber === "Error") return;

        if (this.operator && !this.secondNumber) {
            this.operator = operator;
        } else if (!this.operator) {
            if (!this.firstNumber) return;

            this.operator = operator;
        } else {
            this.compute();
            this.operator = operator;
        }

        this.updateDisplay();
    }

    // Obtaining the calculation result 
    compute() {
        if (this.secondNumber === "") return;

        const firstNum = parseFloat(this.firstNumber);
        const secondNum = parseFloat(this.secondNumber);

        let result = 0;

        switch (this.operator) {
            case "+": {
                result = firstNum + secondNum;
                break;
            }

            case "-": {
                result = firstNum - secondNum;
                break;
            }

            case "*": {
                result = firstNum * secondNum;
                break;
            }

            case "/": {
                if (secondNum === 0) {
                    result = "Error"
                    break;
                }

                result = firstNum / secondNum;
                break;
            }

            case "%": {
                result = firstNum % secondNum;
                break;
            }
        }

        this.firstNumber = result.toString();
        this.operator = "";
        this.secondNumber = "";
        this.updateDisplay();
    }

    // Clearing
    clear() {
        this.firstNumber = "";
        this.secondNumber = "";
        this.operator = "";
        this.updateDisplay();
    }

    // Backspace
    backspace() {
        if (this.firstNumber === "Error") {
            this.clear();
            return;
        }

        if (this.secondNumber) {
            this.secondNumber = this.secondNumber.slice(0, -1);
        } else if (this.operator) {
            this.operator = "";
        } else {
            this.firstNumber = this.firstNumber.slice(0, -1);
        }

        this.updateDisplay();
    }
}

// Instance
const calculator = new Calculator();