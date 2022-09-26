import React, {useContext, useEffect, useState} from "react";
import './LoginForm.scss'
import useHttp from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

export default function LoginForm({addClass}) {
    const {loading, error, request, clearError} = useHttp()
    const auth = useContext(AuthContext)

    // Определение полей формы
    const [form, setForm] = useState({
        login:'',
        password:''
    })

    // Отображение информации
    const massage = (m) => {
        alert(m)
    }

    // Отображение ошибок
    useEffect(() => {
        if(error) massage(error)
        clearError()
    }, [error, clearError])

    // Обнавление полей формы при изменении контента в input
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    // Отправка данных на сервер
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.login)
        } catch (e) {}
    }

    return (
        <div className={`LoginForm ${addClass}`}>
            <div className="LoginForm__container">
                <div className="LoginForm__head">
                    Login
                </div>
                <div className="LoginForm__inputs">
                    <div className="LoginForm__input-box">
                        <input type="text" className="LoginForm__input" placeholder={"Login"} name={"login"} id={"login"} onChange={changeHandler}/>
                        <ion-icon name="log-in-outline"></ion-icon>
                    </div>
                    <div className="LoginForm__input-box">
                        <input type="password" className="LoginForm__input" placeholder={"Password"} name={"password"} id={"password"} onChange={changeHandler}/>
                        <ion-icon name="lock-closed-outline"></ion-icon>
                    </div>
                    <div className="LoginForm__btns">
                        <button className="LoginForm__btn" onClick={loginHandler} disabled={loading}>
                            Войти
                        </button>
                        <a href={"/reg"} className="LoginForm__btn">
                            Создать аккаунт
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}