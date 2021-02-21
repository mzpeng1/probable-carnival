import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./ResponseForm.css";
import FRQResponseBox from "./FRQResponseBox";
import MCQResponseBox from './MCQResponseBox';
import { useSelector } from 'react-redux';
import { selectUser } from '../context/reducer';
import { selectCurr } from '../context/currentReducer';

function ResponseForm({id, name, pass}) {
    const user = useSelector(selectUser);
    const current = useSelector(selectCurr);

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
        axios.get("http://localhost:5000/events/" + current)
            .then(res => {
                setMcqQuestions(res.data.fieldQuestions.MCQS);
                setFrqQuestions(res.data.fieldQuestions.FRQS);
            }).catch(err => alert(err));
    }, [])

    const response = {
        userName: "",
        userEmail: "",
        eventId: "",
        eventName: "",
        eventPassword: "",
        Responses: []
    }
    
    const onSubmit = () => {
        response.userName = user.name;
        response.userEmail = user.email;
        response.eventId = user.id;
        response.eventName = user.name;
        response.eventPassword = user.email;
        for (let i = 0; i < frqData.length; i++) {
            response.Responses.push(frqData[i]);
        }
        console.log(mcqData);
        for (let i = 0; i < mcqData.length; i++) {
            let newString = ""
            for (let j = 0; j < mcqData[i].length; j++) {
                newString += mcqData[i][j];
                if (j !== mcqData[i].length - 1) {
                    newString += ", ";
                }
            }
            if (mcqData[i].length === 0) {
                for (let j = 0; j< mcqQuestions[i].length - 2; j++) {
                    newString += "0, ";
                }
                newString += "0";
            }
            response.Responses.push(newString);
        }
        axios.post("http://localhost:5000/responses/add", response)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    }

    return (
        <div className="main">
            <div className="container">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        {getFRQs(frqs)}
                        {getMCQs(mcqs)}
                        <button className="submitButton">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResponseForm
