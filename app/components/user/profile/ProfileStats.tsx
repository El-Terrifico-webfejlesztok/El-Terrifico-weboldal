import React from 'react'
import { userData } from '@/app/(user)/profile/ProfilePage'

interface StatProps {
    userdata: userData | null;
}

const ProfileStats: React.FC<StatProps> = ({ userdata }) => {
    if (userdata) {
        return (
            //max-h-44
            <div className="stats grid-flow-row grid-cols-2 sm:stats-horizontal sm:overflow-auto shadow mx-auto overflow-auto ">

                <div className="stat">
                    <div className="stat-title">Szállítási címek</div>
                    <div className="stat-value">{userdata.ShippingAddress.length}/5</div>
                    <div className="stat-desc">Maximum 5 fiókonként</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Rendelések</div>
                    <div className="stat-value">{userdata.Order.length}</div>
                    <div className="stat-desc">A rendeléseid száma</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Kommentek</div>
                    <div className="stat-value">{userdata.Comment.length}</div>
                    <div className="stat-desc">Az kommenteid száma</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Posztok</div>
                    <div className="stat-value">{userdata.Post.length}</div>
                    <div className="stat-desc">A posztjaid száma</div>
                </div>


            </div>
        )
    }


}

export default ProfileStats