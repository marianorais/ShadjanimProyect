import React from 'react'
import { Navbar } from './Navbar';
import  {Management}  from './Management';


export const LockSettingScreen = () => {
    return (
        <div className="shiduj-screen">
            <Navbar page="lockSetting"/>
            <Management/>
        </div>
    )
}