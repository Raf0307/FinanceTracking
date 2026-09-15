import { Link } from 'react-router-dom';

function Navbar() {
    
    function logout(){
        localStorage.removeItem('token')
        window.location.href = '/login';
        };

    return(
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/goals">Goals</Link>
            <Link to="/settings">Settings</Link>
            <button onClick={logout}>Logout</button>
        </nav>
    );
}

export default Navbar;