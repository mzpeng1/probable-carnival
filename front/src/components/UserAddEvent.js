import axios from 'axios';
import React, {useState} from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { selectUser } from "../context/reducer";
import { useSelector } from "react-redux"

function UserAddEvent() {
    const [eventName, setEventName] = useState("");
    const [password, setPass] = useState("");
    const [showSnackbar, setSnackbar] = useState(false);
    const [snackbarMes, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const user = useSelector(selectUser);

    const OpenSnackbar = (message, severityStatus) => {
        setMessage(message)
        setSnackbar(true);
        setSeverity(severityStatus)
    }

    const CloseSnackbar = () => {
        setSnackbar(false);
    }

    const joinEvent = async () => {
        console.log(user)
        const eventObj = await axios.get(`http://localhost:5000/events/getEvent/${eventName}/${password}`)
            .then(async (eventObj) => {
                const userObj = await axios.get(`http://localhost:5000/${user.id}/update/${eventObj._id}`)
                .then((res) => {
                    console.log(userObj)
                    OpenSnackbar("Event Joined!", "success")
                })
                .catch(OpenSnackbar("Unable to join event", "error"))
            })
            .catch(err => {
                if (err.response.status === 401) {
                    OpenSnackbar("Incorrect Password for the event " + eventName, "error");
                }
                if (err.response.status === 400 || err.response.status === 400) {
                    OpenSnackbar("Event with name " + eventName + " not found.", "error");
                }

            });
    }

    return (
        <>
            <div className="userAddEvent">
                <h2>Join an Event</h2>
                <input 
                    type="text" 
                    placeholder="Event Name" 
                    value={eventName} 
                    onChange={e => setEventName(e.target.value)}
                >
                </input>
                <input 
                    type="password" 
                    placeholder="Event Password"
                    value={password}
                    onChange={e => setPass(e.target.value)}
                >  
                </input>
                <button onClick={joinEvent}>Join Event</button>
            </div>
            <Snackbar
                open={showSnackbar}
                message={snackbarMes}
                autoHideDuration={4000}
            >
                <Alert onClose={CloseSnackbar} severity={severity}>
                    {snackbarMes}
                </Alert>
            </Snackbar>
        </>
    )
}

export default UserAddEvent