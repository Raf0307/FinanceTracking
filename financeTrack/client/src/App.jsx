import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx'
import Expenses from './pages/Expenses.jsx'
import NewExpense from './pages/NewExpense.jsx'
import Navbar from './components/Navbar.jsx'



function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/login' && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expenses/new" element={<NewExpense />} />
        <Route path="/expenses/:id/edit" element={<h1>Edit Expense</h1>} />
        <Route path="/goals" element={<h1>Goals</h1>} />
        <Route path="/goals/new" element={<h1>New Goal</h1>} />
        <Route path="/goals/:id" element={<h1>Goals Details</h1>} />
        <Route path="/goals/:id/edit" element={<h1>Edit Goal</h1>} />
        <Route path="/settings" element={<h1>Settings</h1>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;