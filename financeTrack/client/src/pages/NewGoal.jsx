import { useState } from "react";
import api from '../api';

function NewGoal() {
    const [name, setName] = useState('');
    const [target_amount, setTargetAmount] = useState('');
    const [target_date, setTargetDate] = useState('');
    const [notes, setNotes] = useState('');
    
    

    async function handleSubmit() {
        try {
            const response = await api.post('/goals', {
                name: name,
                target_amount: target_amount,
                target_date: target_date,
                current_amount: 0,
                notes: notes
            });
            window.location.href = '/goals';
        } catch (error) {
            console.log('Error with submitting Goal: ' + error);
        }
    }

    return(
        <div>
            <h1>New Goal</h1>
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
                placeholder="Notes"
            />
            <button onClick={handleSubmit}>Save</button>
        </div>
    )
}

export default NewGoal;