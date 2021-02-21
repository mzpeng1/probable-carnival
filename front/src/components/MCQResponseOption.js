import React, {useState} from 'react'

function MCQResponseOption( {id, callBack, qName} ) {
    const [b, setB] = useState(1);
    const updateData = () => {
        b ? setB(0) : setB(1);
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
