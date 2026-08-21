import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx'


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      <Route path="/expenses" element={<h1>Expenses</h1>} />
      <Route path="/expenses/new" element={<h1>New Expense</h1>} />
      <Route path="/expenses/:id/edit" element={<h1>Edit Expense</h1>} />
      <Route path="/goals" element={<h1>Goals</h1>} />
      <Route path="/goals/new" element={<h1>New Goal</h1>} />
      <Route path="/goals/:id" element={<h1>Goals Details</h1>} />
      <Route path="/goals/:id/edit" element={<h1>Edit Goal</h1>} />
      <Route path="/settings" element={<h1>Settings</h1>} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;