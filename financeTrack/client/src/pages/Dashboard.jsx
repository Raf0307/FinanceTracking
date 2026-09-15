import { useState, useEffect } from "react";
import api from '../api';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function Dashboard() {
    const [summary, setSummary] = useState([]);
    const [goals, setGoals] = useState([]);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/expenses/summary')
                setSummary(response.data.summary);
                const responseGoals = await api.get('/goals');
                setGoals(responseGoals.data.goals)
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
            <PieChart width={400} height={400}>
                <Pie
                    data={summary}
                    dataKey={(entry) => parseFloat(entry.total)}
                    nameKey="category"
                >
                    {summary.map((entry, index) => (
                        <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
            {goals.map((item) => (
                <div key={item.id}>
                    <div>{item.name}</div>
                    <progress value={parseFloat(item.current_amount)} max={parseFloat(item.target_amount)} style={{width: '300px'}} />
                </div> 
            ))}
        </div>
    )
}


export default Dashboard;