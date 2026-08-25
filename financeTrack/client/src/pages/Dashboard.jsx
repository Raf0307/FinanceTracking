import { useState, useEffect } from "react";
import api from '../api';

function Dashboard() {
    const [summary, setSummary] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/expenses/summary')
                setSummary(response.data.summary);
            } catch (error) {
                console.log('Error: ' + error);
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
            {summary.map((item) => (
                <div key={item.category}>
                    <p>{item.category}: ${item.total}</p>
                </div>
            ))}
        </div>
    )
}


export default Dashboard;