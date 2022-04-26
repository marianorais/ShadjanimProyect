import React from 'react'
import { Navbar } from './Navbar';
import LockSection  from './LockSections';

export const LockSectionScreen = () => {
    return (
        <div className="shiduj-screen">
            <Navbar page="selectSections"/>
            <LockSection page="selectSections"/>
        </div>
    )
}