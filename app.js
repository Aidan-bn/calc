class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
      this.keyboardInput()
    }
  
    keyboardInput() {
        document.addEventListener('keypress', e => {
          switch (e.key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
              this.appendNumber(e.key)
              this.updateDisplay()
              break
            case '.':
              this.appendNumber('.')
              this.updateDisplay()
              break
            case '+':
            case '-':
            case '*':
            case '/':
              this.operationChoose(e.key)
              // this.operation(e.key)
              this.updateDisplay()
              break
            case 'Escape':
              this.clear(e.key)
              this.updateDisplay()
              break
            case 'Enter':
              this.compute(e.key)
              this.updateDisplay()
              break
            case 'Backspace':
              this.delete(e.key)
              this.updateDisplay()
              break
            default:
          }
        })
      }

    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) {
        return
    }
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') {
        return
      }
      
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if(current === 0){
        return alert("Sorry, but you can't compute with zero!")
      }
      if (isNaN(prev) || isNaN(current)) {
        return
      }
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '/':
          computation = prev / current
          break
        default:
          return
      }
      computation = parseFloat(computation).toFixed(4)
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }

    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }

    limitCharacter(id, length){
      this.currentOperandTextElement.innerHTML(substr(0, 10))
    }
  }
    
  const numberButtons = document.querySelectorAll('[number]')
  const operationButtons = document.querySelectorAll('[operation]')
  const equalsButton = document.querySelector('[equals]')
  const deleteButton = document.querySelector('[delete]')
  const allClearButton = document.querySelector('[all-clear]')
  const previousOperandTextElement = document.querySelector('[previous-operand]')
  const currentOperandTextElement = document.querySelector('[current-operand]')
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

    numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
 