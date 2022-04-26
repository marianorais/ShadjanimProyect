import React from 'react'
import { Navbar } from './Navbar'
import { ActionButtons } from "./ActionButtons";
import { Management } from './Management';
import { History } from 'history';

export const OptionsScreen: React.FC<{history: History}> = ({history}) => {

    return (
        <div className="shiduj-screen">
            <Navbar page="options"/>
            <ActionButtons page="options" history={history}/>
            <Management history={history}></Management>
        </div>
    )
}
