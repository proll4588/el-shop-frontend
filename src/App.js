import React, {useCallback, useState} from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import './App.scss';
import useRoutes from "./routes";
import SideBar from './UI/SideBar/SideBar'
import HeadBar from './UI/HeadBar/HeadBar'
import useAuth from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {LockContext} from "./context/LockContext";

function App() {
    const [sideBar, setSideBar] = useState(true);
    const {token, userId, login, logout, userLogin} = useAuth()

    const routes = useRoutes(!!token, userId)

    const toggleSideBar = useCallback(() => {
        setSideBar(!sideBar);
    }, [sideBar])

    return (
        <AuthContext.Provider value={{
            token, userId, login, logout, isAuth: !!token, userLogin
        }}>
            <LockContext.Provider value={{isLock: false}}>
                <Router>
                    <div className="App">
                        <SideBar isMini={sideBar}/>
                        <div className={`main ${sideBar ? '' : 'main_mini'}`}>
                            <HeadBar toggleSideBar={toggleSideBar}/>
                            {routes}
                        </div>
                    </div>
                </Router>
            </LockContext.Provider>
        </AuthContext.Provider>
    )
}

export default App;
