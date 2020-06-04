document.addEventListener("DOMContentLoaded", () => {
  const getHistory = () => {
    return document.querySelector('.history-value').innerText;
  }

  const printHistory = (num) => {
    document.querySelector('.history-value').innerText = num;
  }

  const getOutput = () => {
    return document.querySelector('.output-value').innerText;
  }
  const printOutput = (num) => {
    if (num === "") {
      document.querySelector('.output-value').innerText = num;
    }
    return document.querySelector('.output-value').innerText = getFormattedNumber(num);;
  }


  const getFormattedNumber = (num) => {
    if (num === "-") {
      return "";
    }
    const n = Number(num);
    const value = n.toLocaleString("en");
    return value;
  }

  reverseNumberFormat = (num) => {
    return Number(num.replace(/,/g, ''))
  }

  const operator = document.getElementsByClassName('operator');
  for(let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', () => {
      if (operator[i].id === "clear") {
        printHistory('');
        printOutput('');
      } else if (operator[i].id === "backspace") {
        let output = reverseNumberFormat(getOutput()).toString();
        if (output) {
          output = output.substr(0, output.length -1)
          printOutput(output);
        }
      } else {
        let currentOutput = getOutput();
        let history = getHistory();
        if (currentOutput === "" && history !== "") {
          if (isNaN(history[history.length-1])) {
            history = history.substr(0, history.length-1);
          }
        }
        if (currentOutput !== "" || history !== "") {
          currentOutput = currentOutput === "" ?
            currentOutput : reverseNumberFormat(currentOutput);
          history = history + currentOutput;
          if (operator[i].id == "=") {
            const result = eval(history);
            printOutput(result);
            printHistory("");
          } else {
            history = history + operator[i].id;
            printHistory(history);
            printOutput("");
          }
        }
      }
    });
  }


  const numbers = document.getElementsByClassName('number');
  for(let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', () => {
      const initialOutput = reverseNumberFormat(getOutput());
      if (initialOutput !== NaN) {
        printOutput(initialOutput + numbers[i].id)
      }
    })
  }


})
