import React, {useState} from "react";
import useHttp from "../../hooks/http.hook";
import './Sale.scss'

export default function Sale({addClass}) {
    const {request} = useHttp()
    const [IDor, setIDor] = useState(null)
    const [loading, setLoading] = useState(false)


    const sale = () => {
        let nowDate = new Date()

        setLoading(true)
        request('/api/goods/sale', 'POST', {IDor: IDor, date: String(nowDate.getFullYear()) + '-' + String(nowDate.getMonth() + 1) + '-' + String(nowDate.getDate()) + " " + String(nowDate.getHours()) + ":" + String(nowDate.getMinutes()) + ":" + String(nowDate.getSeconds())}).then(req => {
            // if(req.res) {
            setLoading(false)
            window.location.reload();
            // }
        })
    }

    const idChanger = (e) => {
        setIDor(e.target.value)
    }

    return (
        <div className={`Sale${addClass ? ' ' + addClass : ""}`}>
            <h1 className="Sale__head">
                Завершение завказов
            </h1>
            <div className="Sale__body">
                <h3 className="Sale__head-input">
                    ID заказа
                </h3>
                <input type="text" className="Sale__order-input" onChange={idChanger}/>
                <button className="Sale__btn" onClick={sale} disabled={loading || !IDor}>
                    Завершить заказ
                </button>
            </div>

        </div>
    )
}