import React, {useState} from 'react'

function MCQResponseOption( {id, callBack, qName} ) {
    const [b, setB] = useState(0);
    const updateData = () => {
        !b ? setB(1) : setB(0);
        callBack(b, id);
    }
    return (
        <div className="mcqResponseOption">
            <input type="checkbox" onChange={(e) => updateData()} />
            <label>{qName}</label>
        </div>
    )
}

export default MCQResponseOption
