import React, {useState} from 'react'


function FRQResponseBox( {id, name, callBack} ) {
    const [val, setVal] = useState("");

    const updateData = (val) => {
        setVal(val);
        callBack(val, id);
    }

    return (
        <div className="frqResponseBox">
            <label>{name}</label>
            <input type="text" value={val} onChange={(e) => updateData(e.target.value)}></input>
        </div>
    )
}

export default FRQResponseBox
