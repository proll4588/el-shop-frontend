import React from "react";

/* Компоненты */
import TypeCard from "../TypeCard/TypeCard";
/**/

/* Стили */
import './TypeView.scss'
/**/

/*
* TypeView - обёртка для отображения типов товаров
*   Название        тип         описание
*
*   addClass        string      добавочный className
*   types           []          массив типов товаров
*   setType         fun         функция для задание типа товара
*/
export default function TypeView({addClass, types, setType}) {
    return (
        <div className={`TypeView ${addClass}`}>
            {types.map((el, id) => {
                return <TypeCard addClass={`TypeView__TypeCard`} info={el} setType={setType} key={id}/>
            })}
        </div>
    )
}