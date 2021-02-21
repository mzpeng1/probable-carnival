import React, {useState, useEffect} from 'react';
import axios from "axios";
import "./ResponseForm.css";
import FRQResponseBox from "./FRQResponseBox";
import MCQResponseBox from './MCQResponseBox';
import { useSelector } from 'react-redux';
import { selectUser } from '../context/reducer';
import { selectEvents } from '../context/eventReducer';

const ResponseForm = (props) => {

    const user = useSelector(selectUser);
    const userEvents = useSelector(selectEvents);
    const current = props.id
    const [eventName, setEventName] = useState(null);
    const [pass, setPass] = useState(null);

    const [frqQuestions, setFrqQuestions] = useState([]);
    const [mcqQuestions, setMcqQuestions] = useState([]);
    const [frqData, setFrqData] = useState([]);
    const [mcqData, setMcqData] = useState([[]]);
    const [canView, userCanView] = useState("false");

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
                console.log(res.data)
                setEventName(res.data.name);
                setPass(res.data.password);
                console.log(userEvents)
                var inEvent = userEvents.some((event) => event === res.data._id);
                // TODO: Check if they already finished it
                inEvent ? userCanView(true) : userCanView(false)
                
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
        response.eventId = current;
        response.eventName = eventName;
        response.eventPassword = pass;
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
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.error(err));
    }

    return (
        canView ? (<div className="main">
            <div className="container">
                <div className="form">
                    <form onSubmit={onSubmit}>
                        {getFRQs(frqs)}
                        {getMCQs(mcqs)}
                        <button className="submitButton">Submit</button>
                    </form>
                </div>
            </div>
        </div>) : null
    )
}

export default ResponseForm
