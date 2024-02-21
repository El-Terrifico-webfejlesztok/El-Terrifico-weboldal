// ChangePasswordForm.js

import React, { useState } from 'react';

interface ChangePasswordFormProps {
    onCancel: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onCancel }) => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSave = async () => {
        try {
            // Make a POST request to update the password
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any necessary headers, like authorization headers if needed
                },
                body: JSON.stringify(passwords),
            });

            // Check if the response is successful (status code 200-299)
            if (response.ok) {
                // Optionally handle successful response
                console.log('Password changed successfully');
            } else {
                // Handle error responses
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred during the password change:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSave} className='flex flex-col max-w-lg gap-3 mx-auto items-center p-2'>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Jelenlegi jelszó</span>
                    </div>
                    <input
                        type='password'
                        id='currentPassword'
                        className='input input-bordered'
                        value={passwords.currentPassword}
                        onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Új jelszó</span>
                    </div>
                    <input
                        type='password'
                        id='newPassword'
                        className='input input-bordered'
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Jelszó megerősítése</span>
                    </div>
                    <input
                        type='password'
                        id='confirmPassword'
                        className='input input-bordered'
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                    />
                </label>

                <div className='w-full flex '>
                    <button className='btn btn-neutral mr-auto w-40' type='button' onClick={onCancel}>Mégsem</button>
                    <button className='btn btn-primary ml-auto w-40' type='submit'>Jelszó megváltoztatása</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
