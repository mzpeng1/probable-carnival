import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../context/reducer';
import { selectEvents, setEvents } from "../context/eventReducer";
import {selectCurr, setCurrent} from "../context/currentReducer";
import "./Dashboard.css";
import EventInfoBox from "./EventInfoBox";
import UserAddEvent from './UserAddEvent';
import { Modal, Button, Snackbar }from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function Dashboard() {
    const classes = useStyles()
    const user = useSelector(selectUser);
    const events = useSelector(selectEvents);
    const eventList = [];
    const [showSnackbar, setSnackbar] = useState(false);
    const [snackbarMes, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const current = useSelector(selectCurr);
    const [openModal, setOpen] = useState(false);

    const openSnackbar = (message, severityStatus) => {
        setMessage(message)
        setSnackbar(true);
        setSeverity(severityStatus)
    }

    const CloseSnackbar = () => {
        setSnackbar(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
        openSnackbar("Event Joined!", "success")
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
                eventList.push(<EventInfoBox key={i} id={events[i]} />);
            }
        }
        return eventList;
    }

    return (
        <div className="dashboard">
            {user ? (<h2>Your Events:</h2>) : (<h2>Sign In to See Events</h2>)}
            {generateEvents()}
            {user ? (<Button color="primary" className="joinEvent" variant="contained" onClick={handleOpen}>Join an Event!</Button>) : null}
            <Modal
                open={openModal}
                className={classes.modal}
                onClose={closeModal}
            >
                <UserAddEvent callback={handleClose}/>
            </Modal>
            <Snackbar
                open={showSnackbar}
                message={snackbarMes}
                autoHideDuration={6000}
                onClose={CloseSnackbar}
            >
                <Alert onClose={CloseSnackbar} severity={severity}>
                    {snackbarMes}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Dashboard;
