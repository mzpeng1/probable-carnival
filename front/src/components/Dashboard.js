import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../context/reducer';
import { selectEvents, setEvents } from "../context/eventReducer";
import "./Dashboard.css";
import EventInfoBox from "./EventInfoBox";
import axios from 'axios';

function Dashboard() {
    const user = useSelector(selectUser);
    const events = useSelector(selectEvents);
    const eventList = [];

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            axios.get("http://localhost:5000/users/getUser/" + user.email)
                .then(res => {
                    console.log(res.data);
                    dispatch(setEvents(res.data[0].events));
                })
        }
    }, [user])

    const generateEvents = () => {
        if (events) {
            for (let i = 0; i < events.length; i++) {
                eventList.push(<EventInfoBox key={i} id={events[i]} />);
            }
        }
        return eventList;
    }

    return (
        <div className="dashboard">
            {user ? (<h2>Your Events:</h2>) : (<h2>Sign In to See Events</h2>)}
            {generateEvents()}
        </div>
    )
}

export default Dashboard;
