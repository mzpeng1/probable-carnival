import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../context/reducer'
import ResponseForm from './ResponseForm'
import axios from 'axios';
import "./EventDash.css";

const EventDash = (props) => {
    const params = props.match.params;
    const current = params.id;
    const user = useSelector(selectUser);
    const [event, setEvent] = useState(null);
    const [numResponses, setNumResponses] = useState(0);

    useEffect(async() => {
        let result = await axios.get("http://localhost:5000/events/" + current)
                setEvent(result.data)
        console.log(result);
        axios.get("http://localhost:5000/responses/getResponse/" + result.data.name)
            .then(res => {
                setNumResponses(res.data.length);
            })
    },[])
    
    return (
        <>
            <div className="eventDash">
                <h1>{event ? event.name : ""}</h1>
                <div className="dashboard">
                    <div className="number"><h4>Current number of responses: {event ? numResponses : 0}</h4></div>
                </div>
            </div>
            <ResponseForm id={current}/>
        </>
    )
}

export default EventDash
