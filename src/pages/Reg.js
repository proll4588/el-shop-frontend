import React from "react";
import RegForm from "../UI/RegForm/RegForm"
import './Reg.scss'

export default function Reg() {
    return (
        <div className="Reg">
            <RegForm addClass={"Reg__RegForm"}/>
        </div>
    )
}