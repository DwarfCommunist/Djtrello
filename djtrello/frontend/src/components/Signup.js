import React, {Component, useState} from "react";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import axiosInstance from "../axiosApi";
import {Redirect} from 'react-router'

export default function SignUp() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        axiosInstance.post('/auth/register', {
            username: username,
            password: password
        }).then(
            result => {
                setSuccessful(true)
            }
        ).catch(error => {
            throw error;
        })
    }

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function returnRegistration() {
        return (
            <div className="outer">
                <div className="inner">
                    <div className="SignUp">
                        <h3>Register</h3>
                        <form onSubmit={handleSubmit}>
                            <FormGroup controlId="username" bsSize="large">
                                <FormControl
                                    autoFocus
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <FormControl
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                />
                            </FormGroup>
                            <Button block bsSize="large" disabled={!validateForm()} type="submit">
                                Register
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return !successful ? returnRegistration() : <Redirect to="/login"/>;
}