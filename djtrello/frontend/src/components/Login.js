import React, {useEffect, useState} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import axiosInstance from "../axiosApi";
import {useHistory} from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        axiosInstance.post('/auth/login', {
            username: username,
            password: password
        }).then(
            result => {
                console.log(result.data.access);
                axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + result.data.access;
                localStorage.setItem('access_token', result.data.access);
                localStorage.setItem('refresh_token', result.data.refresh);
                history.push('/dashboard');
            }
        ).catch(error => {
            throw error;
        })
    }

    return (
        <div className="outer">
            <div className="inner">
                <div className="Login">
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <FormGroup controlId="username" bssize="large">
                            <FormControl
                                autoFocus
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" bssize="large">
                            <FormControl
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </FormGroup>
                        <Button block bsSize="large" disabled={!validateForm()} type="submit">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}