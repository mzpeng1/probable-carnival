import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./EventInfoBox.css";
import {useSelector, useDispatch} from "react-redux";
import { clearCurrent, setCurrent } from '../context/currentReducer';

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
            <div classame="text">
                <h2>{name}</h2>
                <h3>{date.toString().substr(0, 10)}</h3>
                <button type="button" onClick={() => dispatchCurrent()}><a href="/event">View Event</a></button>
            </div>
       </div>
    )
}

export default EventInfoBox
