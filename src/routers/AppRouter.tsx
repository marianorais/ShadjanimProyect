import React, { useEffect, useState } from "react";
import {
    HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { SignInScreen } from "../components/auth/SignInScreen";
import { SignUpScreen } from "../components/auth/SignUpScreen";
import { ShidujScreen } from "../components/shiduj/ShidujScreen";
import { SaveScreen } from "../components/shiduj/SaveScreen";
import { OptionsScreen } from "../components/shiduj/OptionsScreen";
import { SettingScreen } from "../components/shiduj/settings/SettingScreen";
import { LearnScreen } from "../components/shiduj/LearnScreen"


import {LockSectionScreen}  from "../components/shiduj/settings/LockSectionScreen";
import {LockSettingScreen}  from "../components/shiduj/settings/LockSettingScreen";
import {UserPermissionScreen} from "../components/shiduj/settings/UserPermissionScreen";

import {ProfileView} from "../profile/ProfileView";
import {ProfileBlock} from "../profile/ProfileBlock";
import {ProfileHub} from "../profile/ProfileHub";


export const AppRouter = () => {

    let currentUrl = window.location.href

    if(currentUrl.indexOf("%23") !== -1){ 
        //Si no lo contiene devuelve -1
        window.location.href = currentUrl.replace('%23', '?') 
        // reemplazo el %23 por ? por temas de ASCII
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/login"    component={ LoginScreen } />
                    <Route path="/learn"    component={ LearnScreen } />
                    <Route path="/signin"    component={ SignInScreen } />
                    <Route path="/signup"    component={ SignUpScreen } />
                    <Route path="/shiduj"   component={ ShidujScreen } />
                    <Route path="/save"     component={ SaveScreen } />
                    <Route path="/options"  component={ OptionsScreen } />
                    <Route path="/settings" component={ SettingScreen } />
                    <Route path="/settings"  component={ SettingScreen } />
                    <Route path="/selectSections"  component={ LockSectionScreen } />
                    <Route path="/lockSetting"  component={ LockSettingScreen } />
                    <Route path="/selectSections/user"  component={ UserPermissionScreen } />
                    {/* <Route path="/profile/profileView"  component={ ProfileView } /> */}
                    <Route path="/profile/profileHub"    component={ ProfileHub } />
                    <Route path="/profile/profileBlock"  component={ ProfileBlock } />
                    
                    <Redirect to='/shiduj' />
                </Switch>
            </Router>
        </div>
    );

}