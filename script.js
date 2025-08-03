const buttons = document.querySelectorAll('.button')
const display = document.querySelector(".display")

let firstOperand = null;
let secondOperand = null;
let operator = null;
let reset = false;

buttons.forEach((button) => {
    button.addEventListener('click', (event)=>{
        handleClick(button)
        console.log(event.target.textContent)
    })
})

// 이건 버튼 나누는 거
function handleClick (button) {
    // 숫자
    if (button.classList.contains('number')){
        handleNumber(button)
    }

    // 연산자
    if (button.classList.contains('equal')) {
        handleEqual()
    } else if (button.classList.contains('operator')){
        handleOperator(button)
    }

    // 기능
    if (button.classList.contains('function')){
        handleFunction(button.textContent)
    }

    // 소수점
    if (button.classList.contains('dot')){
        updateDotOnTheDisplay()
    }
}

// 이건 화면 출력용
    // 숫자
function updateNumberOnTheDisplay (button) {
    if (display.textContent.includes('%')) return
    if(display.textContent === '0'){
        display.textContent = button.textContent
    } else {
        display.textContent += button.textContent
    }
}
function updateResultOnTheDisplay (result) {
    if (isNaN(result)){
        display.textContent = "계산할 수 없습니다.\n C 로 계산기를 초기화해주세요."
        display.classList.add('NaN')
    } else {
        display.textContent = result
    }
}
        // 소수점
function updateDotOnTheDisplay(){
    if(!display.textContent.includes('.')){
        display.textContent += '.'
    }
}
    // 리셋
function shouldResetDisplay (){
    if (reset){
        display.textContent = ''
        reset = false
    }
}

// 이건 상태 처리용
    // number
function handleNumber(button) {
    if (display.classList.contains('NaN')) return
    shouldResetDisplay ()
    updateNumberOnTheDisplay (button)
}

    // operator
function handleOperator(button) {
    if (firstOperand !== null && operator !== null){
        calculateAndStoreOperator(button)
    } else {
        storeFirstOperand(button)
    }
}
function storeFirstOperand (button) {
    firstOperand = display.textContent
    operator = button.textContent
    reset = true
    console.log(`firstOperand: ${firstOperand}, operator: ${operator}`)
}
function calculateAndStoreOperator (button) {
    updateResultOnTheDisplay (isCalculating())
    firstOperand = display.textContent
    operator = button.textContent
    console.log(`firstOperand: ${firstOperand}, operator: ${operator}`)
}

    // equal
function handleEqual() {
    updateResultOnTheDisplay (isCalculating())
    operator = null
}

    // function
function handleFunction(ft){
    switch (ft) {
        case 'C' :
            display.textContent = '0'
            firstOperand = null;
            secondOperand = null;
            operator = null;
            reset = false;
            display.classList.remove('NaN')
            return
        case '±' :
            if (display.classList.contains('NaN')) return
            display.textContent = parseFloat(display.textContent) * -1
            return
        case '%' :
            if (display.classList.contains('NaN')) return
            if (!display.textContent.includes('%')){
                display.textContent += '%'
            }
            return 
        default : break
    }
}

// 이건 계산
function calculate (num1, operator, num2) {
    switch (operator) {
        case '+' :
            return num1 + num2
        case '-' :
            return num1 - num2
        case '*' :
            return num1 * num2
        case '/' :
            if (num2 === 0) return NaN
            return num1 / num2
        default : break;
    }
}
function isCalculating() {
    secondOperand = display.textContent
    hasPercent()
    const result = parseFloat(
        calculate(
            parseFloat(firstOperand), operator, parseFloat(secondOperand)
        ).toFixed(2)
    )
    reset = true
    return result
}
function hasPercent () {
    if (firstOperand.includes('%')) {
        firstOperand = parseFloat(firstOperand) / 100
    } else if (secondOperand.includes('%')) {
        secondOperand = parseFloat(secondOperand) / 100
    }
}