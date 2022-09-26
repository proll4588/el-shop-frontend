import React, {useEffect, useState} from "react";
import useHttp from "../../hooks/http.hook";
import './Supply.scss'
import SupInput from "../SupInput/SupInput";

export default function Supply({addClass}) {
    const [allSuppliers, setAllSuppliers] = useState(null)
    const [suppliers, setSuppliers] = useState(null)

    const [selectedSup, setSelectedSup] = useState(null)
    const [inSup, setInSup] = useState('')
    const [visSup, setVisSup] = useState(false)


    const [allGoods, setAllGoods] = useState(null)
    const [selectedGoods, setSelectedGoods] = useState([])
    const [inpCount, setInpCount] = useState(null)
    const [goodsCount, setGoodsCount] = useState(null)

    const [loading, setLoading] = useState(false)

    const {request} = useHttp()

    useEffect(() => {
        request('/api/goods/getSuppliers').then(req => {
            setSuppliers(req)
            setAllSuppliers(req)
        })

        request('/api/goods/getGoods').then(req => {
            setAllGoods(req)
        })

        setInpCount([0])
        setGoodsCount([])
    }, [])

    const visSupChange = () => {
        setVisSup(prev => !prev)
    }
    const selectSup = (e) => {
        suppliers.forEach(supplier => {
            if (supplier.scName === e.target.innerHTML) {
                setSelectedSup(supplier)
                visSupChange()
            }
        })
    }

    useEffect(() => {
        selectedSup ? document.querySelector('.Supply__suppliers-input').value = selectedSup.scName : document.querySelector('.Supply__suppliers-input').value = ''
    }, [selectedSup])

    useEffect(() => {
        if(inSup) {
            setSuppliers(
                allSuppliers.filter(sup => {
                    return sup.scName.indexOf(inSup) !== -1
                })
            )
        }
    }, [inSup])

    const inSupChanger = (e) => {
        setInSup(e.target.value)
    }

    const addGood = (good) => {
        setSelectedGoods(prev => [...prev, good])
        setInpCount(prev => [...prev, 0])
    }

    const postSup = () => {
        let nowDate = new Date()
        setLoading(true)
        request('/api/goods/supply', 'POST', {date: String(nowDate.getFullYear()) + '-' + String(nowDate.getMonth() + 1) + '-' + String(nowDate.getDate()) + " " + String(nowDate.getHours()) + ":" + String(nowDate.getMinutes()) + ":" + String(nowDate.getSeconds()),
            goodsInfo: goodsCount, sup: selectedSup}).then(req => {
            setLoading(false)
            clear()
        })
    }

    const clear = () => {
        window.location.reload();
    }

    return (
        <div className={`Supply ${addClass}`}>
            <h1 className={`Supply__head`}>
                Оформление поставки
            </h1>

            <div className="Supply__selector-suppliers">
                <h3 className="Supply__head-input">
                    Поставщик
                </h3>
                <input className={`Supply__suppliers-input`} onClick={visSupChange} type="text" onChange={inSupChanger}
                       disabled={selectedSup}/>

                <div className={`Supply__suppliers${!visSup ? '-inv' : ''}`}>
                    {suppliers && !selectedSup ? suppliers.map((supplier, id) => {
                        return (
                            <div className={`Supply__supplier`} key={id} onClick={selectSup}>
                                {supplier.scName}
                            </div>
                        )
                    }) : ""}
                </div>
            </div>

            {allGoods && inpCount && goodsCount ? inpCount.map((el, key) => {
                return(
                    <div key={key}>
                        <SupInput addGood={addGood} allGoods={allGoods} setCountGoods={setGoodsCount}/>
                    </div>
                )
            }) : ""}

            <button className="Supply__btn" disabled={loading || !selectedSup || goodsCount.length === 0} onClick={postSup}>
                Оформить поставку
            </button>
        </div>
    )
}