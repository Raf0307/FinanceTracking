import { useState, useEffect } from "react";
import api from '../api';
import { Link, useParams } from "react-router-dom";



function EditGoal() {
    const [target_amount, setTargetAmount] = useState('');
    const [name, setName] = useState('');
    const [target_date, setTargetDate] = useState('');
    const [notes, setNotes] = useState('');
    const [current_amount, setCurrentAmount] = useState('');
    const { id } = useParams();

    async function handleSubmit() {
        try {
            const response = await api.put(`/goals/${id}`, {
                target_amount: target_amount,
                name: name,
                target_date: target_date,
                notes: notes,
                current_amount: current_amount
            });
            window.location.href = '/goals';
        } catch (error) {
            console.log('Error with submitting goal: ' + error);
        }
    };
    async function handleDelete() {
        try {
            const response = await api.delete(`/goals/${id}`);
            window.location.href = '/goals';
        } catch (error) {
            console.log('Error with deleting goal: ' + error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/goals/${id}`)
                setTargetAmount(response.data.goal.target_amount);
                setName(response.data.goal.name);
                setTargetDate(response.data.goal.target_date.substring(0, 10));
                setNotes(response.data.goal.notes);
                setCurrentAmount(response.data.goal.current_amount);
            } catch (error) {
                console.log('Error retrieving data:' + error)
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <h1>Edit Goal</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                type="number"
                value={target_amount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="Amount"
            />
            <input
                type="date"
                value={target_date}
                onChange={(e) => setTargetDate(e.target.value)}
            />
            <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Description"
            />
            <button onClick={handleSubmit}>Save</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default EditGoal;