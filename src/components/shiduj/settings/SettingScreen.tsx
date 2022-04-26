import React from 'react'
import { Navbar } from './Navbar'
import { ActionButtons } from './ActionButtons';

export const SettingScreen = () => {

    return (
        <div className="shiduj-screen">
            <Navbar page="settings"/>
            <ActionButtons page="settings"/>
        </div>
    )
}
