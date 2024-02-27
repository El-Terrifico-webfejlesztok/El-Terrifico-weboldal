import React, { useState } from 'react';
import UserProfileEditForm from './UserProfileEditForm';
import ChangePasswordForm from './ChangePasswordForm';
import { User } from '@prisma/client';
import ProfilePictureChooser from './ProfilePictureChooser';

// User a prisma schamból akinek csak a biztonságosan megosztható adatai vannak meg (nincs password például)
export type UserView = Omit<Omit<User, 'is_active'>, 'password'>;

interface UserProfileViewProps {
    user: UserView;
    reload?: Function;
}

type Mode = 'editProfile' | 'changePassword' | 'changePicture';

const UserProfileSettings: React.FC<UserProfileViewProps> = ({ user, reload }) => {
    const [mode, setMode] = useState<Mode | null>(null);

    const handleButtonClick = (newMode: Mode) => {
        setMode((prevMode) => (prevMode === newMode ? null : newMode));
    };

    const handleCancelClick = () => {
        setMode(null);
    };

    return (
        <div>
            <div className='flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center items-center'>
                <div>
                    <button
                        className={`btn btn-${mode === 'editProfile' ? 'neutral' : 'info'} btn-sm`}
                        onClick={() => handleButtonClick('editProfile')}
                    >
                        Adatok módosítása
                    </button>
                </div>
                <div>
                    <button
                        className={`btn btn-${mode === 'changePassword' ? 'neutral' : 'info'} btn-sm`}
                        onClick={() => handleButtonClick('changePassword')}
                    >
                        Jelszó megváltoztatása
                    </button>
                </div>
                <div>
                    <button
                        className={`btn btn-${mode === 'changePicture' ? 'neutral' : 'info'} btn-sm`}
                        onClick={() => handleButtonClick('changePicture')}
                    >
                        Profilkép megváltoztatása
                    </button>
                </div>
            </div>
            {mode === 'editProfile' && <UserProfileEditForm user={user} onCancel={handleCancelClick} reload={reload} />}
            {mode === 'changePassword' && <ChangePasswordForm onCancel={handleCancelClick} />}
            {mode === 'changePicture' && <ProfilePictureChooser onCancel={handleCancelClick} />}

        </div>
    );
};

export default UserProfileSettings;
