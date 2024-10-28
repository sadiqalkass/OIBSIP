class Calculator{
    constructor(frScreen, secSrceen){
        this.frScreen = frScreen
        this.secSrceen = secSrceen
        clear()
    }

}
const numBtns = document.querySelectorAll("[data-num-btn]")
const oprationBtns = document.querySelectorAll('[data-opration-btn]')
const allClearbtn = document.querySelector('[data-AC-btn]')
const delBtn = document.querySelector('[data-Del-btn]')
const equalBtn = document.querySelector('[data-equal-btn]')
let frScreen = document.getElementById("cal-screen")
let secSrceen = document.getElementById("answer-screen")

let currentNum = '';
let previousNum = '';
let calOpration = '';


function appendNum(num) {
    if (currentNum == '') {
        currentNum = num
    }else{
        currentNum = currentNum + num
    }
}

function clear() {
    calOpration = ''
    currentNum = ''
    previousNum = ''
}

function chooseOpr(opration) {
    if(currentNum === '') return
    if (previousNum !== '') {
        compute()
    }
    calOpration = opration
    previousNum = currentNum
    currentNum = ''
}
function updateOutput() {
    if (previousNum === '') {
        frScreen.innerText = ''
    }
    if (calOpration !== '') {
        frScreen.innerText = `${previousNum} ${calOpration}`
    }
    secSrceen.innerText = currentNum
}

function compute() {
    let answer
    let prev = Number(previousNum)
    let curr = Number(currentNum)
    switch (calOpration) {
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
        default:
            console.log("something else")
            break;
    }
    currentNum = answer
    previousNum = ''
    calOpration = ''
}
function deleteOp() {
    currentNum = currentNum.toString().slice(0,-1)
}

numBtns.forEach(btn => {
    btn.addEventListener("click",() =>{
        appendNum(btn.innerText)
        updateOutput()
    })
})

oprationBtns.forEach(btn => {
    btn.addEventListener("click",() =>{
        chooseOpr(btn.innerText)
        updateOutput()
    })
})

allClearbtn.addEventListener("click",() =>{
    clear()
    updateOutput()
})

equalBtn.addEventListener("click",() =>{
    compute()
    updateOutput()
})
delBtn.addEventListener("click",() =>{
    deleteOp()
    updateOutput()
})

