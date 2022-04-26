import React from 'react'
import { Navbar } from './Navbar';
import LockSection  from './LockSections';

export const UserPermissionScreen = () => {
    return (
        <div className="shiduj-screen">
            <Navbar page="selectSections/user"/>
            <LockSection page="selectSections/user"/>
        </div>
    )
}