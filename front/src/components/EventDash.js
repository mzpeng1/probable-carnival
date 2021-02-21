import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../context/reducer'
import { selectCurr } from '../context/currentReducer'
import axios from 'axios';
import "./EventDash.css";

function EventDash() {
    const current = useSelector(selectCurr);
    const user = useSelector(selectUser);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/events/" + current)
            .then(res=> {
                setEvent(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err));
    },[])
    
    return (
        <div className="eventDash">
            <h1>{event ? event.name : ""}</h1>
            <div className="dashboard">
                <div className="number"><h2>Current number <br></br>of responses: {event ? event.responses.length : 0}</h2></div>
            </div>
        </div>
    )
}

export default EventDash
