import React,{useState, useEffect} from 'react';
import MCQResponseOption from "./MCQResponseOption";

function MCQResponseBox({id, values, callBack}) {
    const init = [];
    useEffect(() => {
        for (let i = 0; i < values.length - 1; i++) {
            init.push(0);
        }
    }, [])
    const [val, setVal] = useState(init);
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
