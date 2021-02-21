import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../context/reducer'
import {Button} from "@material-ui/core";
import './AdminDash.css'

function AdminDash() {
    const user = useSelector(selectUser);
    return (
        <div className="adminDash">
            <h2>Your Admin Dashboard</h2>
            {user ? (<Button className="createButton" color="primary" variant="contained"><a href="/create">Create Event</a></Button>) : (<></>)}
        </div>
    )
}

export default AdminDash
