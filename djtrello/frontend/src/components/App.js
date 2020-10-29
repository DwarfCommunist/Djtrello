import React from 'react';
import '../../static/frontend/bootstrap.min.css';
import '../../static/frontend/App.css';
import '../../static/frontend/index.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Login from './Login';
import SignUp from './Signup';
import Navbar from "./Navbar";

function App() {
    return(
        <Router>
            <div className="App">
                <Navbar/>
                <div className="outer">
                    <div className="inner">
                        <Switch>
                            <Route exact path='/' component={Login}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/register" component={SignUp}/>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;