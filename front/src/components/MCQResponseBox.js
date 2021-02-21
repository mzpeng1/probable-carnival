import React,{useState} from 'react';
import MCQResponseOption from "./MCQResponseOption";

function MCQResponseBox({id, values, callBack}) {
    const [val, setVal] = useState([]);
    const options = [];

    const updateData = (input, index) => {
        const temp = val;
        temp[index] = input;
        setVal(temp);
        callBack(val, id);
    }

    const generateOptions = (options) => {
        for (let i = 1; i < values.length; i++) {
            options.push(<MCQResponseOption id={i-1} key={i-1} callBack={updateData} qName={values[i]} />);
        }
        return options;
    }

    return (
        <div>
            <label>{values[0]}</label>
            {generateOptions(options)}
        </div>
    )
}

export default MCQResponseBox
