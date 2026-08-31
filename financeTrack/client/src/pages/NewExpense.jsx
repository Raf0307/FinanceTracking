import { useState } from "react";
import api from '../api';

function NewExpense() {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [expense_date, setExpenseDate] = useState('');
    const [description, setDescription] = useState('');
    async function handleSubmit() {
        try {
            const response = await api.post('/expenses', {
                amount: amount,
                category: category,
                expense_date: expense_date,
                description: description
            });
            window.location.href = '/expenses';
        } catch (error) {
            console.log('Error with submitting Expense: ' + error);
        }
    };

    return (
        <div>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <select onChange={(e) => setCategory(e.target.value)}>
                <option>Rent</option>
                <option>Food</option>
                <option>Entertainment</option>
                <option>Utilities</option>
            </select>
            <input
                type="date"
                value={expense_date}
                onChange={(e) => setExpenseDate(e.target.value)}
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <button onClick={handleSubmit}>Save</button>
        </div>
    )
};

export default NewExpense;