import React, {useEffect} from 'react';
import '../../static/frontend/bootstrap.min.css';
import '../../static/frontend/App.css';
import '../../static/frontend/index.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Login from './Login';
import SignUp from './Signup';
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem("access_token") === null
            ? <Redirect to='/login'/>
            : <Component {...props} />
    )}/>
)

const DefaultRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem("access_token") === null
            ? <Redirect to='/login'/>
            : <Redirect to='/dashboard'/>
    )}/>
)

const AuthRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem("access_token") === null
            ? <Component {...props} />
            : <Redirect to='/dashboard'/>
    )}/>
)
function App() {


    return (
        <Router>
            <Navbar/>
            <div className="App">
                <Switch>
                    <AuthRoute path="/login" component={Login}/>
                    <Route path="/register" component={SignUp}/>
                    <PrivateRoute path='/dashboard' component={Dashboard}/>
                    <DefaultRoute/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;