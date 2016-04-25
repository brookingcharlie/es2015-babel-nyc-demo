import Calculator from './Calculator';

var calculator = new Calculator("10");
var answer = calculator.add("1", "2");

var answerElement = document.createElement("p");
answerElement.appendChild(document.createTextNode(answer));
document.body.appendChild(answerElement);
