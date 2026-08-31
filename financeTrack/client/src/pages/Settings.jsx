import { useState } from "react";
import api from '../api';

function Settings() {
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');

    async function handleSubmit() {
        try {
            const response = await api.put('/auth/password', {
                currentPassword: currentPassword,
                newPassword: newPassword
            })
            console.log('Succesful password change')
            setCurrentPassword('')
            setNewPassword('')
        } catch (error) {
            console.log("Error submitting password change: " + error)
        }
    }

    return (
        <div>
            <h1>Settings</h1>
            <form id="PasswordResetForm">
                <input type="password" placeholder="Current Password" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword} />
                <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
            </form>
            <button onClick={handleSubmit}>Reset</button>
        </div>
    )
}

export default Settings;