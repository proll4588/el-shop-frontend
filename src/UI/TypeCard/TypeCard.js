import React from "react";
import './TypeCard.scss'

export default function TypeCard({addClass, info, setType}) {
    const {tgName} = info

    // Задание типа товара
    const setTypeGood = () => {
        setType(info.IDtg)
    }

    return (
        <div className={`TypeCard ${addClass}`} onClick={setTypeGood}>
            <div className="TypeCard__container">
                <div className="TypeCard__content">
                    <h2 className="TypeCard__name">
                        {tgName}
                    </h2>
                </div>
            </div>
        </div>
    )
}
