import { useState, useEffect } from "react";
import api from '../api';
import { Link } from "react-router-dom";

function Expenses() {
    const [expenses, setExpenses] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await api.get('/expenses')
            setExpenses(response.data.expenses) 
        } catch (error) {
            console.log('Error retrieving data:' + error)
        }
    }
    fetchData()
    }, [])
    return (
        <div>
            <h1>Expenses</h1>
            {expenses.map((item) => (
                <div key={item.id}>
                    <p>{item.category}: ${item.amount}</p>
                </div>
            ))}
            <Link to={"/expenses/new"}>Add new Expense</Link>
        </div>
    )
};

export default Expenses;