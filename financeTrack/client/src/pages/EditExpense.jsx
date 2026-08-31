import { useState, useEffect } from "react";
import api from '../api';
import { Link, useParams } from "react-router-dom";



function EditExpense(){
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [expense_date, setExpenseDate] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();

    async function handleSubmit() {
        try {
            const response = await api.put(`/expenses/${id}`, {
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
    async function handleDelete() {
        try {
            const response = await api.delete(`/expenses/${id}`);
            window.location.href = '/expenses';
        } catch (error) {
            console.log('Error with deleting Expense: ' + error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await api.get(`/expenses/${id}`)
            setAmount(response.data.expense.amount);
            setCategory(response.data.expense.category);
            setExpenseDate(response.data.expense.expense_date.substring(0,10));
            setDescription(response.data.expense.description); 
        } catch (error) {
            console.log('Error retrieving data:' + error)
        }
    }
    fetchData();
    }, [])

    return(
        <div>
            <h1>Edit Expense</h1>
             <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option >Rent</option>
                <option >Food</option>
                <option >Entertainment</option>
                <option >Utilities</option>
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
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default EditExpense;