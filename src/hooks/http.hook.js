import {useCallback, useState} from "react";

export default function useHttp () {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true)
        try{
            if (body) {
                headers['Content-Type'] = 'application/json'
                body = JSON.stringify(body)
            }

            const response = await fetch(url, {
                method,
                headers,
                body
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Что-то пошло не так")
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback( () => setError(null), [])

    return {loading, request, error, clearError}
}