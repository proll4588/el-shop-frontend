import React, {useEffect, useState} from "react";
import './RegForm.scss'
import useHttp from "../../hooks/http.hook";

export default function RegForm({addClass}) {
    const {loading, error, request, clearError} = useHttp()

    // Определение полей формы
    const [form, setForm] = useState({
        login:'',
        email:'',
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
    const regHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            massage(data.message)
        } catch (e) {}
    }

    return (
        <div className={`RegForm ${addClass}`}>
            <div className="RegForm__container">
                <div className="RegForm__head">
                    Регистрация
                </div>
                <div className="RegForm__inputs">
                    <div className="RegForm__input-box">
                        <input type="text" className="RegForm__input" name={"login"} id={"login"} placeholder={"Login"} onChange={changeHandler}/>
                        <ion-icon name="log-in-outline"></ion-icon>
                    </div>
                    <div className="RegForm__input-box">
                        <input type="text" className="RegForm__input" name={"email"} id={"email"} placeholder={"Email"} onChange={changeHandler}/>
                        <ion-icon name="mail-outline"></ion-icon>
                    </div>
                    <div className="LoginForm__input-box">
                        <input type="password" className="RegForm__input" name={"password"} id={"password"} placeholder={"Password"} onChange={changeHandler}/>
                        <ion-icon name="lock-closed-outline"></ion-icon>
                    </div>
                    <div className="RegForm__btns">
                        <button className="RegForm__btn" onClick={regHandler} disabled={loading}>
                            Создать аккаунт
                        </button>
                        <a href={"/login"} className="RegForm__btn">
                            Уже есть
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}