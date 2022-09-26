import {useCallback, useState} from "react";
import useHttp from "./http.hook";

export default function useAuth() {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userLogin, setUserLogin] = useState(null)
    const {request} = useHttp()

    const login = useCallback((jwtToken, id, login) => {
        const storData = JSON.parse(localStorage.getItem('userData'))
        if (!storData || !storData.token) {
            localStorage.setItem('userData', JSON.stringify({
                userId: id,
                token: jwtToken,
                login
            }))
        }

        setToken(jwtToken)
        setUserId(id)
        setUserLogin(login)

        checkToken(jwtToken)
    }, [token])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUserLogin(null)

        localStorage.removeItem('userData')
    }, [])

    const checkToken = (jwtToken) => {
        request('/api/auth/token', 'POST', {token: jwtToken}).then(req => {
            if (!req.res) {
                logout()
            }
        })
    }

    if (!token) {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data && data.token) {
            login(data.token, data.userId, data.login)
        }
    }

    return {login, logout, token, userId, userLogin}
}