import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "../constants";

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (localStorage.getItem("Token")) {
            window.location.href = "/logout";
        }
    }, []);
    function usernameHandler(event) {
        setUsername(event.target.value)
    }
    function passwordHandler(event) {
        setPassword(event.target.value)
    }

    function login() {
        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: BaseUrl + '/api/login/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("Token", response.data.token);
                setMessage("Logged in successfully");
            })
            .catch((error) => {
                console.log(error);
                setMessage(error.response.data);
            });
    }
    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" onChange={usernameHandler} />
            <input type="password" placeholder="Password" onChange={passwordHandler} />
            <button onClick={login}>Login</button>
            <p>{message}</p>
        </div>
    );
}

export default Login;