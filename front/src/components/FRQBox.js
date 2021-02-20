import React, {useState} from 'react';
import "./FRQBox.css";

function FRQBox({ id, callBack}) {
    const [val, setVal] = useState("");

    const updateData = (input) => {
        setVal(input);
        callBack(input, id);
    }

    return (
        <div className="frqBox">
            <label>FRQ {id}:</label>
            <input type="text" value={val} onChange={(e) => updateData(e.target.value)}></input>
        </div>
    )
}

export default FRQBox
