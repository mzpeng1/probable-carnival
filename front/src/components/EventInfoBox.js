import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./EventInfoBox.css";
import {useSelector, useDispatch} from "react-redux";
import { clearCurrent, setCurrent } from '../context/currentReducer';
import { Button } from '@material-ui/core';

function EventInfoBox( {thisId, callBack}) {
    const [name, setName] = useState("No Match");
    const [date, setDate] = useState(new Date());
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:5000/events/" + thisId)
            .then(res => {
                setName(res.data.name);
                setDate(res.data.date);
            })
            .catch(err => alert(err));
    }, []);

    const dispatchCurrent = () => {
        // axios.get("http://localhost:5000/events/" + thisId) 
            // .then(res => 
                dispatch(setCurrent(thisId))
            // )
            // .catch(err => console.error(err));
    }

    return (
        <div className="eventInfoBox">
                <div className="dueDate">
                    <p>Due By:</p>
                    <h3 className="dueDate">{date.toString().substr(0, 10)}</h3>
                </div>
                <div>
                <h2 className="surveyName">{name}</h2>
                </div>
                <Button className="dispatch" color="default" onClick={dispatchCurrent}><a className="link" href={`/event/${thisId}`}>View Event</a></Button>
       </div>
    )
}

export default EventInfoBox
