// calculator class
class Calculator{
   //string PreviousOperandTextElement;
   //string currentOperandTextElement;
   //string currentOperand;
   //string operation;
   //string previousOperand;



    constructor(PreviousOperandTextElement,currentOperandTextElement){
        this.PreviousOperandTextElement=PreviousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    //Append function 
    appendNumber(number){
        if(number == "." && this.currentOperand.includes("."))return ;
        this.currentOperand = this.currentOperand.toString()+number.toString();
    }
// for givein , in the number
   getDisplaynumber(number){
    const stringNumber = number.toString();
    const integerDigit = parseFloat(stringNumber.split(".")[0]);//split function split the string at dot and store ate index 0
    const decimaldigit = stringNumber.split(".")[1];
    
    //to udate Nan error
    let integerDisplay;
    if(isNaN(integerDigit))integerDisplay="";
    else{
        integerDisplay = integerDigit.toLocaleString("en",{maximumFractionDigits:0});
    }
     if(decimaldigit!=null){
        return `${integerDisplay}.${decimaldigit}`;
     }
     else{
        return integerDisplay;
     }
   }


    //display update means we will update the current and previous element
    updateDisplay(){
        this.currentOperandTextElement.innerText= this.getDisplaynumber(this.currentOperand);
        if(this.operation!=null){
            this.PreviousOperandTextElement.innerText= this.getDisplaynumber(this.previousOperand)+ " " +this.operation;
        }
        else{
            this.PreviousOperandTextElement.innerText="";
        }
    }

    //compute function to calculate
    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);

        switch(this.operation){
            case "+":
                computation = prev+curr;
                break;
            case "-":
                computation = prev-curr;
                break;
            case "*":
                computation = prev*curr;
                break;
            case "÷":
                computation = prev/curr;
                break;
            default :
            return;    

        }
        this.currentOperand =computation;
        this.previousOperand="";
        this.operation=undefined;
    }

    //choose opeartion function
    chooseOpeartion(operation){
        if(this.currentOperand==="")return;
        if(this.previousOperand!==""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand="";
    }

    //clear functiuon

    clear(){
        this.currentOperand = "";
        this.previousOperand="";
        this.opeartion=undefined;
    }

    //delte function

    delete(){
         this.currentOperand= this.currentOperand.toString().slice(0,-1);
    }
}


//this query selector is store all number in array
const numberButton = document.querySelectorAll("[data-number]");
const opeartionButton = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[delete-data]");
const allClearButton = document.querySelector("[clear-all-data]");


const PreviousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");


const calculator = new Calculator(PreviousOperandTextElement,currentOperandTextElement);

// for each variable to 
numberButton.forEach((button)=>{
    button.addEventListener("click",()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

opeartionButton.forEach(button=>{
    button.addEventListener("click", ()=>{
        calculator.chooseOpeartion(button.innerText);
        calculator.updateDisplay()
    })
})

equalButton.addEventListener("click",()=>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener("click",()=>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click",()=>{
    calculator.delete();
    calculator.updateDisplay();
})


