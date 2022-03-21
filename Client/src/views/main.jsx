import React, { useState } from "react";
import View from "./getView.jsx";
import { VIEWS } from "../constants/views.js";
import "../styles/main.less";


function Main() {
    const [currentState, updateState] = useState(VIEWS.GetUsers);

    return (
        <>
        <div className="nav">
            { 
                Object.keys(VIEWS).map((v) => 
                    <div key={v} onClick={() => updateState(v)}>{v}</div>)
            }
        </div>
        <div>
            <View showWhich={currentState}/>
        </div>
        </>
    );
}

export default Main;