import React, {useState, useEffect} from "react";

export default function SupInput({addClass, allGoods, addGood, setCountGoods}) {
    const [goods, setGoods] = useState(null)
    const [inGood, setInGood] = useState('')
    const [visGoods, setVisGoods] = useState(false)
    const [selectedGood, setSelectedGood] = useState(null)
    const [count, setCount] = useState(0)

    useEffect(() => {
        setGoods(allGoods)
    }, [])

    useEffect(() => {
        if (inGood) {
            setGoods(
                allGoods.filter(good => {
                    return good.gcName.indexOf(inGood) !== -1
                })
            )
        }
    }, [inGood])

    useEffect(() => {
        if (selectedGood) {
            addGood(selectedGood)
        }
    }, [selectedGood])


    const visGoodChange = () => {
        setVisGoods(prev => !prev)
    }

    const inGoodChanger = (e) => {
        setInGood(e.target.value)
    }

    const SelectGood = (e) => {
        goods.forEach(good => {
            if (good.gcName === e.target.innerHTML) {
                setSelectedGood(good)
                visGoodChange()
            }
        })
    }

    const countChanger = (e) => {
        setCount(e.target.value)
        if (Number(e.target.value)) {
            setCountGoods(prev => {
                let f = false
                prev.forEach(el => {
                    if(selectedGood.gcName === el.gcName) {
                        f = true
                        el.cNum = Number(e.target.value)
                    }
                })
                if(!f) {
                    prev = [...prev, {...selectedGood, cNum: Number(e.target.value)}]
                }
                return prev
            })
        }
    }

    return (
        <div className={`SupInput ${addClass}`}>
            <div className="Supply__selector-goods">
                <div className="Supply__input-body">

                    <h3 className="Supply__head-input">
                        Товар
                    </h3>

                    <input className={`Supply__goods-input`} type="text" onClick={visGoodChange}
                           onChange={inGoodChanger} value={selectedGood ? selectedGood.gcName : inGood}
                           disabled={selectedGood}/>


                    <div className={`Supply__goods${!visGoods ? '-inv' : ''}`}>
                        {goods && !selectedGood ? goods.map((good, id) => {
                            return (
                                <div className={`Supply__good`} key={id} onClick={SelectGood}>
                                    {good.gcName}
                                </div>
                            )
                        }) : ""}
                    </div>

                </div>

                <div className="Supply__selector-count">
                    <h3 className="Supply__head-input">
                        Кол-во товара
                    </h3>
                    <input type="text" className="Supply__count-input" onChange={countChanger} disabled={!selectedGood}/>
                </div>
            </div>
        </div>
    )
}