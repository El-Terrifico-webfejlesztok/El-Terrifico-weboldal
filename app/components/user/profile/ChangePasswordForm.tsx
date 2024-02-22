// ChangePasswordForm.tsx

import React, { useState } from 'react';

interface Passwords {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface ChangePasswordFormProps {
    onCancel: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onCancel }) => {
    const [passwords, setPasswords] = useState<Passwords>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            setLoading(true);

            // Validate passwords
            if (passwords.newPassword !== passwords.confirmPassword) {
                setError('A jelszavak nem egyeznek meg');
                return;
            }

            // Make a POST request to update the password
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword,
                }),
            });

            // Check if the response is successful (status code 200-299)
            if (response.ok) {
                // Optionally handle successful response
                console.log('Password changed successfully!');
                setSuccessMessage('Jelszó sikeresen megváltoztatva!');
                // Reset the form and clear errors
                setPasswords({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
                setError(null);
            } else {
                // Handle error responses
                const errorMessage = await response.json();
                if (errorMessage[0].message) {
                    setError(errorMessage[0].message);
                }
                else {
                    setError(errorMessage)
                }
            }
        } catch (error) {
            console.error('An error occurred during the password change:', error);
            setError('Error during password change');
        } finally {
            setLoading(false);
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

                {error && <div className="text-red-500 mb-2">{error}</div>}
                {successMessage && <div className="text-green-500 mb-2">{successMessage}</div>}

                <div className='w-full flex '>
                    <button className='btn btn-neutral mr-auto w-40' type='button' onClick={onCancel}>
                        Mégsem
                    </button>
                    <button className='btn btn-primary ml-auto w-40' type='submit' disabled={loading}>
                        {loading ? 'Mentés...' : 'Jelszó megváltoztatása'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordForm;
