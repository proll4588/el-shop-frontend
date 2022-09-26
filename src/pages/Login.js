import React from "react";
import LoginForm from '../UI/LoginForm/LoginForm'
import './Login.scss'

export default function Login() {
    return (
        <div className="Login">
            <LoginForm addClass={"Login__LoginForm"}/>
        </div>
    )
}