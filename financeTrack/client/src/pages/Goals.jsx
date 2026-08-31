import { useState, useEffect } from "react";
import api from '../api';
import { Link } from "react-router-dom";

function Goals(){
    const [goals, setGoals] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await api.get('/goals');
            setGoals(response.data.goals);
        } catch (error) {
            console.log('Error retrieving data:' + error);
        }
    }
    fetchData()
    }, []);
    return(
        <div>
            <h1>Goals</h1>
            {goals.map((item) => (
                <div key={item.id}>
                    <p>{item.name}: {item.target_amount} - {item.current_amount} = {item.target_amount - item.current_amount}</p>
                    <Link to={`/goals/${item.id}/edit`}>Edit Goal</Link>
                </div>
            ))}
            <Link to={"/goals/new"}>Add new Goal</Link>
        </div>
    ) 
};

export default Goals;