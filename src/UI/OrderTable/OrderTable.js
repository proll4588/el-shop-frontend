import React, {useEffect} from "react";
import {TabulatorFull as Tabulator, FormatModule, EditModule} from "tabulator-tables";
import './OrderTable.scss'
import useHttp from "../../hooks/http.hook";

export default function OrderTable({addClass}) {
    const {request} = useHttp()

    useEffect(() => {
        Tabulator.registerModule([FormatModule, EditModule]);
        request('/api/goods/getAllOrders').then(req => {
            let nestedData = [
            ]

            req.forEach((el) => {
                let isIn = false
                nestedData.forEach((el1 => {
                    if (el1.id === el.IDor) {
                        isIn = true
                        el1.serviceHistory.push({id: el.IDgc, name: el.gcName, col: el.cNum, cost: el.gcCost})
                        el1.cost += el.cNum * el.gcCost
                    }
                }))

                if (!isIn) {
                    nestedData.push({id: el.IDor, login: el.pLogin, email: el.pEmail, date: el.orDate, cost: el.cNum * el.gcCost, serviceHistory:[{id: el.IDgc, name: el.gcName, col: el.cNum, cost: el.gcCost}]})
                }
            })

            let table = new Tabulator("#orderTable", {
                height:"311px",
                layout:"fitColumns",
                columnDefaults:{
                    resizable:true,
                },
                data:nestedData,
                columns:[
                    {title:"ID заказа", field:"id"},
                    {title:"Login", field:"login"},
                    {title:"Email", field:"email"},
                    {title:"Дата заказа", field:"date"},
                    {title:"Стоимость заказа (₽)", field:"cost"},
                ],
                rowFormatter:function(row){
                    //create and style holder elements
                    var holderEl = document.createElement("div");
                    var tableEl = document.createElement("div");

                    holderEl.style.boxSizing = "border-box";
                    holderEl.style.padding = "10px 30px 10px 10px";
                    holderEl.style.borderTop = "1px solid #333";
                    holderEl.style.borderBotom = "1px solid #333";
                    holderEl.style.background = "#ddd";

                    tableEl.style.border = "1px solid #333";

                    holderEl.appendChild(tableEl);

                    row.getElement().appendChild(holderEl);

                    let subTable = new Tabulator(tableEl, {
                        layout:"fitColumns",
                        data:row.getData().serviceHistory,
                        columns:[
                            {title:"ID товара", field:"id", sorter:"date"},
                            {title:"Название товара", field:"name", sorter:"date"},
                            {title:"Кол-во", field:"col", sorter:"date"},
                            {title:"Стоимость за штуку (₽)", field:"cost"},
                        ]
                    })
                },
            });
        })
    }, [])

    return(
        <div className={`OrderTable ${addClass}`}>
            <h1 className="OrderTable__head">
                Таблица активных заказов
            </h1>
            <div id="orderTable" />
        </div>
    )
}
