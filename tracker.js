const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
    e.preventDefault();

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    updateLocalStorage();
    init();

    text.value = '';
    amount.value = '';
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    init();
}

function updateValues() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0);
    const incomeTotal = amounts.filter(a => a > 0).reduce((acc, a) => acc + a, 0);
    const expenseTotal = amounts.filter(a => a < 0).reduce((acc, a) => acc + a, 0);

    balance.innerText = `₹${total}`;
    income.innerText = `₹${incomeTotal}`;
    expense.innerText = `₹${Math.abs(expenseTotal)}`;
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount > 0 ? 'plus' : 'minus';

    const item = document.createElement('li');
    item.classList.add(sign);

    item.innerHTML = `
        ${transaction.text}
        <span>${transaction.amount > 0 ? '+' : ''}${transaction.amount}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

form.addEventListener('submit', addTransaction);

init();
