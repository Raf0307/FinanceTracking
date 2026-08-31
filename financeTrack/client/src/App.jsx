import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Settings from './pages/Settings.jsx';
import Dashboard from './pages/Dashboard.jsx'
import Expenses from './pages/Expenses.jsx'
import NewExpense from './pages/NewExpense.jsx'
import EditExpense from './pages/EditExpense.jsx'
import Goals from './pages/Goals.jsx'
import NewGoal from './pages/NewGoal.jsx'
import EditGoal from './pages/EditGoal.jsx'
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
        <Route path="/expenses/:id/edit" element={<EditExpense />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/goals/new" element={<NewGoal />} />
        <Route path="/goals/:id" element={<h1>Goals Details</h1>} />
        <Route path="/goals/:id/edit" element={<EditGoal />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;