import { useState, useEffect } from "react";
import api from '../api';
import { Link, useParams } from "react-router-dom";

function GoalDetail() {
    const [target_amount, setTargetAmount] = useState('');
    const [name, setName] = useState('');
    const [target_date, setTargetDate] = useState('');
    const [notes, setNotes] = useState('');
    const [current_amount, setCurrentAmount] = useState('');
    const [is_complete, setIsComplete] = useState('')
    const [amount, setAmount] = useState('');
    const { id } = useParams();

    async function handleSubmit() {
        try {
            const response = await api.post(`/goals/${id}/contribute`, {
                amount: amount
            });
            setCurrentAmount(response.data.goal.current_amount);
        } catch (error) {
            console.log('Error with submitting goal: ' + error);
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
                setIsComplete(response.data.goal.is_complete ? "Yes" : "No")
            } catch (error) {
                console.log('Error retrieving data: ' + error)
            }
        }
        fetchData();
    }, [])

    return (
        <div>
            <h1>Goal Details</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Target</th>
                        <th scope="col">Current</th>
                        <th scope="col">Target Date</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Completed?</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{name}</th>
                        <td>{target_amount}</td>
                        <td>{current_amount}</td>
                        <td>{target_date}</td>
                        <td>{notes}</td>
                        <td>{is_complete}</td>
                    </tr>
                </tbody>
            </table>
            <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(e.target.value) }}
                placeholder="Amout to add"
            />
            <button onClick={handleSubmit}>Save</button>
            <Link to={`/goals/${id}/edit`}>Edit Goal</Link>
        </div>
    )

}

export default GoalDetail;