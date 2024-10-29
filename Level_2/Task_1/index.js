class Calculator{
    constructor(frScreen, secSrceen){
        this.frScreen = frScreen
        this.secSrceen = secSrceen
        this.clear()
    }

    clear() {
        this.calOpration = ''
        this.currentNum = ''
        this.previousNum = ''
    }

    appendNum(num) {
        if (this.currentNum == '') {
            this.currentNum = num
        }else{
            this.currentNum = this.currentNum + num
        }
    }
    
    
    chooseOpr(opration) {
        if(this.currentNum === '') return
        if (this.previousNum !== '') {
            this.compute()
        }
        this.calOpration = opration
        this.previousNum = this.currentNum
        this.currentNum = ''
    }
    updateOutput() {
        if (this.previousNum === '') {
            frScreen.innerText = ''
        }
        if (this.calOpration !== '') {
            frScreen.innerText = `${this.previousNum} ${this.calOpration}`
        }
        secSrceen.innerText = this.currentNum
    } 

    compute() {
        let answer
        let prev = Number(this.previousNum)
        let curr = Number(this.currentNum)
        switch (this.calOpration) {
            case "+":
                answer = prev + curr
                break;
            case "x":
                answer = prev * curr
                break;
            case "-":
                answer = prev - curr
                break;
            case "÷":
                answer = prev / curr
                break;
            case "√":
                answer = Math.sqrt(prev)
                break;
        }
        this.currentNum = answer
        this.previousNum = ''
        this.calOpration = ''
    }

    deleteOp() {
        this.currentNum = this.currentNum.toString().slice(0,-1)
    }   
}
const numBtns = document.querySelectorAll("[data-num-btn]")
const oprationBtns = document.querySelectorAll('[data-opration-btn]')
const allClearbtn = document.querySelector('[data-AC-btn]')
const delBtn = document.querySelector('[data-Del-btn]')
const equalBtn = document.querySelector('[data-equal-btn]')
let frScreen = document.getElementById("cal-screen")
let secSrceen = document.getElementById("answer-screen")

/* let currentNum = '';
let previousNum = '';
let calOpration = ''; */

const calculator = new Calculator(frScreen,secSrceen)



numBtns.forEach(btn => {
    btn.addEventListener("click",() =>{
        calculator.appendNum(btn.innerText)
        calculator.updateOutput()
    })
})

oprationBtns.forEach(btn => {
    btn.addEventListener("click",() =>{
        calculator.chooseOpr(btn.innerText)
        calculator.updateOutput()
    })
})

allClearbtn.addEventListener("click",() =>{
    calculator.clear()
    calculator.updateOutput()
})

equalBtn.addEventListener("click",() =>{
    calculator.compute()
    calculator.updateOutput()
})
delBtn.addEventListener("click",() =>{
    calculator.deleteOp()
    calculator.updateOutput()
})

