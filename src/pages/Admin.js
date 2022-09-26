import React, {useEffect, useState} from "react";
import {Chart, registerables} from "chart.js";
import useHttp from "../hooks/http.hook";
import './Admin.scss'
import GoodsEditor from "./GoodsEditor";
import OrderTable from "../UI/OrderTable/OrderTable";
import Supply from "../UI/Supply/Supply";
import Sale from "../UI/Sale/Sale";

export default function Admin({addClass}) {
    const {request} = useHttp()
    const [yearDataSet, setYearDataSet] = useState(new Array(12).fill(0))
    const [monthDataSet, setMonthDataSet] = useState(new Array(31).fill(0))
    const [dayDataSet, setDayDataSet] = useState(new Array(23).fill(0))

    const [nowDateTime, setNowDateTime] = useState(new Date)
    const [loading, setLoading] = useState(false)

    // Получение данных
    useEffect(() => {
        setLoading(true)
        request('/api/goods/getOper').then(req => {
            req.forEach(el => {
                const elDate = new Date(el.oDateTime)

                // Выручка за сегодня
                if (elDate.getDate() === nowDateTime.getDate() &&
                    elDate.getMonth() === nowDateTime.getMonth() &&
                    elDate.getFullYear() === nowDateTime.getFullYear()) {
                    setDayDataSet(prev => {
                        prev[elDate.getHours()] += el.ocCount * el.gcCost
                        return prev
                    })
                }

                // Выручка за месяц
                if (elDate.getMonth() === nowDateTime.getMonth() &&
                    elDate.getFullYear() === nowDateTime.getFullYear()) {
                    setMonthDataSet(prev => {
                        prev[elDate.getDate() - 1] += el.ocCount * el.gcCost
                        return prev
                    })
                }

                // Выручка за год
                if (nowDateTime.getFullYear() === elDate.getFullYear()) {
                    setYearDataSet(prev => {
                        prev[elDate.getMonth()] += el.ocCount * el.gcCost
                        return prev
                    })
                }
            })
            setLoading(false)
        })
    }, [])

    // Отрисовка графиков
    useEffect(() => {
        let startMonthDate = new Date()
        startMonthDate.setDate(0)
        const dayInMon = startMonthDate.getDate()

        let nowDate = new Date()
        nowDate.setHours(0)

        Chart.register(...registerables)

        const monthLabels = []
        for (let i = 1; i <= dayInMon; i++) {
            const newDate = new Date(startMonthDate.getFullYear(), startMonthDate.getMonth(), i)
            monthLabels.push(`${newDate.getDate()}`)
        }

        const dayLabels = []
        for (let i = 0; i <= 23; i++) {
            const newDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), i)
            dayLabels.push(`${newDate.getHours()}:${newDate.getMinutes() < 10 ? "0" + String(newDate.getMinutes()) : newDate.getMinutes()}`)
        }

        const yearLabels = []
        for (let i = 0; i < 12; i++) {
            const newDate = new Date(nowDate.getUTCFullYear(), i)
            yearLabels.push(`${newDate.getMonth() + 1}`)
        }

        const monthData = {
            labels: monthLabels,
            datasets: [{
                label: 'Выручка за день',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: monthDataSet,
            }]
        };
        const yearData = {
            labels: yearLabels,
            datasets: [{
                label: 'Выручка за месяц',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: yearDataSet,
            }]
        };
        const dayData = {
            labels: dayLabels,
            datasets: [{
                label: 'Выручка за час',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: dayDataSet,
            }]
        };

        const monthConfig = {
            type: 'bar',
            data: monthData,
            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'День',
                            color: '#000000',
                            padding: {top: 1, left: 0, right: 0, bottom: 0}
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Доход(₽)',
                            color: '#000000',
                            padding: {top: 30, left: 0, right: 0, bottom: 0}
                        }
                    }
                }
            }
        }

        const yearConfig = {
            type: 'bar',
            data: yearData,
            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Месяц',
                            color: '#000000',
                            padding: {top: 1, left: 0, right: 0, bottom: 0}
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Доход(₽)',
                            color: '#000000',
                            padding: {top: 30, left: 0, right: 0, bottom: 0}
                        }
                    }
                }
            }
        };
        const dayConfig = {
            type: 'bar',
            data: dayData,
            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Час',
                            color: '#000000',
                            padding: {top: 1, left: 0, right: 0, bottom: 0}
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Доход(₽)',
                            color: '#000000',
                            padding: {top: 30, left: 0, right: 0, bottom: 0}
                        }
                    }
                }
            }
        };

        const ctx1 = document.getElementById('month').getContext('2d');
        const ctx2 = document.getElementById('year').getContext('2d');
        const ctx3 = document.getElementById('day').getContext('2d');

        Chart.getChart(ctx1) ? Chart.getChart(ctx1).destroy() : Chart.getChart(ctx1)
        Chart.getChart(ctx2) ? Chart.getChart(ctx2).destroy() : Chart.getChart(ctx1)
        Chart.getChart(ctx3) ? Chart.getChart(ctx3).destroy() : Chart.getChart(ctx1)

        const myChart1 = new Chart(ctx1, monthConfig);
        const myChart2 = new Chart(ctx2, yearConfig);
        const myChart3 = new Chart(ctx3, dayConfig);
    }, [loading])

    return (
        <div className={`Admin ${addClass}`}>
            <h1 className="Admin__head">
                Статистика
            </h1>

            <div className="Admin__charts">
                <canvas id={`month`} width="400" height="400"/>
                <canvas id={`year`} width="400" height="400"/>
                <canvas id={`day`} width="400" height="400"/>
            </div>

            <GoodsEditor addClass={'Admin__add'}/>

            <OrderTable addClass={`Admin__orders-table`}/>

            <Sale />

            <Supply />
        </div>
    )
}