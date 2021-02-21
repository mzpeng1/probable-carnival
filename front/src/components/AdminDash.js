import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../context/reducer'
import {Button} from "@material-ui/core";

function AdminDash() {
    const user = useSelector(selectUser);
    return (
        <div className="adminDash">
            <h1>Your Admin Dashboard</h1>
            {user ? (<Button color="primary" variant="contained"><a href="/create">Create Event</a></Button>) : (<></>)}
        </div>
    )
}

export default AdminDash
