import React, { useState } from 'react';
import { UserView } from './UserProfileSettings';
import { signOut } from 'next-auth/react';

interface UserProfileEditFormProps {
    user: UserView;
    onCancel: () => void;
    reload?: Function;
}

const UserProfileEditForm: React.FC<UserProfileEditFormProps> = ({ user, onCancel, reload }) => {
    // Add state for form fields and loading
    const [editedUser, setEditedUser] = useState({
        username: user?.username || undefined,
        email: user?.email || undefined,
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            setLoading(true);

            editedUser.username === user.username
            const isUnchanged =
                editedUser.username === user.username && editedUser.email === user.email;



            // Make a PUT request to update user details
            const response = await fetch('/api/user/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any necessary headers, like authorization headers if needed
                },
                body: JSON.stringify(editedUser),
            });

            // Check if the response is successful (status code 200-299)
            if (response.ok) {
                // Reload user data after successful update
                if (reload) {
                    reload();
                    setSuccessMessage('Adatok sikeresen elmentve!');
                    signOut();
                }
            } else {
                // Handle error responses
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred during the update:', error);
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <form onSubmit={handleSave} className='flex flex-col max-w-lg gap-3 mx-auto items-center p-2'>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Felhasználónév</span>
                    </div>
                    <input
                        type='text'
                        id='username'
                        className='input input-bordered'
                        value={editedUser.username}
                        onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">E-mail</span>
                    </div>
                    <input
                        type='text'
                        id='email'
                        className='input input-bordered'
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    />
                </label>
                <div className='w-full flex '>
                    <button className='btn btn-neutral mr-auto w-40' type='button' onClick={onCancel}>
                        Mégsem
                    </button>
                    <button
                        className='btn btn-primary ml-auto w-40'
                        type='button'
                        onClick={handleSave}
                        disabled={loading}
                    >
                        {loading ? 'Mentés...' : 'Adatok elmentése'}
                    </button>
                </div>
                {successMessage && <p className='text-success mt-2'>{successMessage}</p>}
                <div role="alert" className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Az adatok módosítása után újra be kell jelenteznie</span>
                </div>
            </form>
        </div>
    );
};

export default UserProfileEditForm;
