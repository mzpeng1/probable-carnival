import React, {useState, useEffect} from 'react';
import axios from "axios";
import FRQResponseBox from "./FRQResponseBox";
import MCQResponseBox from './MCQResponseBox';

function ResponseForm() {
    const [frqQuestions, setFrqQuestions] = useState([]);
    const [mcqQuestions, setMcqQuestions] = useState([]);
    const [frqData, setFrqData] = useState([]);
    const [mcqData, setMcqData] = useState([[]]);

    const frqs = [];
    const mcqs = [];

    const frqCallback = (childData, id) => {
        const copy = frqData;
        copy[id] = childData;
        setFrqData(copy);
        console.log(frqData);
    }

    const mcqCallBack = (childData, id) => {
        const copy = mcqData;
        copy[id] = childData;
        setMcqData(copy);
        console.log(mcqData);
    }

    const getFRQs = (frqs) => {
        for (let i = 0; i < frqQuestions.length; i++) {
            frqs.push(<FRQResponseBox key={i} id={i} name={frqQuestions[i]} callBack={frqCallback} />);
        }
        return frqs;
    }

    const getMCQs = (mcqs) => {
        for (let i = 0; i < mcqQuestions.length; i++) {
            mcqs.push(<MCQResponseBox key={i} id={i} values={mcqQuestions[i]} callBack={mcqCallBack} />)
        }
        return mcqs;
    }

    useEffect(() => {
        axios.get("http://localhost:5000/events/601f41153a6bb737ccfe7284")
            .then(res => {
                console.log(res.data);
                setMcqQuestions(res.data.fieldQuestions.MCQS);
                setFrqQuestions(res.data.fieldQuestions.FRQS);
                console.log(frqQuestions);
            }).catch(err => alert(err));
    }, [])

    return (
        <div>
            {getFRQs(frqs)}
            {getMCQs(mcqs)}
        </div>
    )
}

export default ResponseForm
