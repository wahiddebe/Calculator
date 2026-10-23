// Operasi Dasar Aritmatika
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Nol? Ndak BIsa!";
    }
    return a / b;
}

// Fungsi Utama untuk Operasi Evaluasi
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

// State Variabel Kalkulator
let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

// Elemen DOM
const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.btn.digit');
const operatorButtons = document.querySelectorAll('.btn.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const decimalButton = document.getElementById('decimal');

// Helper untuk memperbarui layar & membatasi desimal agar tidak overflow
function updateDisplay(content) {
    if (typeof content === 'number') {
        // Pembulatan angka desimal agar tidak terlalu panjang
        content = Math.round(content * 1000000) / 1000000;
    }
    display.textContent = content;
}

// Menangani Input Angka
function appendDigit(digit) {
    if (display.textContent === '0' || shouldResetDisplay) {
        display.textContent = '';
        shouldResetDisplay = false;
    }
    display.textContent += digit;
}

// Menangani Input Desimal / Titik
function appendDecimal() {
    if (shouldResetDisplay) {
        display.textContent = '0';
        shouldResetDisplay = false;
    }
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

// Menangani Pemilihan Operator
function setOperator(operator) {
    if (currentOperator !== null) {
        evaluate();
    }
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetDisplay = true;
}

// Menghitung Hasil
function evaluate() {
    if (currentOperator === null || shouldResetDisplay) return;

    secondNumber = display.textContent;
    const result = operate(currentOperator, firstNumber, secondNumber);

    updateDisplay(result);

    if (result === "Nol? Ndak BIsa!") {
        firstNumber = '';
        secondNumber = '';
        currentOperator = null;
        shouldResetDisplay = true;
    } else {
        firstNumber = result;
        currentOperator = null;
        shouldResetDisplay = true;
    }
}

// Reset Kalkulator (AC)
function clear() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    shouldResetDisplay = false;
}

// Hapus Karakter Terakhir (Backspace)
function handleBackspace() {
    if (shouldResetDisplay) return;
    if (display.textContent.length === 1 || display.textContent === 'Nol? Ndak BIsa!') {
        display.textContent = '0';
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

// --- Event Listeners untuk Tombol (Klik UI) ---
digitButtons.forEach(button => {
    button.addEventListener('click', () => appendDigit(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperator(button.dataset.operator));
});

decimalButton.addEventListener('click', appendDecimal);
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', handleBackspace);

// --- Dukungan Keyboard ---
window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendDigit(e.key);
    if (e.key === '.') appendDecimal();
    if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault();
        evaluate();
    }
    if (e.key === 'Backspace') handleBackspace();
    if (e.key === 'Escape') clear();
    if (['+', '-', '*', '/'].includes(e.key)) setOperator(e.key);
});
