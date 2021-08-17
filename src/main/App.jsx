import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Routes from './Routes'

export default props =>
    <HashRouter>
        <div className="app">
            {(window.location.pathname !== '/login' && window.location.pathname !== '/signup') ?
                <React.Fragment>
                    <Logo />
                    <Nav />
                </React.Fragment>
                :
                <React.Fragment>
                    <aside className='logo2'></aside>
                    <aside className='menu-area2'></aside>
                </React.Fragment>
            }
            <Routes />
            <NotificationContainer />
        </div>
    </HashRouter>