function eval() {
    // Do not use eval!!!
    return;
}

let opPriorities = {"+":1, "-":1, "/":2, "*":2};
let num_stack = [];
let op_stack = [];

function expressionCalculator(expr) {
  if (checkBrackets(expr) == false) throw new Error("ExpressionError: Brackets must be paired");
  let parsedExpr = parseString(expr);
  let len = parsedExpr.length;

  for(let i = 0; i < len; i++) {
    if (typeof(parsedExpr[i]) == "number") num_stack.push(parsedExpr[i]);
    else if (parsedExpr[i] == "(") op_stack.push(parsedExpr[i]);
    else if (parsedExpr[i] == ")") {
      while(op_stack[op_stack.length - 1] != '(') doOperations();
      op_stack.pop();
    }
    else {
      while(true) {
        if(op_stack.length == 0 || op_stack[op_stack.length - 1] == '(' || opPriorities[parsedExpr[i]] > opPriorities[op_stack[op_stack.length - 1]]) {
          op_stack.push(parsedExpr[i]);
          break;
        }
        else doOperations();
      }
    }
  }
  while(op_stack.length != 0) doOperations();
  let ret = num_stack.pop();
  num_stack = [];
  op_stack = [];
  return ret;
}

function calculateOperation(arg1, arg2, op) {
  let res = 0;
  switch (op) {
  case '+':
    res = arg1 + arg2; break;
  case '-':
    res = arg1 - arg2; break;
  case '*':
    res = arg1 * arg2; break;  
  case '/':
    if(arg2 == 0) {
      num_stack = [];
      op_stack = [];
      throw new Error("TypeError: Division by zero.");
    }
    res = arg1 / arg2; 
  }
  return res;
}

function parseString(expr) {
  let arr = [];
  let len = expr.length;
  let number = "";
  for(let i = 0; i < len; i++) {
    let code = expr.charCodeAt(i);
    if(code >= 48 && code <=57) number += expr[i];
    else {
      if(number != "") {
        arr.push(parseInt(number));
        number = "";
      }
      if(expr[i] != " ") arr.push(expr[i]);
    }
  }
  if(number != "") arr.push(parseInt(number));
  return arr;
}

function checkBrackets(expr) {
  let open_brackets = 0;
  let closed_brackets = 0;
  let len = expr.length;
  for(let i = 0; i < len; i++) {
    if(expr[i] == '(') open_brackets++;
    else if(expr[i] == ')') closed_brackets++;
  }
  if(open_brackets == closed_brackets) return true;
  else return false;
}

function doOperations() {
  let y = num_stack.pop();
  let x = num_stack.pop();
  let cur_op = op_stack.pop();
  let val = calculateOperation(x, y, cur_op);
  num_stack.push(val);
}

module.exports = {
    expressionCalculator
}
