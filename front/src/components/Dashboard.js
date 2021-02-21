import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../context/reducer';
import { selectEvents, setEvents } from "../context/eventReducer";
import {selectCurr, setCurrent} from "../context/currentReducer";
import "./Dashboard.css";
import EventInfoBox from "./EventInfoBox";
import UserAddEvent from './UserAddEvent';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';


function Dashboard() {
    const user = useSelector(selectUser);
    const events = useSelector(selectEvents);
    const eventList = [];
    const current = useSelector(selectCurr);
    const [openModal, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            axios.get("http://localhost:5000/users/getUser/" + user.email)
                .then(res => {
                    console.log(res.data);
                    dispatch(setEvents(res.data[0].events));
                })
        }
    }, [user, dispatch])

    const setCurrId = (id) => {
        dispatch(setCurrent(id));
    }

    const generateEvents = () => {
        if (events) {
            for (let i = 0; i < events.length; i++) {
                eventList.push(<EventInfoBox key={i} id={events[i] } />);
            }
        }
        return eventList;
    }

    return (
        <div className="dashboard">
            {user ? (<h2>Your Events:</h2>) : (<h2>Sign In to See Events</h2>)}
            {user ? (<button type="button"><a href="/create">Create Event</a></button>) : (<></>)}
            {generateEvents()}
            {user ? (<button onClick={handleOpen}>Join an Event!</button>) : null}
            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <UserAddEvent />
            </Modal>
        </div>
    )
}

export default Dashboard;
