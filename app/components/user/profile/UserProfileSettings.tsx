// UserProfileView.js

import React, { useState } from 'react';
import UserProfileEditForm from './UserProfileEditForm';
import ChangePasswordForm from './ChangePasswordForm';
import { User } from '@prisma/client';

export type UserView = Omit<Omit<User, 'is_active'>, 'password'>;

interface UserProfileViewProps {
    user: UserView;
    reload?: Function;
}

const UserProfileSettings: React.FC<UserProfileViewProps> = ({ user, reload }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setIsChangingPassword(false); // Close password change form when canceling
    };

    const handleChangePasswordClick = () => {
        setIsChangingPassword(true);
    };

    return (
        <div>
            {isEditing ? (
                // Edit Mode
                <UserProfileEditForm user={user} onCancel={handleCancelClick} reload={reload} />
            ) : 
            
            isChangingPassword ? (
                // Password Change Mode
                <ChangePasswordForm onCancel={handleCancelClick} />
            ) : (
                // View Mode
                <>
                    <div>
                        <button className='btn btn-primary btn-sm' onClick={handleEditClick}>
                            Adatok módosítása
                        </button>
                    </div>
                    <div>
                        <button className='btn btn-warning mt-2 btn-sm' onClick={handleChangePasswordClick}>
                            Jelszó megváltoztatása
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfileSettings;
